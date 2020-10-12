<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
        <h1 class="user-profile_username">{{user.username}}</h1>
        <div class="user-profile_follower-count">
            <strong>Followers</strong> {{folowers}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
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
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;
}

.user-profile_user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid whitesmoke;
}

h1 {
    margin: 0;
}
</style>