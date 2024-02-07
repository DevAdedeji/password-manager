import { createRouter, createWebHashHistory } from 'vue-router';
import { useStorage } from "@/composables/storage";
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Home from "../pages/Index.vue"


const routes = [
  { path: '/', name:'home', component: Home, meta: {authRequired : true} },
  { path: '/login', name:'login', component: Login, meta: {authRequired : false} },
  { path: '/register', name:'register', component: Register, meta: {authRequired : false} }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});




router.beforeEach( async (to, from, next)=>{
    const { getItem } = useStorage()
    const token = await getItem("auth.token")
    if(to.meta.authRequired === true){
      if(token){
        next();
      }else{
        next({name: 'login'});
      }
    } else if(to.name === 'login' || to.name === 'register' ) {
        if(token){
            next({name:'home'});
        }else{
            next();
        }
    }else{
        next();
    }
})


export default router;