<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="navigation_logo">
          Poster
        </div>
      </router-link>
      <div class="navigation_user" v-if="user">
        {{user.username}}
      </div>
    </nav>
    <!--Whatever is active page will be rendered here-->
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'App',
  components: {
    
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    return {
      user
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #f3f3f3;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: deeppink;
    color: floralwhite;

    .navigation_logo {
      font-weight: bold;
      font-size: 24px;
    }

    .navigation_user {
      font-weight: bold;
    }
  }
}
</style>