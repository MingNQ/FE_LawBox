import { createContext } from "react";

export const FavoriteContext = createContext({
  favoriteIds: new Set(),
  toggleFavorite: async () => {},
  isFavorite: () => false,
  refreshFavorites: async () => {},
  isLoading: false,
});
