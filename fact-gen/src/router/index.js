import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import FacTure from '../pages/FactureSauve.vue'; // ou ton composant principal
import Login from '../pages/LoginPage.vue'; // ou ton composant principal

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
  }
];
router.beforeEach((to, from, next) => {
    const utilisateur = JSON.parse(localStorage.getItem("utilisateurConnecte"));
    const pagesProtegees = ["/factures"];
  
    if (pagesProtegees.includes(to.path) && !utilisateur) {
      next("/login");
    } else {
      next();
    }
});
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
