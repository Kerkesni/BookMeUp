<template>
  <div>
    <navBar />
    <slot></slot>
  </div>
</template>

<script>
import navBar from "../components/NavBar";


export default {
  components: {
    navBar,
  },
};
</script>

<style></style>
