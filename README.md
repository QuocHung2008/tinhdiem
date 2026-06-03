# Web Tính Điểm ĐHQG-HCM 2026

Ứng dụng React + Vite hỗ trợ tính điểm xét tuyển cho các trường thành viên của Đại học Quốc gia TP.HCM năm 2026.

## Mục tiêu triển khai

Dự án đã được chuẩn bị để triển khai trực tiếp lên GitHub Pages bằng GitHub Actions. Sau khi bạn đẩy toàn bộ mã nguồn lên GitHub và bật Pages cho repository, trang sẽ tự build và publish.

Các điểm đã được cấu hình sẵn:

- Dùng `HashRouter` để tránh lỗi điều hướng khi host trên GitHub Pages.
- Tự động tính `base path` theo tên repository khi build trong GitHub Actions.
- Tài nguyên public đã tương thích với đường dẫn deploy dạng `https://<username>.github.io/<repository>/`.
- Có workflow `.github/workflows/deploy.yml` để tự động test, lint, build và deploy.
- Có `.gitignore` để tránh đẩy các tệp local không cần thiết như `node_modules` và `dist`.

## Cài đặt và chạy local

```bash
git clone https://github.com/<github-username>/<repository-name>.git
cd <repository-name>
npm install
npm run dev
```

Sau đó mở `http://localhost:5173`.

## Kiểm tra trước khi push

Chạy lần lượt các lệnh sau trên máy của bạn:

```bash
npm install
npm test
npm run lint
npm run build
```

Nếu cả 4 lệnh đều thành công, dự án đã sẵn sàng để đưa lên GitHub.

## Hướng dẫn triển khai GitHub Pages từng bước

### Bước 1: Tạo repository trên GitHub

1. Đăng nhập GitHub.
2. Chọn `New repository`.
3. Đặt tên repository, ví dụ `vnuhcm-calculator`.
4. Chọn `Public`.
5. Không cần tạo thêm `README`, `.gitignore` hay license nếu bạn sẽ đẩy mã nguồn hiện tại lên.
6. Tạo repository.

### Bước 2: Đưa mã nguồn lên GitHub

Nếu dự án của bạn chưa liên kết remote:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<github-username>/<repository-name>.git
git push -u origin main
```

Nếu đã có repository local rồi, chỉ cần:

```bash
git add .
git commit -m "Prepare project for GitHub Pages"
git push origin main
```

### Bước 3: Bật GitHub Pages

1. Mở repository trên GitHub.
2. Vào `Settings`.
3. Chọn `Pages` ở thanh bên trái.
4. Tại mục `Build and deployment`, chọn `Source: GitHub Actions`.
5. Không cần chọn branch thủ công vì workflow sẽ tự deploy.

### Bước 4: Theo dõi workflow deploy

1. Vào tab `Actions`.
2. Mở workflow `Deploy to GitHub Pages`.
3. Chờ các bước hoàn thành:
   - `Install dependencies`
   - `Configure GitHub Pages`
   - `Run tests`
   - `Run lint`
   - `Build project`
   - `Deploy to GitHub Pages`

Khi workflow thành công, GitHub sẽ hiển thị đường dẫn trang đã triển khai.

### Bước 5: Mở trang sau khi triển khai

URL thường có dạng:

```text
https://<github-username>.github.io/<repository-name>/
```

Do ứng dụng dùng `HashRouter`, các trang con sẽ có dạng:

```text
https://<github-username>.github.io/<repository-name>/#/hcmus
https://<github-username>.github.io/<repository-name>/#/hcmut
```

## Những gì đã được rà soát trong dự án

Đã kiểm tra các hạng mục ảnh hưởng trực tiếp đến việc deploy:

- Đường dẫn tài nguyên public và icon.
- Cấu hình `vite.config.js` cho GitHub Pages.
- Cấu trúc `index.html` ở thư mục gốc.
- Workflow deploy bằng GitHub Actions.
- Các đường dẫn tuyệt đối có thể gây lỗi khi chạy dưới subpath.
- Khả năng định tuyến của SPA trên môi trường GitHub Pages.
- Sự hiện diện của `.gitignore` để loại bỏ tệp local không cần push.

## Các lỗi/cải tiến đã xử lý

- Sửa đường dẫn favicon trong `index.html` sang `%BASE_URL%favicon.svg`.
- Sửa logo trong `Navbar` để dùng `import.meta.env.BASE_URL`, tránh lỗi ảnh khi deploy dưới tên repository.
- Điều chỉnh `vite.config.js` để tự lấy tên repository từ biến `GITHUB_REPOSITORY` khi build trên GitHub Actions.
- Bổ sung bước `Configure GitHub Pages` vào workflow deploy.
- Thêm `.gitignore`.
- Chuẩn hóa lại metadata cơ bản trong `package.json`.
- Viết lại tài liệu triển khai để bạn có thể làm theo từng bước.

## Khắc phục sự cố thường gặp

### Trang GitHub Pages không hiển thị

Kiểm tra:

1. Repository có đang là `Public` hay không.
2. Trong `Settings > Pages`, `Source` đã chọn `GitHub Actions` hay chưa.
3. Workflow trong tab `Actions` có chạy thành công hay không.

### Workflow bị lỗi ở bước `npm ci`

Kiểm tra:

1. `package-lock.json` đã được commit chưa.
2. Bạn có đang dùng Node/npm quá cũ trên máy local trước khi push hay không.
3. Chạy lại local:

```bash
npm install
npm test
npm run lint
npm run build
```

### Trang mở được nhưng thiếu ảnh hoặc CSS

Kiểm tra:

1. Có còn dùng đường dẫn tuyệt đối kiểu `/ten-tep` trong mã nguồn hay không.
2. Tài nguyên nằm trong `public/` hoặc được import đúng từ `src/`.
3. Workflow `Build project` có thành công hay không.

### Mở trang con bị 404

Với cấu hình hiện tại, hãy dùng URL có `#`, ví dụ:

```text
https://<github-username>.github.io/<repository-name>/#/uel
```

Nếu bạn gõ URL không có `#` cho route nội bộ, GitHub Pages có thể không hiểu đó là route của SPA.

### Push xong nhưng trang chưa cập nhật

Kiểm tra:

1. Commit mới đã vào đúng nhánh `main`.
2. Workflow deploy mới nhất đã chạy xong.
3. Thử tải lại trang bằng `Ctrl + F5`.
4. Chờ thêm 1 đến 3 phút vì GitHub Pages có thể cập nhật chậm.

## Ghi chú vận hành

- Dự án hiện không chứa đường dẫn máy cá nhân kiểu `C:\...` trong mã nguồn ứng dụng.
- Các liên kết ngoài trong giao diện là liên kết tham khảo đến trang tuyển sinh chính thức hoặc trang mạng xã hội, không phải tài nguyên bắt buộc để ứng dụng render.
- Ứng dụng lưu dữ liệu nhập tạm thời ở `localStorage`; điều này không ảnh hưởng tới GitHub Pages.

## Giấy phép

Dự án phát hành theo giấy phép `MIT`.

## Lưu ý

Kết quả tính điểm chỉ mang tính tham khảo. Người dùng vẫn cần đối chiếu với thông báo tuyển sinh chính thức của từng trường.
