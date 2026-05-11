import { buscarProdutos } from '../../services/produtos/produtos.api.js';
import { buscarCategorias } from '../../services/produtos/categorias.api.js';
import { pesquisarProduto } from '../../components/layout/navbar.component.js';
import { criarPaginacao, renderizarProdutos } from '../../components/ui/paginacao.component.js';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component.js';

export async function produtosPage() {

  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let produtos = [];
  let produtosFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🛍️ Produtos</h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-produtos"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-produtos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');
  const selectCategoria = document.querySelector('#selectCategoria');

  produtos = await buscarProdutos();
  const categorias = await buscarCategorias();
  produtosFiltrados = produtos;

  // Limpar e popular o select com categorias
  selectCategoria.innerHTML = '<option value="">Todas as Categorias</option>';
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.name;
    option.textContent = categoria.name;
    selectCategoria.appendChild(option);
  });
  selectCategoria.value = ''; // Garantir que comece com "Todas as Categorias"

  loading.remove();
  row.classList.remove('d-none');

  function atualizarTela() {
    renderizarProdutos(row, produtosFiltrados, paginaAtual);

    const paginacao = criarPaginacao({
      totalItens: produtosFiltrados.length,
      paginaAtual,
      onPageChange: (novaPagina) => {
        paginaAtual = novaPagina;
        atualizarTela();
      }
    });

    paginacaoContainer.innerHTML = '';
    paginacaoContainer.appendChild(paginacao);
  }

  atualizarTela();

  // Event listener para filtro de categoria
  selectCategoria.addEventListener('change', () => {
    const categoriaSelecionada = selectCategoria.value;
    if (categoriaSelecionada === '') {
      produtosFiltrados = produtos;
    } else {
      produtosFiltrados = produtos.filter(produto => produto.category === categoriaSelecionada);
    }
    paginaAtual = 1;
    atualizarTela();
  });

  pesquisarProduto(produtos, (resultado) => {
    paginaAtual = 1;
    produtosFiltrados = resultado;
    atualizarTela();
  });
}