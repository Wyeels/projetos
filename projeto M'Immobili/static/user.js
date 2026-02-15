import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

document.addEventListener('DOMContentLoaded', carregarPerfil);
async function carregarPerfil() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    window.location.href = '../templates/loginUser.html';
    return;
  }

  const { data, error } = await supabase
    .from('perfis')
    .select('*')
    .eq('id', user.id)
    .single();        

  if (error) {
    console.error("Erro ao buscar perfil:", error.message);
  } else {
    document.getElementById('user-name').textContent = data.nome || "Não informado";
    document.getElementById('user-email').textContent = user.email
    document.getElementById('user-adress'.textContent = user.adress); 
  }
}

async function deslogar() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Erro ao sair: " + error.message);
  } else {
    window.location.href = '../templates/index.html'; 
  }
}