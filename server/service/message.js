const redis = require('redis');
const redisClient = redis.createClient({host : 'localhost', port : 6379});

function Message() {

}

Message.saveMsg = async (msg) => {
  const res = await new Promise((resolve, reject) => {
    redisClient.incr('message:id', (err, id) => {
      if (err) {
        reject(err);
        return;
      }
      redisClient.hmset(`message${id}`, 
        'from', msg.from, 
        'to', msg.to,
        'content', msg.content, 
        'createdTime', msg.createdTime, (err, res) => {
          if (err) {
            reject ({
              code: 500,
              error: err
            })
            return;
          }

          redisClient.rpush(`messagesFrom${msg.from}To${msg.to}`, id, (err, res) => {
            if (err) {
              reject ({
                code: 500,
                error: err
              })
              return;
            }

            resolve({
              code: 200,
              data: true
            })
          })        
      }) 
    })
  })

  return res;
}

Message.getMessagesByUser = async (user) => {
  let msgIds = await new Promise((resolve, reject) => {
    redisClient.lrange(`messagesFrom${user.from}To${user.to}`, 0, -1, (err, ids) => {
      if (err) {
        reject ({
          code: 500,
          error: err
        })
        return;
      }

      resolve({
        code: 200,
        data: ids
      })
    })
  });

  if (msgIds.code !== 200) {
    return msgIds;
  }

  msgIds = msgIds.data;
  let getMsgsPromiseList = [];

  msgIds.forEach(id => {
    let promise = new Promise((resolve, reject) => {
      redisClient.hgetall(`message${id}`, (err, res) => {
        if (err) {
          reject ({
            code: 500,
            error: err
          })
          return;
        }

        resolve({
          code: 200,
          data: res
        })
      })
    })
    getMsgsPromiseList.push(promise);
  })

  let msgs = await Promise.all(getMsgsPromiseList);

  let errRes = msgs.find(m => m.code !== 200);
  if (errRes) {
    return errRes;
  } else {
    return {
      code: 200,
      data: (msgs || []).map(i => i.data)
    }
  }
}

module.exports = Message;