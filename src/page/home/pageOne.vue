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
    this.getData();
  },
  methods: {
    getData() {
      superagent
      .get('/api/getdata')
      .end((err, res) => {
        let body = res && res.body;
        if (body.code === 200) {
          this.testData = body.data;
        }
      });
    }
  }
}
</script>
