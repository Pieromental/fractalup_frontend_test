import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
      },
      {
        name: 'view-1',
        path: 'view-1',
        component: () => import('src/pages/View1Page.vue'),
      },
      {
        name: 'view-2',
        path: 'view-2',
        component: () => import('pages/View2Page.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
