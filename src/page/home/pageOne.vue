<template>
<div>page one
  <div>{{testData}}</div>
</div>
</template>

<script>
import superagent from 'superagent';

export default {
  data() {
    return {
      testData: ''
    }
  },
  created() {
    console.log(window.appData);
    this.getData();
  },
  methods: {
    getData() {
      superagent
      .post('/api/getdata', {name: 'ym', age: 67})
      .end((err, res) => {
        let body = res && res.body;
        if (body.code === 200) {
          this.testData = body.data;
        }
      });
    },
  }
}
</script>
