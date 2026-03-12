import { useContext } from "react";
import { AuthContext } from "@shared/contexts/AuthContext";

export const useAuth = () => useContext(AuthContext);
