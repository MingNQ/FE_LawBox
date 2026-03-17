export const ROUTES = {
  HOME: "/",

  AUTH: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
  },

  CHAT: "/chat",
  CHAT_DETAIL: "/chat/:conversationId",

  ADMIN: {
    AUTH: "/admin/auth",
    DASHBOARD: "/admin/dashboard",
    FOLDERS: "/admin/folders",
    DOCUMENTS: "/admin/folders/:folderId/documents",
    USERS: "/admin/users",
  },
};
