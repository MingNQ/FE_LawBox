import { jwtDecode } from "jwt-decode";

export function parseJwt(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
