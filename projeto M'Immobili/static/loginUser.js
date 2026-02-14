import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

window.cadastrarUsuario = async function(email, senha, nome, endereco, telefone) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
    });
    
    if (error) return alert("Erro no cadastro: " + error.message);
    
    if (data.user) {
        const { error: profileError } = await supabase
            .from('perfis')
            .insert([
                { id: data.user.id, nome_completo: nome, endereco: endereco, telefone: telefone }
            ]);

        if (profileError) {
            console.error("Erro ao salvar perfil:", profileError.message);
        } else {
            alert("Cadastro realizado! Verifique seu e-mail para confirmar.");
        }
    }
}

window.iniciarSessao = async function(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) return alert("Erro ao logar: " + error.message);
    
    alert("Bem-vindo, " + data.user.email);
    // Redirecione para a home após o login em vez de apenas recarregar
    window.location.href = "../index.html"; 
}
