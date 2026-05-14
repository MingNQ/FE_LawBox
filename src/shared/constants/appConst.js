export const RESEND_OTP_SECONDS = 60 * 3;

export const ROLES = {
  Admin: "SuperAdmin",
  User: "NormalUser",
};

export const DOCUMENT_TYPES = {
  1: "Luật",
  2: "Nghị định",
  3: "Thông tư",
  4: "Quyết định"
}

export const EFFECTIVENESS_STATUS = {
  1: "Không xác định",
  2: "Còn hiệu lực",
  3: "Hết hiệu lực",
  4: "Hết hiệu lực một phần",
  5: "Sắp có hiệu lực"
}

export const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
