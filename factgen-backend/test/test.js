import supabase from '../config/superbaseclient.js';

async function testConnexion() {
  const { data, error } = await supabase.from('clients').select('*');

  if (error) {
    console.error('❌ Erreur de connexion à Supabase :', error.message);
  } else {
    console.log('✅ Clients trouvés :', data);

    console.log('Total clients found:', data.length);
  }
}

testConnexion();
