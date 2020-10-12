<template>
  <div id="app">
    {{user.username}} - {{fullName}} 
    <strong>Followers</strong> 
    {{folowers}}
    <button @click="followUser">Follow</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  //Function for storing and returning data of our application
  data() {
    return {
      folowers: 0,
      //Temp user object
      user: {
        id: 1,
        username: '@martin_nohava',
        firstName: 'Martin',
        lastName: 'Nohava',
        email: 'martin@nohava.cz',
        isAdmin: true
      }
    }
  },
  //Watches a datapoint and when change is detected on that datapoint this method is executed
  watch: {
    folowers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower! Congrats!`);
      }
    }
  },
  //Object for computed data
  computed: {
    fullName() {
      //${} is used for formating text insted of this.user.firstName + this.user.lastName
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  },
  methods: {
    followUser() {
      this.folowers++;
    }
  },
  //Methot that runs when the component is loaded for the first time
  mounted() {
    this.followUser();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>