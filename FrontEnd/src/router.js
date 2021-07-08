import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './components/Dashboard.vue'
import Tasks from './components/Todos.vue'
import Notes from './views/NotesView.vue'
import NewNote from './components/NewNote.vue'
import NotFound from './components/404.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/dashboard' },
        { path: '/dashboard', component: Dashboard },
        { path: '/tasks', component: Tasks },
        { path: '/notes', component: Notes,  children: [
            {path: 'new', component: NewNote},
            {path: 'edit/:id', component: NewNote},
        ]},
        { path: '/:pathMatch(.*)', component: NotFound }
    ],
    linkActiveClass: "active",
})

router.afterEach(() => console.log("after each"))

//Suefl things that you might need are aliases (same thing called different things)
//And maybe it would be smart to use redirects
//You can also just name components
//instead of calling the whole paths
//Always use regex when doing this stuff

//Histroy thing changes how the server ought t be configured

export default router;