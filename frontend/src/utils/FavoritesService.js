/**
 * Serviço para gerenciar favoritos no localStorage
 */

// Obter todos os favoritos
export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (error) {
    console.error('Erro ao recuperar favoritos:', error);
    return [];
  }
};

// Adicionar um item aos favoritos
export const addFavorite = (id) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    return true;
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    return false;
  }
};

// Remover um item dos favoritos
export const removeFavorite = (id) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    return false;
  }
};

// Verificar se um item é favorito
export const isFavorite = (id) => {
  try {
    const favorites = getFavorites();
    return favorites.includes(id);
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
};

// Alternar estado de favorito
export const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    return removeFavorite(id);
  } else {
    return addFavorite(id);
  }
};

// Objeto para exportação default
const FavoritesService = {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite
};

export default FavoritesService;
