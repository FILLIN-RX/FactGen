import { defineStore } from 'pinia'  // 1
import axios from 'axios' 
import axiosapi from '../api/axios'       // 2

export const useStatsStore = defineStore('statistiques', {  // 3
  state: () => ({                   
    totalClients: 0,                
    totalFactures: 0,              
    totalRevenu: 0,                 
    totalReductions: 0, 
    mois:[],  
    revenusParmois:[],          
    isLoading: false,             
    error: null,                   
  }),
  actions: {                     
    async fetchStatistiques() {   // 12 - fonction asynchrone pour récupérer les stats depuis le backend
      this.isLoading = true       // 13 - indique qu'on lance la requête, loading=true
      console.log('Fetching stats...') // ← pour vérifier si l’appel démarre
      try {
        const { data } = await axiosapi.get('/api/statistiques') // 14 - appel HTTP GET sur l'API backend
          console.log('Réponse reçue:', data) // ← vérifie que tu reçois bien les données
        this.totalClients = data.totalClients
        this.mois = data.mois // 15 - stocke les mois dans le state
        this.totalFactures = data.totalFactures // 16 - stocke la donnée nombre factures
        this.revenusParmois = data.revenusParmois // 16 - stocke les revenus par mois
        this.totalRevenu = data.totalRevenu    // 17 - stocke la donnée revenu total
        this.totalReductions = data.totalReductions // 18 - stocke la donnée total réductions
        this.error = null        // 19 - aucune erreur, on nettoie
      } catch (err) {            // 20 - capture d’erreur si l’appel échoue
        this.error = err.message  // 21 - stocke le message d’erreur dans le state
      } finally {
        this.isLoading = false    // 22 - la requête est terminée (réussite ou échec), loading=false
      }
    },
  },
})
