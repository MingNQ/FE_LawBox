import { useState, useEffect, useCallback, useMemo } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { toggleFavorite as toggleFavoriteApi, searchFavoriteDocuments } from "@client/api/favoriteApi";
import { useAuth } from "@shared/hooks/useAuth";
import { useToast } from "@shared/hooks/useToast";

export function FavoriteProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set());
      return;
    }

    try {
      const data = await searchFavoriteDocuments({ 
        ignorePagination: true
      });
      
      if (data.success && data.result?.data) {
        const ids = new Set(data.result.data.map(doc => doc.id));
        setFavoriteIds(ids);
      }
    } catch (err) {
      console.error("Error fetching initial favorites:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchInitialFavorites();
  }, [fetchInitialFavorites]);

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds]);

  const { toast } = useToast();

  const toggleFavorite = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const res = await toggleFavoriteApi(id);
      if (res.success) {
        const wasFavorite = favoriteIds.has(id);
        if (wasFavorite) {
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          toast.success("Đã xóa khỏi danh sách yêu thích");
        } else {
          setFavoriteIds((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
          toast.success("Đã thêm vào danh sách yêu thích");
        }
        return true;
      }
      toast.error("Không thể cập nhật danh sách yêu thích");
      return false;
    } catch (err) {
      console.error("Error toggling favorite in context:", err);
      toast.error("Đã có lỗi xảy ra");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const value = useMemo(() => ({
    favoriteIds,
    isFavorite,
    toggleFavorite,
    refreshFavorites: fetchInitialFavorites,
    isLoading
  }), [favoriteIds, isFavorite, toggleFavorite, fetchInitialFavorites, isLoading]);

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
