import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/HomePage.vue';
import FacTure from '../pages/FactureSauve.vue';
import Login from '../pages/LoginPage.vue';
import clientFact from '../pages/clientFact.vue';
import AppLayout from '../pages/AppLayout.vue';
import RealLayout from '../pages/RealLayout.vue';
import SignUp from '../pages/SignUp.vue';
import { supabase } from '../lib/supabase';
console.log('Session actuelle:', await supabase.auth.getSession())
const { data } = await supabase.auth.getSession();
console.log(data.session.access_token);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/real',
        name: 'Real',
        component: RealLayout,
        meta: { requiresAuth: true },
    },
      {
        path: '/facture',
        name: 'Facture',
        component: FacTure
      },
      {
        path: '/clientFact',
        name: 'Client',
        component: clientFact,
        meta: { requiresAuth: true },
      
      },
      
    ]
    },
    {
      path: '/signUp',
      name: 'register',
      component: SignUp
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

async function getUser(next) {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    next('/login');
  } else {
    next();
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log("requiresAuth");
    await getUser(next);
  } else {
    next();
  }
});



export default router;
