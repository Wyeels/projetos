import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

window.loginUsuario = async function(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        return alert("Erro ao entrar: " + error.message);
    }

    if (data.session) {
        alert("Login realizado com sucesso!");
        window.location.href = "../templates/index.html"; 
    }
}

document.getElementById('ir-cadastro')?.addEventListener('click', () => {
  window.location.href = '../templates/cadastroUser.html';
});