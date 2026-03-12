# ⚖️ LawBox - Hệ thống Tra cứu Văn bản Pháp luật Việt Nam

LawBox là ứng dụng web tra cứu văn bản pháp luật Việt Nam, cung cấp công cụ tìm kiếm thông minh, tư vấn pháp luật AI và cập nhật văn bản mới nhất. Dự án được xây dựng bằng React với kiến trúc module-based, giao diện hiện đại, hỗ trợ dark mode.

---

## 🚀 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| React | 19.2 | UI Framework |
| Vite | 8.x (beta) | Build tool & Dev server |
| Tailwind CSS | 4.2 | Utility-first CSS |
| React Router | 7.13 | Client-side routing |
| Axios | 1.13 | HTTP client |
| Lucide React | 0.575 | Icon library |
| React Markdown | 10.1 | Markdown rendering |
| ESLint | 9.x | Code linting |

---

## 📁 Kiến trúc Module-Based

Dự án sử dụng kiến trúc **module-based** để tách biệt rõ ràng giữa module **Client** (người dùng) và **Admin** (quản trị), cùng phần **Shared** (dùng chung).

```
src/
├── shared/                        # Code dùng chung giữa các module
│   ├── api/                       # HTTP client & Auth API
│   ├── components/
│   ├── constants/
│   ├── contexts/
│   ├── hooks/
│   └── stores/│
├── modules/
│   ├── client/                    # Module người dùng
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── routes.jsx             # Định nghĩa route cho client
│   │
│   └── admin/                     # Module quản trị
│       ├── components/
│       ├── pages/
│       └── routes.jsx             # Định nghĩa route cho admin
│
├── assets/                        # Tài nguyên tĩnh (hình ảnh, fonts...)
├── App.jsx                        # Root component — compose clientRoutes + adminRoutes
├── App.css                        # App-level styles
├── index.css                      # Global styles, Tailwind import, Markdown styles
└── main.jsx                       # Entry point (BrowserRouter, AuthProvider)
```

## 🌐 Routes

### Client Routes

| Route | Page | Mô tả |
|---|---|---|
| `/` | `HomePage` | Trang chủ |
| `/auth/sign-in` | `SignInPage` | Đăng nhập |
| `/auth/sign-up` | `SignUpPage` | Đăng ký |
| `/chat` | `ConversationPage` | Chat AI (tạo mới) |
| `/chat/:conversationId` | `ConversationPage` | Chat AI (xem hội thoại) |

### Admin Routes

| Route | Page | Mô tả |
|---|---|---|
| `/admin/auth` | `AuthPage` | Đăng nhập quản trị |
| `/admin/dashboard` | `Dashboard` | Tổng quan hệ thống |

---

## ⚙️ Cài đặt & Chạy dự án

### Yêu cầu

- **Node.js** >= 18
- **npm** >= 9

### Cài đặt

```bash
# Clone dự án
git clone <repo-url>
cd FE_LawBox

# Cài đặt dependencies
npm install
```

### Chạy môi trường development

```bash
npm run dev
```

Truy cập ứng dụng tại: [http://localhost:5173](http://localhost:5173)

### Build production

```bash
npm run build
```

### Preview bản build

```bash
npm run preview
```

### Kiểm tra linting

```bash
npm run lint
```

## 🤝 Hướng dẫn đóng góp

### Quy trình

1. **Fork** repository về tài khoản cá nhân.
2. Tạo **branch mới** từ `main`:
   ```bash
   git checkout -b feature/ten-tinh-nang
   ```
3. Thực hiện thay đổi, đảm bảo tuân thủ kiến trúc module-based:
   - Code cho **client** → `src/modules/client/`
   - Code cho **admin** → `src/modules/admin/`
   - Code **dùng chung** → `src/shared/`
4. Chạy `npm run lint` để kiểm tra code style.
5. Chạy `npm run build` để đảm bảo không có lỗi import.
6. **Commit** với message rõ ràng:
   ```bash
   git commit -m "feat: thêm chức năng tìm kiếm nâng cao"
   ```
7. **Push** và tạo **Pull Request** vào branch `main`.

### Quy ước đặt tên

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Component | PascalCase | `HeroSection.jsx` |
| Thư mục | camelCase / lowercase | `components/home/` |
| CSS class | Tailwind utilities | `className="text-primary"` |
| Branch | `feature/`, `fix/`, `refactor/` | `feature/ai-chatbot` |
| Commit | Conventional Commits | `feat:`, `fix:`, `refactor:` |
| Import | Sử dụng path alias | `@shared/`, `@client/`, `@admin/` |

### Quy tắc code

- Sử dụng **functional components** và **hooks**.
- Icon sử dụng thư viện **lucide-react** — không dùng Material Symbols.
- Styling bằng **Tailwind CSS** utility classes.
- Import giữa các module sử dụng **path alias** (`@shared`, `@client`, `@admin`).
- Component dùng chung giữa client & admin đặt trong `shared/components/`.
- API dùng chung đặt trong `shared/api/`, API riêng đặt trong module tương ứng.

---

## 🗺️ Roadmap — Tính năng phát triển trong tương lai

- [ ] 🔍 **Tìm kiếm nâng cao** — Tìm theo số hiệu, loại văn bản, cơ quan ban hành, ngày hiệu lực
- [ ] 📰 **Tin tức pháp luật** — Trang tin tức cập nhật các thay đổi pháp luật mới nhất
- [ ] 📄 **Chi tiết văn bản** — Xem toàn văn, lược đồ quan hệ, tình trạng hiệu lực
- [ ] 🌙 **Dark mode** — Hoàn thiện hỗ trợ giao diện tối toàn bộ ứng dụng
- [ ] 📱 **Responsive hoàn chỉnh** — Tối ưu trải nghiệm trên mobile và tablet
- [ ] 🔔 **Thông báo** — Theo dõi và nhận thông báo khi văn bản quan tâm thay đổi
- [ ] 📥 **Xuất PDF** — Tải văn bản pháp luật dưới dạng PDF

---

## 📝 License

Updating License...
