const redis = require('redis');
const redisClient = redis.createClient({host : 'localhost', port : 6379});

function User() {

}

User.setUser = async (user) => {
  const res = await new Promise((resolve, reject) => {
    redisClient.incr('user:id', (err, id) => {
      if (err) {
        reject(err);
        return;
      } 

      redisClient.hmset(`user${id}`, 
        'name', user.name, 
        'password', user.password, 
        'createdTime', user.createdTime,
        (err, res) => {
          if (err) {
            reject ({
              code: 500,
              error: err
            })
            return;
          } 

          redisClient.sadd('user', `user${id}`, (err, res) => {
            if (err || !res) {
              reject ({
                code: 500,
                error: err || 'redis add error'
              })
            }

            redisClient.set(user.name, `user${id}`, (err, res) => {
              if (err || !res) {
                reject ({
                  code: 500,
                  error: err || 'redis set error'
                })
              } else {
                resolve({
                  code: 200,
                  data: true,
                })
              }
            })
          })
      });
    })
  })

  return res;
}

User.getUserIdByName = async (name) => {
  const dbRes = await new Promise((resolve, reject) => {
    redisClient.get(name, (err, userId) => {
      if (err) {
        reject ({
          code: 500,
          error: err || 'get userId error'
        })
      } else {
        resolve({
          code: 200,
          data: userId,
        })
      }
    })
  })

  return dbRes;
}

User.getUserByUserId = async (userId) => {
  const dbRes = await new Promise((resolve, reject) => {
    redisClient.hgetall(userId, (err, user) => {
      if (err || !user) {
        reject ({
          code: 500,
          error: err || 'get user error'
        })
      } else {
        resolve({
          code: 200,
          data: user,
        })
      }
    })
  })

  return dbRes;
}

User.signUp = async (user) => {
  let userIdRes = await User.getUserIdByName(user.name);
  if (userIdRes.code !== 200) {
    return userIdRes;
  } else if (userIdRes.data) {
    return {
      code: 500,
      error: 'user is already exist'
    }
  }

  const dbRes = await User.setUser(user);

  return dbRes;
}

User.login = async (user) => {
  let userIdRes = await User.getUserIdByName(user.name);
  if (userIdRes.code !== 200) {
    return userIdRes;
  } else if (userIdRes.data) {
    let userId = userIdRes.data;

    const dbRes = await new Promise((resolve, reject) => {
      redisClient.hgetall(userId, (err, res) => {
        if (err) {
          reject({
            code: 500, 
            error: err
          })
        } else {
          if (res.password === user.password) {
            resolve({
              code: 200,
              data: 'ok'
            })
          } else {
            resolve({
              code: 500,
              error: '密码错误'
            })
          }
        }
      })
    })
    return dbRes;
  } else {
    return {
      code: 500,
      error: 'no user exist'
    }
  }
} 

User.getAllUsers = async () => {
  const dbRes = await new Promise((resolve, reject) => {
    redisClient.smembers('user', async (err, userIds) => {
      if (err) {
        reject ({
          code: 500,
          error: err || 'get user error'
        })
      } else {
        let userPromiseList = [];
        userIds.forEach(id => {
          let promise = new Promise((resolve, reject) => {
            redisClient.hgetall(id, (err, user) => {
              if (err) {
                reject ({
                  code: 500,
                  error: err
                })
                return 
              } 
              resolve({
                code: 200,
                data: user
              })
            }) 
          })
          userPromiseList.push(promise);
        })

        const res = await Promise.all(userPromiseList);
        let errRes = res.find(u => u.code !== 200);
        if (errRes) {
          return errRes;
        } else {
          resolve({
            code: 200,
            data: res.map(i => {
              let u = i.data || {}
              return {
                name: u.name,
                createdTime: u.createdTime
              }
            })
          })
        }
      }
    })
  })

  return dbRes;
}

module.exports = User;