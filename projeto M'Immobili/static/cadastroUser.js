import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

window.cadastrarUsuario = async function(email, senha, nome, endereco) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
    });
    
    if (error) return alert("Erro no cadastro: " + error.message);
    
    if (data.user) {
        const { error: profileError } = await supabase
            .from('perfis')
            .insert([
                { id: data.user.id, nome_completo: nome, endereco: endereco, email: email, senha: senha}
            ]);

        if (profileError) {
            console.error("Erro ao salvar perfil:", profileError.message);
        } else {
            alert("Cadastro realizado! Verifique seu e-mail para confirmar.");
            window.location.href = "../templates/index.html"; 
        }
    }
}

document.getElementById('ir-login')?.addEventListener('click', () => {
  window.location.href = '../templates/loginUser.html';
});