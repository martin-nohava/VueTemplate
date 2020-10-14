<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
        <div class="user-profile_user-panel">
            <h1 class="user-profile_username">{{state.user.username}}</h1>
            <h3>{{userID}}</h3>
            <div class="user-profile_admin-badge" v-if="state.user.isAdmin">
                Admin
            </div>
            <div class="user-profile_follower-count">
                <strong>Followers: </strong> {{state.folowers}}
            </div>
        </div>
        <CreatePostPanel @add-post="addPost"/>
    </div>
    <div class="user-profile_posts-wrapper">
       <PostItem 
            v-for="post in state.user.posts" 
            v-bind:key="post.id" 
            v-bind:username="state.user.username" 
            v-bind:post="post" 
            @favourite="toggleFavourite">
       </PostItem>
    </div>
  </div>
</template>

<script>
import PostItem from '../components/PostItem';
import CreatePostPanel from '../components/CreatePostPanel';
import {useRoute} from 'vue-router';
import {reactive, computed} from 'vue';
import {users} from '../assets/users';

export default {
  name: 'UserProfile',
  components: {
      PostItem,
      CreatePostPanel
  },
  //Function for storing and returning data of our application
  setup() {
    const route = useRoute();
    const userID = computed(() => route.params.userID);

    const state = reactive({
      folowers: 0,
      //Temp user object
      user: users[userID.value - 1] || users[0]
    });

    function addPost(post) {
        state.user.posts.unshift({id: state.user.posts.length + 1, content: post});
    }

    return {
      state,
      userID,
      addPost
    }

  },
  //Watches a datapoint and when change is detected on that datapoint this method is executed
  watch: {
    folowers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        //console.log(`${state.user.username} has gained a follower! Congrats!`);
      }
    }
  },
  //Object for computed data
  computed: {
    fullName() {
      //${} is used for formating text insted of this.user.firstName + this.user.lastName
      //return `${state.user.firstName} ${state.user.lastName}`;
      return 0
    }

  },
  methods: {
    followUser() {
      //state.folowers++;
    },
    toggleFavourite(id) {
        console.log('Favorited post ' + id)
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