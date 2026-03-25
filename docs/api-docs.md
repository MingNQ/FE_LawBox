# LawBox API Documentation

This document lists all available API endpoints in the LawBox system, categorized by module and role.

## 1. Authentication (`/api/v1/client/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/sign-in/initiate` | Bắt đầu đăng nhập bằng email/sđt và password |
| `POST` | `/sign-in/verify-otp` | Xác thực OTP để hoàn tất đăng nhập |
| `POST` | `/sign-in/resend-otp` | Gửi lại mã OTP đăng nhập |
| `POST` | `/sign-in/initiate` | Bắt đầu đăng ký tài khoản mới |
| `POST` | `/sign-up/verify-contact` | Xác thực liên hệ để hoàn tất đăng ký |
| `POST` | `/sign-up/resend-otp` | Gửi lại mã OTP đăng ký |

## 2. Token Auth (`/api/v1/client/tokens` & `/api/v1/admin/tokens`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Get token / login |
| `POST` | `/refresh` | Refresh access token |

## 3. Client API

Các API dành cho người dùng (Client), prefix `api/v1/client/`.

### User & Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/users/current-user` | Lấy thông tin user hiện tại |
| `GET`  | `/users/{id}` | Lấy thông tin user theo ID |
| `POST` | `/users/search` | Tìm kiếm user |

### Chat & Agent
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/agents/chat` | Gửi câu hỏi cho AI (kèm conversationId) |

### Legal Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/legal-search` | Tìm kiếm trực tiếp các điều luật liên quan |

### Conversation Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/conversations` | Tạo mới cuộc hội thoại |
| `GET`  | `/conversations/my` | Lấy danh sách hội thoại của user hiện tại |
| `GET`  | `/conversations/{id}` | Lấy hội chi tiết hội thoại và tin nhắn |
| `PUT`  | `/conversations/{id}` | Cập nhật thông tin hội thoại |
| `DELETE` | `/conversations/{id}` | Xóa cuộc hội thoại |
| `POST` | `/conversations/search` | Tìm kiếm hội thoại theo điều kiện |
| `POST` | `/conversations/{id}/pin` | Ghim / Bỏ ghim hội thoại |
| `POST` | `/conversations/{id}/messages/{messageId}/reaction` | Reaction (Like/Dislike) tin nhắn |
| `POST` | `/conversations/{id}/messages/{messageId}/comment` | Comment phản hồi cho tin nhắn |

### Token Usage (Client)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/token-usages/my` | Thống kê token usage của user hiện tại |
| `GET`  | `/token-usages/conversation/{conversationId}` | Thống kê token theo hội thoại cụ thể |

---

## 4. Admin API

Các API dành cho Admin, prefix `api/v1/admin/`, yêu cầu quyền `SuperAdmin`.

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user` | Tạo user mới |
| `PUT`  | `/user/{id}` | Cập nhật thông tin user |
| `DELETE` | `/user/{id}` | Xóa user |
| `POST` | `/user/search` | Lấy danh sách user theo điều kiện phân trang |
| `GET`  | `/user/{id}` | Lấy thông tin chi tiết user |
| `GET`  | `/user/current-user` | Lấy thông tin Admin hiện tại |
| `GET`  | `/user/users-by-role` | Danh sách user theo Role |
| `POST` | `/user/{id}/change-password` | Đổi mật khẩu cho user bất kỳ |
| `POST` | `/user/change-password` | Đổi mật khẩu của Admin hiện tại |
| `GET`  | `/user/stat` | Thống kê số lượng user |

### Document Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/documents/upload` | Upload tài liệu pháp luật (extract, chunking, embedding) |
| `PUT`  | `/documents/{id}` | Cập nhật thông tin tài liệu |
| `DELETE` | `/documents/{id}` | Xóa tài liệu khỏi hệ thống |
| `GET`  | `/documents/{id}` | Chi tiết tài liệu |
| `POST` | `/documents/search` | Thống kê tài liệu phân trang |
| `GET`  | `/documents/stat` | Thống kê tổng quan số lượng tài liệu, chunk, vector |

### Folder Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/folders` | Tạo folder mới |
| `PUT`  | `/folders/{id}` | Cập nhật folder |
| `DELETE` | `/folders/{id}` | Xóa folder |
| `GET`  | `/folders` | Danh sách tất cả folder (tree) |
| `GET`  | `/folders/{id}/documents` | Danh sách tài liệu trong 1 folder |

### Token Usage (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/token-usages/stat/day/{date}` | Thống kê số token sử dụng của toàn hệ thống theo hệ ngày |

---

## 5. Common & Integration APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/v1/common/file-storage/{id}` | Tải / Xem file đã upload |
| `POST` | `/api/v1/common/file-storage/upload/single` | Upload 1 file chung |
| `POST` | `/api/v1/common/file-storage/upload/multiple` | Upload nhiều file chung |
| `POST` | `/api/v1/integrate/email/send` | Gửi email thông qua hệ thống |
