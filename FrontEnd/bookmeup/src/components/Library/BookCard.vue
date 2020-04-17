<template>
  <v-card class="card" @click="showBook">
    <span class="image_area">
      <img id="image" :src="data.thumbnail" />
    </span>
    <span class="data">
      <v-card-title>{{ data.title }}</v-card-title>
      <v-card-subtitle>{{ data.authors }}</v-card-subtitle>
    </span>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    showBook: function(){
      this.$router.push('/Book/'+this.data.id)
    }
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1000px) {
  .card {
    display: flex;
    height: 206px;
    .image_area {
      padding: 0.2rem;
      width: 134px;
      height: 204px;
      #image {
        height: 100%;
        width: 100%;
      }
    }
    .data {
      width: 70%;
      overflow: auto;
    }
  }
}
@media screen and (max-width: 990px) {
  .card {
    display: flex;
    .image_area {
      padding: 0.1rem;
    }
    .data {
      width: 70%;
      overflow: auto;
    }
  }
}
</style>
