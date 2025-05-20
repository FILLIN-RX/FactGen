import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/HomePage.vue';
import FacTure from '../pages/FactureSauve.vue';
import Login from '../pages/LoginPage.vue';
import clientFact from '../pages/clientFact.vue';
import AppLayout from '../pages/AppLayout.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/accueil',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/facture',
        name: 'Facture',
        component: FacTure
      },
    ]
    },
  {
    path: '/facture',
    name: 'Facture',
    component: FacTure,
    meta: { requiresAuth: true }
  },
  {
    path: '/clientFact',
    name: 'ClientFact',
    component: clientFact,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, showNavbarAndFooter: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const utilisateur = JSON.parse(localStorage.getItem('utilisateurConnecte'));
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !utilisateur) {
    next('/login');
  } else {
    next();
  }
});

export default router;
