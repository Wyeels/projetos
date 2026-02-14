import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    await logar(email, password);
});

async function logar(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
      alert("Erro ao logar: " + error.message);
  } else if (data.user) {
      window.location.href = 'admin.html';
  }
}
