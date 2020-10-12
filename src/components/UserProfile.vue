<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">{{user.username}}</h1>
            <div class="user-profile_admin-badge" v-if="user.isAdmin">
                Admin
            </div>
            <div class="user-profile_follower-count">
                <strong>Followers: </strong> {{folowers}}
            </div>
        </div>
        <CreatePostPanel @add-post="addPost"/>
    </div>
    <div class="user-profile_posts-wrapper">
       <PostItem 
            v-for="post in user.posts" 
            v-bind:key="post.id" 
            v-bind:username="user.username" 
            v-bind:post="post" 
            @favourite="toggleFavourite">
       </PostItem>
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';
import CreatePostPanel from './CreatePostPanel';

export default {
  name: 'UserProfile',
  components: {
      PostItem,
      CreatePostPanel
  },
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
        isAdmin: true,
        posts: [
            {
                id: 1,
                content: 'Hello World, my first post!'
            },
            {
                id: 2,
                content: 'Catch me if you can.'
            }
        ]
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
    },
  },
  methods: {
    followUser() {
      this.folowers++;
    },
    toggleFavourite(id) {
        console.log('Favorited post ' + id)
    },
    addPost(post) {
        this.user.posts.unshift({id: this.user.posts.length + 1, content: post});
    }
  },
  //Methot that runs when the component is loaded for the first time
  mounted() {
    this.followUser();
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 50px 5%;

    .user-profile_user-panel {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid whitesmoke;
        margin-bottom: auto;

        h1 {
            margin: 0;
        }

        .user-profile_admin-badge {
            background: navy;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            font-weight: bold;
        }

        .user-profile_create-post {
            display: flex;
            flex-direction: column;
            border-top: 1px solid whitesmoke;
            margin-top: 20px;

            &.exceeded {
                color: red;
                border-color: red;
                button {
                    background-color: red;
                    border-color: red;
                }
            }
        }
    }  

    .user-profile_posts-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-bottom: auto;
    }
}
</style>