<template>
  <div>
    <div v-if="data">
      <h2>{{ data.title }}</h2>
      <p>{{ data.body }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: null
    };
  },
  mounted() {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        this.data = response.data;
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }
};
</script>
