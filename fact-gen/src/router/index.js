import { createRouter, createWebHistory } from 'vue-router';
import FactureView from '../components/factures/FactureView.vue';
import Home from '../pages/HomePage.vue';
import PrintLayout from '../components/layout/PrintLayout.vue';
import FacTure from '../pages/FactureSauve.vue';
import Login from '../pages/LoginPage.vue';
import clientFact from '../pages/clientFact.vue';
import AppLayout from '../pages/AppLayout.vue';
import RealLayout from '../pages/RealLayout.vue';
import SignUp from '../pages/SignUp.vue';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth'
import SettingPage from '../pages/SettingPage.vue';
import StatisTics from '../components/StatisTics.vue';
import StatisticS from '../views/StatisticS.vue';
const session = supabase.auth.getSession();
console.log(session);


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
 {
  path: '/facture/:id/pdf',
  name: 'FacturePDF',
  component: () => import('@/views/FacturePdf.vue'),
  meta: { requiresAuth: false, showNavbarAndFooter: false } // ← très important pour laisser Puppeteer accéder
},
  {
    path: '/accueil',
    name: 'accueil',
    component: AppLayout,
    meta: { requiresAuth: true , showNavbarAndFooter: false },
    children: [
      {
        path: '/real',
        name: 'Real',
        component: RealLayout,
        meta: { requiresAuth: true , showNavbarAndFooter: false },
    },
      {
        path: '/facture',
        name: 'Facture',
        component: FacTure,
        meta: { requiresAuth: true ,showNavbarAndFooter:false},
        
      },
      {
        path: '/clientFact',
        name: 'Client',
        component: clientFact,
        meta: { requiresAuth: true , showNavbarAndFooter : false},
      
      },
      {
        path: '/setting',
        name:'setting',
        component:SettingPage,
        meta:{requiresAuth:true}
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: StatisticS,
        meta: { requiresAuth: true, showNavbarAndFooter: false }
      }
      
    ]
    },
    {
      path: '/signUp',
      name: 'register',
      component: SignUp,
      meta:{showNavbarAndFooter:false}
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

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (auth.user === null) {
    await auth.initialize();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login');
  }

  next();
});

export default router;
