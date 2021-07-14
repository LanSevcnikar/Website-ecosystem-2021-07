import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/HomePage.vue'
import CaS from './views/CaS.vue'
import LoginPage from './views/Login.vue'
import NotFound from './views/404.vue'
import About from './views/About.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/collagesandstudents', component: CaS },
        { path: '/aboutme', component: About },
        { path: '/:pathMatch(.*)', component: NotFound }
    ],
    linkActiveClass: "active",
})

router.beforeEach((to, _, next) => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log(Math.floor(Date.now()/1000), userData.expires);
    if (!userData.email || (Math.floor(Date.now()/1000) > userData.expires)) {
        if(to.path == '/aboutme'){
            return next({path:'/login'})
        }
    }
    return next()
})

//Suefl things that you might need are aliases (same thing called different things)
//And maybe it would be smart to use redirects
//You can also just name components
//instead of calling the whole paths
//Always use regex when doing this stuff

//Histroy thing changes how the server ought t be configured

export default router;

// router.beforeEach((to, _, next) => {
//     const isLoggedIn = isUserLoggedIn()
  
//     if (!canNavigate(to)) {
//       // Redirect to login if not logged in
//       // ! We updated login route name here from `auth-login` to `login` in starter-kit
//       if (!isLoggedIn) return next({ name: 'login' })
  
//       // If logged in => not authorized
//       return next({ name: 'not-authorized' })
//     }
  
//     // Redirect if logged in
//     if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//       next(getHomeRouteForLoggedInUser())
//     }
  
//     return next()
//   })


// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', redirect: '/dashboard' },
//         { path: '/dashboard', component: Dashboard },
//         { path: '/tasks', component: Tasks },
//         { path: '/notes', component: Notes,  children: [
//             {path: 'new', component: NewNote},
//             {path: 'edit/:id', component: NewNote},
//         ]},
//         { path: '/:pathMatch(.*)', component: NotFound }
//     ],
//     linkActiveClass: "active",
// })

// router.afterEach(() => console.log("after each"))