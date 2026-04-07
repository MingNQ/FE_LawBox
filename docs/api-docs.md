# LawBox API Documentation

This document lists all available API endpoints in the LawBox system, categorized by module and role. Include request bodies and query parameters to assist Frontend integration.

## 1. Authentication (`/api/v1/client/auth`)

| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/sign-in/initiate` | `{ Contact, Password, RememberMe (bool) }` | Bắt đầu đăng nhập bằng email/sđt và password |
| `POST` | `/sign-in/verify-otp` | `{ Contact, VerificationCode, RememberMe (bool) }` | Xác thực OTP để hoàn tất đăng nhập |
| `POST` | `/sign-in/resend-otp` | `{ Contact, VerificationId (long) }` | Gửi lại mã OTP đăng nhập |
| `POST` | `/sign-up/initiate` | `{ FirstName, LastName, Contact, Password, ConfirmPassword }` | Bắt đầu đăng ký |
| `POST` | `/sign-up/verify-contact`| `{ Contact, VerificationCode }` | Xác thực liên hệ để hoàn tất đăng ký |
| `POST` | `/sign-up/resend-otp` | `{ Contact, VerificationId (long) }` | Gửi lại mã OTP đăng ký |

---

## 2. Token Auth (`/api/v1/client/tokens` & `/api/v1/admin/tokens`)

| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/` | `{ Email, Password }` | Get token / login |
| `POST` | `/refresh` | `{ AccessToken, RefreshToken }` | Refresh access token |

---

## 3. Client API

Các API dành cho người dùng (Client), prefix `api/v1/client/`.

### User & Profile
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/users/current-user` | - | Lấy thông tin user hiện tại |
| `GET`  | `/users/{id}` | - | Lấy thông tin user theo ID |
| `POST` | `/users/search` | `{ Keyword, PageNumber, PageSize }` | Tìm kiếm user |

### AI Agents & Chat
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/agents` | - | Lấy danh sách các AI Agent khả dụng (enabled) |
| `POST` | `/agents/chat` | `{ ConversationId (long?), Question (string), AiAgentId (int?) }` | Gửi câu hỏi cho AI (Có thể chọn Agent) |

### Legal Search
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/legal-search` | `{ Question (string), TopK (int: default 10) }` | Tìm kiếm trực tiếp điều luật |

### Conversation Data
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/conversations` | `{ Title (string) }` | Tạo mới cuộc hội thoại |
| `GET`  | `/conversations/my` | - | Lấy danh sách hội thoại của user hiện tại |
| `GET`  | `/conversations/{id}` | - | Lấy hội chi tiết hội thoại và tin nhắn |
| `PUT`  | `/conversations/{id}` | `{ Title (string) }` | Cập nhật thông tin hội thoại |
| `DELETE` | `/conversations/{id}` | - | Xóa cuộc hội thoại |
| `POST` | `/conversations/search` | `{ Keyword, PageNumber, PageSize }` | Tìm kiếm hội thoại theo điều kiện |
| `POST` | `/conversations/{id}/pin` | `{ Pinned (bool) }` | Ghim / Bỏ ghim hội thoại |
| `POST` | `/conversations/{id}/messages/{messageId}/reaction` | `{ Reaction (0: None, 1: Like, 2: Dislike) }` | Reaction tin nhắn |
| `POST` | `/conversations/{id}/messages/{messageId}/comment` | `{ Comment (string) }` | Comment cho tin nhắn bot |

### Token Usage (Client)
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/token-usages/my` | - | Thống kê token usage của user hiện tại |
| `GET`  | `/token-usages/conversation/{conversationId}`| - | Thống kê token theo hội thoại cụ thể |

---

## 4. Admin API

Các API dành cho Admin, prefix `api/v1/admin/`, yêu cầu quyền `SuperAdmin`.

### AI Agent Management
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/ai-agents` | `?enabledOnly=bool` | Danh sách AI Agents |
| `GET`  | `/ai-agents/{id}` | - | Chi tiết AI Agent |
| `POST` | `/ai-agents` | `{ Name, Description?, SystemPrompt, ProviderName, ModelName, Temperature, IsDefault, IsEnabled }` | Tạo Agent mới |
| `PUT`  | `/ai-agents/{id}` | `{ Id, Name, ... }` | Cập nhật Agent |
| `DELETE` | `/ai-agents/{id}` | - | Xóa Agent |

### User Management
_(Base User Props: Email, FirstName, LastName, AvatarId, Active, LockoutEnabled, RoleIds)_

| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/user` | `{ UserName, Password, ...BaseProps }` | Tạo user mới |
| `PUT`  | `/user/{id}` | `{ ...BaseProps }` | Cập nhật thông tin user |
| `DELETE` | `/user/{id}` | - | Xóa user |
| `POST` | `/user/search` | `{ Keyword, PageNumber, PageSize }` | Lấy danh sách user theo điều kiện phân trang |
| `GET`  | `/user/{id}` | - | Lấy thông tin chi tiết user |
| `GET`  | `/user/current-user` | - | Lấy thông tin Admin hiện tại |
| `GET`  | `/user/users-by-role` | `?RoleId={long}` | Danh sách user theo Role |
| `POST` | `/user/{id}/change-password` | `{ CurrentPassword, NewPassword, ConfirmNewPassword }` | Đổi mật khẩu cho user bất kỳ |
| `POST` | `/user/change-password` | `{ CurrentPassword, NewPassword, ConfirmNewPassword }` | Đổi mật khẩu của Admin hiện tại |
| `GET`  | `/user/stat` | - | Thống kê số lượng user |

### Document Management
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/documents/upload` | **FormData**: `FolderId`, `Name`, `Type`, `File` | Upload tài liệu pháp luật |
| `PUT`  | `/documents/{id}` | `{ Name (string) }` | Cập nhật thông tin tài liệu |
| `DELETE` | `/documents/{id}` | - | Xóa tài liệu khỏi hệ thống |
| `GET`  | `/documents/{id}` | - | Chi tiết tài liệu |
| `POST` | `/documents/search` | `{ Keyword, PageNumber, PageSize }` | Lấy tài liệu phân trang |
| `GET`  | `/documents/stat` | - | Thống kê tổng quan số lượng tài liệu |

### Folder Management
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `POST` | `/folders` | `{ ParentId (long?), Name (string), IsDeletable (bool) }` | Tạo folder mới |
| `PUT`  | `/folders/{id}` | `{ Name, IsDeletable }` | Cập nhật folder |
| `DELETE` | `/folders/{id}` | - | Xóa folder |
| `GET`  | `/folders` | - | Danh sách tất cả folder (tree) |
| `GET`  | `/folders/{id}/documents` | - | Danh sách tài liệu trong 1 folder |

### Token Usage (Admin)
| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/token-usages/stat/day/{date}` | - | Thống kê số token sử dụng theo ngày |

---

## 5. Common & Integration APIs

| Method | Endpoint | Request Body / Params | Description |
|--------|----------|-----------------------|-------------|
| `GET`  | `/common/file-storage/{id}` | - | Tải / Xem file đã upload |
| `POST` | `/common/file-storage/upload/single`| **FormData**: `FileData (IFormFile)` | Upload 1 file chung |
| `POST` | `/common/file-storage/upload/multiple`| **FormData**: `Files (List<IFormFile>)` | Upload nhiều file chung |
| `POST` | `/integrate/email/send` | `{ ToAddress, Subject, Body }` | Gửi email thông qua hệ thống |
