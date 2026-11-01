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
      path: '/browse/events/:id/register',
      name: 'event-registration',
      component: () => import('../views/EventRegistration.vue'),
    },
    {
      path: '/browse/category',
      name: 'category',
      component: () => import('../views/Placeholder.vue'),
      props: { title: 'Event Categories' },
    },
    {
      path: '/browse/your-events',
      name: 'your-events',
      component: () => import('../views/YourEvents.vue'),
    },
    {
      path: '/browse/your-events/:id',
      name: 'ticket-receipt',
      component: () => import('../views/TicketReceipt.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Placeholder.vue'),
      props: { title: 'Contact Organizer' },
    },
    {
      path: '/dashboard',
      /* AREA PENYELENGGARA ACARA (DASHBOARD) */
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard-overview',
          component: Dashboard,
        },
        {
          path: 'events',
          name: 'dashboard-events',
          component: () => import('../views/EventManagement.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
