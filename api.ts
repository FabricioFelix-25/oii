const BASE_URL = 'http://localhost:3001'; // URL do seu JSON Server

// Define or import the Article type
interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: string;
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/articles`);
  if (!res.ok) throw new Error('Erro ao buscar artigos');
  return res.json();
}

export async function fetchArticleById(id: string): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar artigo');
  return res.json();
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles?slug=${slug}`);
  if (!res.ok) throw new Error('Erro ao buscar artigo');
  const list: Article[] = await res.json();
  return list[0]; // Retorna o primeiro artigo
}

export async function fetchAllArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE_URL}/articles`);
  if (!res.ok) throw new Error('Erro ao buscar todos os artigos');
  return res.json();
}

export async function fetchAuthors(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/authors`);
  if (!res.ok) throw new Error('Erro ao buscar autores');
  return res.json();
}

// Funções para criação e atualização de artigos podem ser feitas com POST, PUT
// Função para criar artigo (POST)
export async function createArticle(article: Partial<Article>): Promise<Article> {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!res.ok) {
      throw new Error('Erro ao criar artigo');
    }
  
    return res.json();  // Retorna o artigo criado
  }
  
  // Função para atualizar artigo (PUT)
  export async function updateArticle(id: string, article: Partial<Article>): Promise<Article> {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
  
    if (!res.ok) {
      throw new Error('Erro ao atualizar artigo');
    }
  
    return res.json();  // Retorna o artigo atualizado
  }
  
  // Função para deletar artigo (DELETE)
  export async function deleteArticle(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Erro ao deletar artigo');
    }
    // Nenhum conteúdo a ser retornado, então retornamos `undefined`
  }
  
