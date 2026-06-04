# VNUHCM Calculator

Ứng dụng web React + Vite để tính điểm xét tuyển tham khảo cho các trường thành viên của ĐHQG-HCM mùa tuyển sinh 2026.

README này được viết theo hướng "handover kỹ thuật" để AI khác hoặc lập trình viên mới có thể đọc nhanh, hiểu cấu trúc dự án và bắt đầu chỉnh sửa đúng chỗ.

## 1. Mục tiêu sản phẩm

Trang web cho phép người dùng:

- Chọn trường cần tính điểm.
- Nhập điểm theo nhiều phương thức tuyển sinh.
- Xem kết quả quy đổi/tổng điểm ngay lập tức.
- Lưu dữ liệu tạm thời trên trình duyệt để quay lại tiếp tục nhập.

Các trường/phần hiện có:

- `HCMUS`
- `HCMUT`
- `HCMUSSH`
- `UEL`
- `IU`
- `UHS`
- `UIT` hiện là thẻ điều hướng ra trang tuyển sinh ngoài, chưa có calculator nội bộ.

## 2. Stack và công nghệ

- `React 19`
- `Vite 8`
- `react-router-dom 7`
- `Tailwind CSS`
- `lucide-react`
- Test runner hiện tại: `node --test`
- Lint: `ESLint`
- Deploy: `GitHub Actions` + `GitHub Pages`

## 3. Kiến trúc thư mục

```text
.
|-- public/                # tài nguyên tĩnh
|-- src/
|   |-- components/
|   |   |-- common/        # component dùng lại cho nhiều calculator
|   |   `-- layout/        # Navbar, Footer, Layout...
|   |-- constants/         # bảng quy đổi, cấu hình dữ liệu từng trường
|   |-- hooks/             # logic tính điểm + lưu localStorage
|   |-- pages/             # từng trang calculator và trang chủ
|   |-- App.jsx            # router toàn ứng dụng
|   `-- main.jsx           # entry point
|-- test/                  # test Node thuần cho logic dữ liệu
|-- .github/workflows/     # CI/CD GitHub Pages
|-- vite.config.js
`-- package.json
```

## 4. Luồng ứng dụng

Luồng chính của app:

1. `src/main.jsx` mount ứng dụng React.
2. `src/App.jsx` dùng `HashRouter` để tương thích GitHub Pages.
3. Trang chủ `src/pages/Home.jsx` render danh sách trường từ `src/constants/common.js`.
4. Mỗi trang calculator gọi một hook riêng trong `src/hooks/`.
5. Hook đọc state, tính toán bằng dữ liệu ở `src/constants/`, rồi trả `state` + `results`.
6. Page hiển thị form nhập liệu ở cột trái và kết quả ở cột phải / thanh nổi mobile.

## 5. Những file quan trọng nhất

### Điều hướng

- `src/App.jsx`
  - Khai báo toàn bộ route.
  - Dùng `HashRouter`, nên URL production có dạng `/#/hcmut`.

### Dữ liệu dùng chung

- `src/constants/common.js`
  - Danh sách trường hiển thị ở trang chủ.
  - Mức điểm ưu tiên khu vực/đối tượng dùng lại nhiều nơi.

### Logic tính điểm theo trường

- `src/hooks/useHcmusCalculator.js`
- `src/hooks/useHcmutCalculator.js`
- `src/hooks/useUelCalculator.js`
- `src/hooks/useIuCalculator.js`
- `src/hooks/useUhsCalculator.js`
- `src/hooks/useUsshCalculator.js`

Mỗi hook thường có pattern giống nhau:

- Khai báo `INITIAL_VALUES`.
- Gọi `usePersistentCalculatorState(...)`.
- Dùng `useMemo(...)` để tính kết quả.
- Trả về:
  - `state`: dữ liệu form + setter + cờ `hasSavedData`.
  - `results`: các giá trị quy đổi và tổng điểm để render UI.

### Hook lưu localStorage

- `src/hooks/usePersistentCalculatorState.js`

Vai trò:

- Đọc dữ liệu từ `localStorage`.
- Hợp nhất với `initialValues`.
- Tự sinh setter theo tên field.
- Tự lưu lại khi state đổi.
- Xóa dữ liệu khi người dùng bấm reset.

Đây là hook nền tảng của gần như toàn bộ calculator.

### Bảng quy đổi và công thức

- `src/constants/hcmus.js`
- `src/constants/hcmut.js`
- `src/constants/uel.js`
- `src/constants/iu.js`
- `src/constants/uhs.js`

Nếu cần cập nhật quy chế tuyển sinh mới, gần như luôn bắt đầu từ nhóm file này.

## 6. Cách thêm hoặc sửa một trường

Nếu AI/dev cần cập nhật một trường hiện có:

1. Xác định file page trong `src/pages/`.
2. Xác định hook logic tương ứng trong `src/hooks/`.
3. Xác định bảng quy đổi trong `src/constants/`.
4. Nếu thêm field mới vào form:
   - thêm vào `INITIAL_VALUES`,
   - dùng setter do `usePersistentCalculatorState` sinh ra,
   - đưa field vào dependency của `useMemo`.
5. Nếu thay đổi UI dùng chung, sửa ở `src/components/common/`.

Nếu cần thêm trường mới hoàn toàn:

1. Thêm metadata vào `SCHOOLS` trong `src/constants/common.js`.
2. Tạo page mới trong `src/pages/`.
3. Tạo hook mới trong `src/hooks/`.
4. Tạo constants mới nếu có bảng quy đổi riêng.
5. Thêm route trong `src/App.jsx`.

## 7. Quy ước đang dùng trong code

- Dữ liệu nhập form thường được lưu dưới dạng chuỗi để bám sát giá trị ô input.
- Khi tính toán mới `parseFloat(...) || 0`.
- Nhiều form hỗ trợ "nhập chi tiết" hoặc "nhập nhanh tổng điểm"; khi một chế độ có dữ liệu thì chế độ kia bị khóa.
- `useMemo` được dùng để tránh tính lại không cần thiết khi render.
- Một số nơi có `clampScore(...)` để giới hạn điểm hợp lệ ngay ở tầng UI.

## 8. Cách chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`.

## 9. Kiểm tra chất lượng

Các lệnh chuẩn:

```bash
npm test
npm run lint
npm run build
```

Chiến lược test hiện tại:

- Dùng `node --test`.
- Tập trung vào các hàm quy đổi/bảng dữ liệu có thể kiểm tra trong môi trường Node thuần.
- Không dùng `vitest` hay `@testing-library` trong repo hiện tại để tránh phụ thuộc DOM runner không được cấu hình trong CI.

## 10. Deploy GitHub Pages

Workflow: `/.github/workflows/deploy.yml`

Pipeline hiện chạy:

1. `npm ci`
2. `npm test`
3. `npm run lint`
4. `npm run build`
5. deploy `dist/` lên GitHub Pages

Lưu ý quan trọng:

- `vite.config.js` tự tính `base` từ tên repository khi chạy trong GitHub Actions.
- `src/App.jsx` dùng `HashRouter`, nên không bị lỗi route con khi host trên Pages.

## 11. Sự cố CI đã gặp và cách xử lý

Lỗi trước đây:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@testing-library/jest-dom'
```

Nguyên nhân gốc:

- Repo đang chạy test bằng `node --test`.
- Nhưng lại còn file test/setup theo `vitest` + `@testing-library`.
- CI trên GitHub Actions không cài các package đó, nên workflow fail ngay từ bước import.

Cách xử lý đã chốt:

- Loại bỏ phần test `vitest`/DOM chưa được tích hợp hoàn chỉnh.
- Giữ một hệ test duy nhất là `node --test`.
- Giữ lại và bổ sung test Node thuần cho logic quan trọng để CI ổn định.

## 12. Điểm cần cẩn trọng khi AI sửa code

- Đừng đổi `HashRouter` sang `BrowserRouter` nếu vẫn deploy trên GitHub Pages.
- Đừng thêm dependency test mới nếu chưa cập nhật đồng bộ `package.json`, lockfile và workflow CI.
- Khi sửa công thức tuyển sinh, luôn kiểm tra lại bảng quy đổi trong `src/constants/`.
- Nếu thêm field vào state mà quên thêm vào `INITIAL_VALUES`, localStorage và setter tự sinh sẽ lệch.
- Nếu thay đổi route slug, nhớ cập nhật cả `SCHOOLS` lẫn `src/App.jsx`.

## 13. Gợi ý điểm vào code nhanh cho AI khác

Tùy mục tiêu, hãy bắt đầu từ:

- Muốn sửa UI chung: `src/components/common/`
- Muốn sửa menu, layout: `src/components/layout/`
- Muốn sửa route: `src/App.jsx`
- Muốn sửa dữ liệu trường ở trang chủ: `src/constants/common.js`
- Muốn sửa công thức từng trường: `src/hooks/` + `src/constants/`
- Muốn sửa deploy Pages: `.github/workflows/deploy.yml` và `vite.config.js`

## 14. Lưu ý nghiệp vụ

- Kết quả chỉ mang tính tham khảo.
- Quy chế tuyển sinh thực tế có thể thay đổi theo năm.
- Mỗi khi cập nhật mùa tuyển sinh mới, nên rà lại toàn bộ bảng quy đổi, mô tả CTA và link nguồn chính thức của từng trường.

## 15. License

Dự án dùng giấy phép `MIT`.
