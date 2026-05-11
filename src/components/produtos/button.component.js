// Cria o botão para adicionar ao carrinho
export function criarCarrinho(carrinho = false) {
  const button = document.createElement('button');

  if (carrinho) {
    button.className = 'btn btn-sm btn-success';
    button.innerText = 'Remover do Carrinho';
  } else {
    button.className = 'btn btn-sm btn-success';
    button.innerText = 'Adicionar ao Carrinho';
  }

  return button;

}

export function removerCarrinho(carrinho = false) {
  const button = document.createElement('button');

  if (carrinho) {
    button.className = 'btn btn-sm btn-success';
    button.innerText = 'Remover do Carrinho';
  } else {
    button.className = 'btn btn-sm btn-success';
    button.innerText = 'Adicionar ao Carrinho';
  }

  return button;

}