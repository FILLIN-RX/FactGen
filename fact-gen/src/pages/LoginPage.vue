<template>
    <div class="max-w-lg h-150 mx-auto mt-20 pt-16 text-center space-y-5 p-6 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Connexion a factgen</h2>
      
      <div class="space-y-4">
        
        <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-full border p-2 rounded" />
        
        <button @click="login" class="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-800 transition duration-400">
          Se connecter
        </button>
  
       
      </div>
      <span class="font-bold text-3xl">ou</span>
      <div class="text-center p-5">
        <button class="p-3 text-  bg-green-400 rounded-md shadow hover:bg-gray-200 duration-300">Connexion par google </button>
      </div>
      <p v-if="erreur" class="text-red-500">{{ erreur }}</p>
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
          this.$router.push("/real");
        } else {
          this.erreur = "Identifiants incorrects ou mot de passe incorrect.";
        }
      }
    }
  };
  </script>
  