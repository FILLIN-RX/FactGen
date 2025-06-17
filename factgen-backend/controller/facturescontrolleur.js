import { getRevenusParMois } from '../service/totalMois.js'

export async function getStatsMensuelles(req, res) {
  try {
    const revenusParMois = await getRevenusParMois()
    res.json({ revenusParMois })
  } catch (error) {
    console.error('Erreur stats mensuelles:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
