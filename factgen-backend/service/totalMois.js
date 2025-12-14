import supabase  from '../config/supabaseClient.js'

export async function getRevenusParMois() {
  const { data, error } = await supabase.rpc('revenus_par_mois')

  if (error) {
    throw error
  }
  return data
}
