import { listarCarrinho } from '../../storage/carrinho/carrinho.storage';
import { criarPaginacao, renderizarProdutos } from '../../components/ui/paginacao.component';
import spinnerCarregamento from '../../components/ui/spinner-carregamento.component';
import { ITENS_POR_PAGINA } from '../../config/app.config';

export async function produtosCarrinhoPage() {
  const app = document.querySelector('#app');

  let paginaAtual = 1;
  let carrinho = [];
  let carrinhoFiltrados = [];

  app.innerHTML = `
    <h1 class="fw-bold text-primary">🛒 Carrinho </h1>
    ${spinnerCarregamento()}
    <div class="row mt-4 d-none" id="lista-produtos"></div>
    <div id="paginacao"></div>
  `;

  const row = document.querySelector('#lista-produtos');
  const loading = document.querySelector('#loading');
  const paginacaoContainer = document.querySelector('#paginacao');
  const inputSearch = document.querySelector('#inputSearch');
  let termoBusca = '';

  carrinho = listarCarrinho();
  carrinhoFiltrados = carrinho;

  loading.remove();
  row.classList.remove('d-none');

  function filtrarCarrinho(lista) {
    if (!termoBusca) {
      return lista;
    }

    return lista.filter((produtos) =>
      produtos.name.toLowerCase().includes(termoBusca)
    );
  }

  function sincronizarCarrinho() {
    favoritos = listarCarrinho();
    favoritosFiltrados = filtrarCarrinho(carrinho);

    const totalPaginas = Math.max(1, Math.ceil(carrinhoFiltrados.length / ITENS_POR_PAGINA));
    paginaAtual = Math.min(paginaAtual, totalPaginas);
  }

  function atualizarTela() {
    // Argumentos enviados para `renderizarPersonagens`:
    // 1) row: elemento HTML onde os cards serão desenhados
    // 2) favoritosFiltrados: lista atual (já com busca aplicada)
    // 3) paginaAtual: qual "fatia" da lista deve aparecer
    // 4) opcoes: objeto para comportamentos extras (opcional)
    //
    // Aqui estamos enviando `onFavoritoAlterado` dentro de `opcoes`.
    // Esse callback é executado pelo card quando o aluno clica no botão de favorito.
    renderizarProdutos(row, carrinhoFiltrados, paginaAtual, {
      // `({ favorito })` é desestruturação de objeto:
      // - o card envia um objeto com dados da ação
      // - pegamos somente a propriedade `favorito`
      // Exemplo do objeto completo recebido:
      // { personagem: {...}, favorito: false }
      onCarrinhoAlterado: ({ carrinho }) => {
        // Se virou `false`, significa que o item foi removido dos favoritos.
        if (!carrinho) {
          // Recarrega lista + recalcula paginação.
          sincronizarCarrinho();
          // Redesenha a tela com os novos dados.
          atualizarTela();
        }
      }
    });

    const paginacao = criarPaginacao({
      totalItens: carrinhoFiltrados.length,
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

  inputSearch.addEventListener('input', () => {
    termoBusca = inputSearch.value.toLowerCase().trim();
    carrinhoFiltrados = filtrarCarrinho(carrinho);
    paginaAtual = 1;
    atualizarTela();
  });
}