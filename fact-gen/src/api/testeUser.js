export async function testUser() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    console.error("❌ Session invalide:", error)
    throw new Error("Non connecté")
  }

  const token = session.access_token

  const res = await fetch('http://localhost:4000/api/test-user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const result = await res.json()
  console.log("🧪 Résultat test:", result)
}
