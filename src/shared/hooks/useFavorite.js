import { useContext } from "react";
import { FavoriteContext } from "@shared/contexts/FavoriteContext";

export const useFavorite = () => useContext(FavoriteContext);
