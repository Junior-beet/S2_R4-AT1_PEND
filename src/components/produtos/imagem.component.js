/**
 * Cria a imagem do produto
 */
export default function criarImagemProduto(imagem) {
  const img = document.createElement('img');
  img.src = imagem;
  img.className = 'card-img-top';
  img.alt = 'Imagem do Produto';

  return img;
}