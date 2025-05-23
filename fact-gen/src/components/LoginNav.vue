<template>
    <header class="navbar bg-gray-800 text-white p-4 dark:bg-backgroundDark dark:border-b dark:border-primary/10 sticky top-0 z-10 shadow-sm">
      <!-- Bouton menu (mobile) -->
      <nav class="flex-none lg:hidden">
        <label @click="$emit('toggle-drawer')" class="btn btn-square btn-ghost">
          <Icon icon="mdi:menu" class="inline-block w-6 h-6" />
        </label>
      </nav>
      <h1 class="text-lg font-bold">🧾 FactGen</h1>
      <!-- Barre de recherche -->
      <section class="flex-1">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-48 ml-2 md:w-auto "
        />
      </section>
  
      <!-- Boutons à droite -->
      <section class="flex items-center gap-4">
        <div>
        <ul
          v-if="!mobile"
          class="hidden lg:flex h-full justify-center space-x-10 items-center text-center"
        >
          <li class="hover:text-blue-500 ease-in duration-200">
            <router-link to="/FacTure">Facture</router-link>
          </li>
          <li class="hover:text-blue-500 ease-in duration-200">customize</li>
          <li class="hover:text-blue-500 ease-in duration-200">
            <router-link to="/clientFact">client</router-link>
          </li>
          
        </ul>
      </div>
        <button
          @click="$emit('toggle-theme')"
          class="btn btn-ghost btn-circle dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10"
        >
          <Icon
            v-if="isDark"
            icon="line-md:moon-alt-to-sunny-outline-loop-transition"
            class="w-6 h-6"
          />
          <Icon
            v-else
            icon="line-md:sunny-outline-to-moon-alt-loop-transition"
            class="w-6 h-6"
          />
        </button>
  
        <!-- Dropdown utilisateur -->

          <button class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="../assets/8414110.jpg" alt="user" />
            </div>
          </button>
          <ul
            class="mt-3 z-[1] p-2 shadow menu menu-sm  bg-red-100 rounded-box w-52 space-y-2 dark:bg-backgroundDark font-semibold text-base"
          >
            <li><router-link to="/profile">{{ utilisateur.email }}</router-link></li>
            <li><router-link to="/settings">Paramètres</router-link></li>
            <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
            Se déconnecter
          </button>
          </ul>
        
      </section>
    </header>
  </template>
  
  <script>
export default {
    name: 'AppLayout',
  
    data() {
      return {
        utilisateur: null,
        

      }
    },
  
    created() {
      this.utilisateur = JSON.parse(localStorage.getItem('utilisateurConnecte'))
    },
    methods: {
      logout() {
        localStorage.removeItem('utilisateurConnecte')
        this.$router.push('/login')
      }
    }
  }

  
  </script>
  