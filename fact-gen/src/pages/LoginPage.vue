<template>
    <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      
      <div class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-full border p-2 rounded" />
        
        <button @click="login" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Se connecter
        </button>
  
        <p v-if="erreur" class="text-red-500">{{ erreur }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        erreur: ""
      };
    },
    methods: {
      login() {
        const utilisateurs = [
          { email: "admin@example.com", password: "123456" },
          { email: "user@example.com", password: "abcdef" }
        ];
  
        const user = utilisateurs.find(
          u => u.email === this.email && u.password === this.password
        );
  
        if (user) {
          localStorage.setItem("utilisateurConnecte", JSON.stringify(user));
          this.$router.push("/facture");
        } else {
          this.erreur = "Identifiants incorrects.";
        }
      }
    }
  };
  </script>
  