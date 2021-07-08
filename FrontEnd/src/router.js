import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard from './components/dashboard/Dashboard.vue'
import Tasks from './components/todos/Todos.vue'
import Notes from './views/NotesView.vue'
import NewNote from './components/notes/NewNote.vue'
import NotFound from './components/404.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/dashboard', component: Dashboard },
        { path: '/tasks', component: Tasks },
        { path: '/notes', component: Notes,  children: [
            {path: 'new', component: NewNote}
        ]},
        { path: '/:pathMatch(.*)', component: NotFound }
    ],
    linkActiveClass: "active",
})

export default router;