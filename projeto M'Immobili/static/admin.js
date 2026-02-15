import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

async function checarAcesso() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
        window.location.href = "../templates/loginAdm.html";
        return;
    }

    const { data: perfil } = await supabase
        .from('perfis')
        .select('role') 
        .eq('id', user.id)
        .single();

    const isAdmin = perfil?.role === 'admin';
    carregarPedidos(isAdmin, user.id);
}

async function carregarPedidos(isAdmin, userId) {
    let query = supabase.from('pedidos').select('*');

    if (!isAdmin) {
        query = query.eq('user_id', userId); 
    }

    const { data: pedidos, error } = await query;
    const tabela = document.querySelector('[data-list="pedidos"]');
    
    if (error) return console.error(error);

    tabela.innerHTML = pedidos.map(p => `
        <tr>
            <td>${p.numero_pedido}</td>
            <td>${p.produto}</td>
            <td><strong>${p.status}</strong></td>
            <td>
                ${isAdmin ? `
                    <select onchange="atualizarStatus(${p.id}, this.value)">
                        <option value="Recebido" ${p.status === 'Recebido' ? 'selected' : ''}>Recebido</option>
                        <option value="Em fabricação" ${p.status === 'Em fabricação' ? 'selected' : ''}>Em fabricação</option>
                        <option value="Pronto" ${p.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                    </select>
                ` : `
                    <span>Apenas Leitura</span>
                `}
            </td>
        </tr>
    `).join('');
}

window.atualizarStatus = async (id, novoStatus) => {
    const { error } = await supabase.from('pedidos').update({ status: novoStatus }).eq('id', id);
    if (error) alert("Erro ao atualizar!");
    else alert("Status atualizado com sucesso!");
};

checarAcesso();
