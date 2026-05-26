import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/modules/Auth/stores/auth.store";

function getUserId() {
  const auth = useAuthStore();
  return auth.userId;
}

export async function upsertClient(clientData) {
  const { data, error } = await supabase
    .from("clients")
    .upsert({ ...clientData, user_id: getUserId() }, { onConflict: ["email"] })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function telechargerPDF({ html, id, invoiceDate, clientName }) {
  const res = await fetch("https://invoiceapi-lfca.onrender.com/pdf/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });
  if (!res.ok) throw new Error("Erreur génération PDF");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  let filename;
  if (invoiceDate && clientName) {
    const cleanClientName = clientName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15);
    const date = new Date(invoiceDate).toISOString().split('T')[0];
    filename = `facture_${cleanClientName}_${date}.pdf`;
  } else {
    const today = new Date().toISOString().split('T')[0];
    const shortId = id ? id.substring(0, 8) : 'document';
    filename = `facture_${today}_${shortId}.pdf`;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function verifierServicePDF() {
  try {
    const res = await fetch("https://invoiceapi-lfca.onrender.com/pdf/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: "<p>test</p>" }),
    });
    return { status: res.ok ? "OK" : "ERROR" };
  } catch {
    throw new Error("Service PDF indisponible");
  }
}

export async function creerFacture(factureData) {
  const { data, error } = await supabase
    .from("facture")
    .insert([{ ...factureData, user_id: getUserId() }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getFacturesParClient() {
  const { data, error } = await supabase
    .from("facture")
    .select("*")
    .eq("user_id", getUserId())
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function deleteFactures(factureId) {
  const { data, error } = await supabase
    .from("facture")
    .delete()
    .eq("id", factureId)
    .eq("user_id", getUserId())
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function mettreAJourFacture(id, donnees) {
  const { data, error } = await supabase
    .from("facture")
    .update(donnees)
    .eq("id", id)
    .eq("user_id", getUserId())
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function creerClient(clientData) {
  const { data, error } = await supabase
    .from("clients")
    .insert([{ ...clientData, user_id: getUserId() }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", getUserId());
  if (error) throw error;
  return data || [];
}

export async function deleteClient(clientId) {
  const { data, error } = await supabase
    .from("clients")
    .delete()
    .eq("id", clientId)
    .eq("user_id", getUserId())
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getFactureById(id) {
  const { data, error } = await supabase
    .from("facture")
    .select("*")
    .eq("id", id)
    .eq("user_id", getUserId())
    .single();
  if (error) throw error;
  return data;
}

export async function getInfoEntreprise() {
  const { data, error } = await supabase
    .from("entreprises")
    .select("*")
    .eq("user_id", getUserId())
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function sauvegarderInfoEntreprise(infoData) {
  const { data, error } = await supabase
    .from("entreprises")
    .insert([{ ...infoData, user_id: getUserId() }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function mettreAJourInfoEntreprise(id, infoData) {
  const { data, error } = await supabase
    .from("entreprises")
    .update(infoData)
    .eq("id", id)
    .eq("user_id", getUserId())
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function convertirFichierEnBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
