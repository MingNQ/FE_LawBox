# ⚖️ LawBox - Hệ thống Tra cứu Văn bản Pháp luật Việt Nam

LawBox là ứng dụng web tra cứu văn bản pháp luật Việt Nam, cung cấp công cụ tìm kiếm thông minh, tư vấn pháp luật AI và cập nhật văn bản mới nhất. Dự án được xây dựng bằng React với giao diện hiện đại, hỗ trợ dark mode.

## 🚀 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| React | 19.2 | UI Framework |
| Vite | 8.x (beta) | Build tool & Dev server |
| Tailwind CSS | 4.2 | Utility-first CSS |
| React Router | 7.13 | Client-side routing |
| Lucide React | 0.575 | Icon library |
| ESLint | 9.x | Code linting |

## 📁 Tổ chức thư mục

```
src/
├── assets/          # Tài nguyên tĩnh (hình ảnh, fonts...)
├── components/      # Components tái sử dụng
│   ├── auth/        # Xác thực (OTP, Password, ProtectedRoute)
│   ├── dashboard/   # Widgets cho trang quản trị
│   ├── home/        # Các section trang chủ
│   └── layout/      # Layout chung (client & admin)
├── pages/           # Các trang theo route
│   ├── admin/       # Trang quản trị (Auth, Dashboard)
│   └── client/      # Trang người dùng (Home, SignIn, SignUp)
├── App.jsx          # Root component & routing
├── index.css        # Global styles & Tailwind import
└── main.jsx         # Entry point
```

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
3. Thực hiện thay đổi, đảm bảo tuân thủ cấu trúc thư mục ở trên.
4. Chạy `npm run lint` để kiểm tra code style.
5. **Commit** với message rõ ràng:
   ```bash
   git commit -m "feat: thêm chức năng tìm kiếm nâng cao"
   ```
6. **Push** và tạo **Pull Request** vào branch `main`.

### Quy ước đặt tên

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Component | PascalCase | `HeroSection.jsx` |
| Thư mục | camelCase / lowercase | `components/home/` |
| CSS class | Tailwind utilities | `className="text-primary"` |
| Branch | `feature/`, `fix/`, `refactor/` | `feature/ai-chatbot` |
| Commit | Conventional Commits | `feat:`, `fix:`, `refactor:` |

### Quy tắc code

- Sử dụng **functional components** và **hooks**.
- Icon sử dụng thư viện **lucide-react** — không dùng Material Symbols.
- Styling bằng **Tailwind CSS** utility classes.
- Component dùng chung đặt trong `components/`, component riêng cho page đặt theo feature.

## 🗺️ Roadmap — Tính năng phát triển trong tương lai

- [ ] 🔍 **Tìm kiếm nâng cao** — Tìm theo số hiệu, loại văn bản, cơ quan ban hành, ngày hiệu lực
- [ ] 🤖 **Hỏi đáp AI** — Chatbot tư vấn pháp luật tích hợp AI, trả lời kèm trích dẫn nguồn
- [ ] 📰 **Tin tức pháp luật** — Trang tin tức cập nhật các thay đổi pháp luật mới nhất
- [ ] 📄 **Chi tiết văn bản** — Xem toàn văn, lược đồ quan hệ, tình trạng hiệu lực
- [ ] 🔐 **Xác thực người dùng** — Đăng ký, đăng nhập, xác thực OTP
- [ ] 📊 **Dashboard quản trị** — Thống kê lượt truy cập, xu hướng tìm kiếm, quản lý nội dung
- [ ] 🌙 **Dark mode** — Hoàn thiện hỗ trợ giao diện tối toàn bộ ứng dụng
- [ ] 📱 **Responsive hoàn chỉnh** — Tối ưu trải nghiệm trên mobile và tablet
- [ ] 🔔 **Thông báo** — Theo dõi và nhận thông báo khi văn bản quan tâm thay đổi
- [ ] 📥 **Xuất PDF** — Tải văn bản pháp luật dưới dạng PDF

## 📝 License

Updating License...
