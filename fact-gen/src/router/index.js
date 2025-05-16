import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import FacTure from '../pages/FactureSauve.vue'; // ou ton composant principal
import Login from '../pages/LoginPage.vue'; // ou ton composant principal
import clientFact from '../pages/clientFact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/facture',
    name: 'Facture',
    component: FacTure
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/clientFact',
    name: 'clientFact',
    component: clientFact
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));
  const pagesProtegees = ["/facture"];

  if (pagesProtegees.includes(to.path) && !utilisateur) {
    next("/login");
  } else {
    next();
  }
});

export default router;
