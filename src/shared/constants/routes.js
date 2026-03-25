export const ROUTES = {
  HOME: "/",

  AUTH: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
  },

  CHAT: "/chat",
  CHAT_DETAIL: "/chat/:conversationId",
  LEGAL_SEARCH: "/legal-search",

  ADMIN: {
    AUTH: "/admin/auth",
    DASHBOARD: "/admin/dashboard",
    FOLDERS: "/admin/folders",
    ALL_DOCUMENTS: "/admin/documents",
    DOCUMENTS: "/admin/folders/:folderId/documents",
    USERS: "/admin/users",
  },
};
