import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/modules/Landing/views/HomePage.vue';
import PrintLayout from '@/shared/components/layout/PrintLayout.vue';
import AppLayout from '@/shared/components/layout/AppLayout.vue';
import { supabase } from '../lib/supabase';

// Module Imports
import Login from '@/modules/Auth/views/LoginPage.vue';
import SignUp from '@/modules/Auth/views/SignUp.vue';
import { useAuthStore } from '@/modules/Auth/stores/auth.store';

import Dashboard from '@/modules/Dashboard/views/Dashboard.vue';
import StatisticsPage from '@/modules/Dashboard/views/StatisticsPage.vue';

import InvoiceList from '@/modules/Invoice/views/InvoiceList.vue';
import InvoiceForm from '@/modules/Invoice/components/FactureForm/InvoiceForm.vue';
import InvoicePdf from '@/modules/Invoice/views/InvoicePdf.vue';

import ClientList from '@/modules/Client/views/ClientList.vue';

// Other Pages
import SettingPage from '@/modules/Settings/views/SettingPage.vue';
import SupportPage from '@/modules/Landing/views/SupportPage.vue';
import FeaturesPage from '@/modules/Landing/views/FeaturesPage.vue';
import TemplatesPage from '@/modules/Invoice/views/TemplatesPage.vue';

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
    component: InvoicePdf,
    meta: { requiresAuth: true, showNavbarAndFooter: false } 
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
        component: Dashboard,
        meta: { requiresAuth: true , showNavbarAndFooter: false },
      },
      {
        path: '/facture',
        name: 'Facture',
        component: InvoiceList,
        meta: { requiresAuth: true ,showNavbarAndFooter:false},
      },
      {
        path: '/clientFact',
        name: 'Client',
        component: ClientList,
        meta: { requiresAuth: true , showNavbarAndFooter : false},
      },
      {
        path: '/setting',
        name:'setting',
        component: SettingPage,
        meta:{requiresAuth:true}
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: StatisticsPage,
        meta: { requiresAuth: true, showNavbarAndFooter: false }
      },
      {
        path: '/templates',
        name: 'Templates',
        component: TemplatesPage,
        meta: { requiresAuth: true, showNavbarAndFooter: false }
      },
      {
        path: '/NewInvoice',
        name: 'FactureForm',
        component: InvoiceForm,
        meta: { requiresAuth: true, showNavbarAndFooter: false }
      }
    ]
  },
  {
    path: '/signUp',
    name: 'register',
    component: SignUp,
    meta: { requiresAuth: false, showNavbarAndFooter: false }
  },
  {
    path: '/features',
    name: 'Features',
    component: FeaturesPage,
  },
  {
    path: '/support',
    name: 'Support',
    component : SupportPage,
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
