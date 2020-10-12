<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
        <h1 class="user-profile_username">{{user.username}}</h1>
        <div class="user-profile_admin-badge" v-if="user.isAdmin">
            Admin
        </div>
        <div class="user-profile_follower-count">
            <strong>Followers</strong> {{folowers}}
        </div>
        <!--@submit.prevent is disabling default event of form element and adding custom-->
        <form class="user-profile_create-post" @submit.prevent="createNewPost">
            <label for="newPost"><strong>New Post</strong></label>
            <!--V-model is saving value of textfield to selected variable-->
            <textarea id="newPost" rows="4" v-model="newPostContent"/>
        
            <div class="user-profile_create-post-type">
                <label for="newPostType"><strong>Type:</strong></label>
                <select id="newPostType" v-model="selectedPostType">
                    <!--Using index of array as unique key parametr-->
                    <option v-for="(option, index) in postTypes" :key="index" :value="option.value">
                        {{option.name}}
                    </option>
                </select>
            </div>
            <button>
                Post
            </button>
        </form>
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

export default {
  name: 'UserProfile',
  components: {
      PostItem
  },
  //Function for storing and returning data of our application
  data() {
    return {
        newPostContent: '',
        selectedPostType: 'instant',
        folowers: 0,
        postTypes: [
          {
            value: 'draft',
            name: 'Draft'
          },
          {
            value: 'instant',
            name: 'Instant Post'
          }
        ],
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
    }
  },
  methods: {
    followUser() {
      this.folowers++;
    },
    toggleFavourite(id) {
        console.log('Favorited post ' + id)
    },
    createNewPost() {
        if(this.newPostContent && this.selectedPostType !== 'draft') {
            //This method is adding new Post object to the front of posts list
            this.user.posts.unshift({
                id: this.user.posts.length + 1,
                content: this.newPostContent
            })
        }
        this.newPostContent = '';
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
}

h1 {
    margin: 0;
}
</style>