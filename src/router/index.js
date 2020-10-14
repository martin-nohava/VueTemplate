import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import Admin from '../views/Admin.vue'
import store from '../store';
import {users} from '../assets/users';

//List of routing objects
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userID',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requireAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async(to, from, next) => {
  const user = store.state.user;

  if(!user) {
    await store.dispatch('setUser', users[0])
  }

  const isAdmin = true;
  const requireAdmin = to.matched.some(record => record.meta.requireAdmin);

  if(requireAdmin && !isAdmin) next({name: 'Home'});
  else next();
})

export default router
