import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://wrfldeioljmzblooyvpd.supabase.co', 'sb_publishable_W7pVaS9hk_Ss4ZyCydsVJg_D-3BAlze');

async function checarAcesso() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        window.location.href = "loginAdm.html";
    } else {
        carregarPedidos();
    }
}

async function carregarPedidos() {
    const { data: pedidos, error } = await supabase.from('pedidos').select('*');
    const tabela = document.querySelector('[data-list="pedidos"]');
    
    if (error) return console.error(error);

    tabela.innerHTML = pedidos.map(p => `
        <tr>
            <td>${p.numero_pedido}</td>
            <td>${p.produto}</td>
            <td>${p.status}</td>
            <td>
                <select onchange="atualizarStatus(${p.id}, this.value)">
                    <option value="Recebido" ${p.status === 'Recebido' ? 'selected' : ''}>Recebido</option>
                    <option value="Em fabricação" ${p.status === 'Em fabricação' ? 'selected' : ''}>Em fabricação</option>
                    <option value="Pronto" ${p.status === 'Pronto' ? 'selected' : ''}>Pronto</option>
                </select>
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
