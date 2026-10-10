import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EventList from '../views/EventList.vue'
import EventDetail from '../views/EventDetail.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Placeholder.vue'),
      props: { title: 'About Gatherly' },
    },
    { path: '/browse/events', name: 'events', component: EventList },
    { path: '/browse/events/:id', name: 'event-detail', component: EventDetail },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Placeholder.vue'),
      props: { title: 'Contact Organizer' },
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [{ path: '', name: 'dashboard', component: Dashboard }],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
