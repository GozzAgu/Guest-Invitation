import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Signup from '../views/UserViews/SignUp.vue'
import Signin from '../views/UserViews/SignIn.vue'
import Chat from '../views/UserViews/Chat.vue'
import ForgotPassword from '../views/UserViews/ForgotPassword.vue'
import HomePage from '../views/UserViews/HomePage.vue'
import GuestList from '../views/CheckPointViews/GuestList.vue'

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    props: true,
    requiresAuth: true
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPassword
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/guest',
    name: 'guest',
    component: GuestList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// const getCurrentuser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

// router.beforeEach(async(to, from, next) => {
//   if(to.matched.some((record) => record.meta.requiresAuth)) {
//     if(await getCurrentuser) {
//       next();
//     }
//   } else {
//     next('/');
//   }
// })

export default router
