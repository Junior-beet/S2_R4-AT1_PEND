import axios from 'axios';

// URL base da API de categorias
const API_URL = 'http://localhost:8080/categorias';

// Busca a lista de categorias na API
export async function buscarCategorias() {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;

  } catch (erro) {
    // Trata erro de requisição e evita quebrar a aplicação
    console.error('Erro ao buscar categorias', erro);
    return [];
  }
}