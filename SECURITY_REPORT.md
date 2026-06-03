# Bao cao quet bao mat du an

- Thoi gian quet: 2026-06-02
- Pham vi: toan bo ma nguon trong `src/`, tep cau hinh goc du an, `package.json`, `package-lock.json`, `index.html`
- Phuong phap: ra soat tinh cac mau ma nguy hiem, kiem tra URL ngoai, script cai dat, hanh vi truy cap du lieu nhay cam, va doi chieu cac diem truy cap luu tru cuc bo

## Ket luan tong quan

Khong phat hien ma doc, ransomware, spyware, keylogger, doan ma danh cap thong tin nguoi dung, hoac hanh vi exfiltration du lieu trong ma nguon hien tai.

Khong tim thay cac API mang runtime nhu `fetch`, `XMLHttpRequest`, `axios`, `WebSocket`, `sendBeacon`, cung nhu cac API nhay cam nhu `document.cookie`, `navigator.geolocation`, `clipboard`, `camera`, `microphone`, `indexedDB`.

Khong tim thay cac mau thuc thi ma dong hoac he thong nguy hiem nhu `eval`, `new Function`, `child_process`, `powershell`, `cmd.exe`, `rundll32`, `ActiveXObject`.

Khong tim thay `preinstall`, `postinstall`, `prepare` hay cac script cai dat bat thuong trong cac tep package manifest.

## Cac muc da duoc kiem tra

### 1. Hanh vi mang va ket noi ben ngoai

- Khong co request mang tu dong trong runtime ung dung.
- Cac URL ngoai chi xuat hien duoi dang lien ket nguoi dung bam chuot:
  - `src/pages/Home.jsx`: lien ket thong tin tuyen sinh UIT
  - `src/pages/HcmusCalculator.jsx`: lien ket thong tin tuyen sinh HCMUS
  - `src/pages/HcmutCalculator.jsx`: lien ket thong tin tuyen sinh HCMUT
  - `src/pages/IuCalculator.jsx`: lien ket thong tin tuyen sinh IU
  - `src/pages/UelCalculator.jsx`: lien ket thong tin tuyen sinh UEL
  - `src/pages/UhsCalculator.jsx`: lien ket thong tin tuyen sinh UHS
  - `src/pages/UsshCalculator.jsx`: lien ket thong tin tuyen sinh USSH
  - `src/components/layout/Footer.jsx`: lien ket GitHub va Threads

Danh gia:
- Muc rui ro `Thong tin`: cac lien ket tren khong tu dong gui du lieu nguoi dung.
- Muc rui ro `Thap`: lien ket `Threads` khong can thiet cho chuc nang tinh diem, nen co the loai bo neu muon toi gian hoa be mat ben ngoai.

### 2. Truy cap du lieu nguoi dung va luu tru cuc bo

- Du an hien tai chi su dung `localStorage` de luu trang thai diem so phuc vu trai nghiem nguoi dung:
  - `src/hooks/usePersistentCalculatorState.js`
- Du lieu duoc luu la cac gia tri diem nhap vao form tinh diem, khong thay logic gui du lieu nay den may chu ben ngoai.

Danh gia:
- Muc rui ro `Thap`: du lieu luu cuc bo tren trinh duyet nguoi dung.
- Ghi chu: khong nen dung co che nay de luu thong tin nhay cam nhu CCCD, email, token, mat khau.

### 3. Chuoi cung ung va dependency

- `package.json` chi khai bao cac goi front-end thong dung:
  - `react`, `react-dom`, `react-router-dom`, `lucide-react`
  - bo cong cu xay dung va lint: `vite`, `eslint`, `tailwindcss`, `postcss`
- Khong phat hien script cai dat bat thuong trong `package.json`.
- Khong phat hien dau hieu goi thuc thi lenh he thong trong manifest du an.

Danh gia:
- Muc rui ro `Thap`, tuy nhien van nen du tri quy trinh cap nhat dependency dinh ky.

## Danh sach doan ma dang chu y

| Vi tri | Mo ta | Muc do | Nhan dinh |
| --- | --- | --- | --- |
| `src/components/layout/Footer.jsx` | Lien ket ra GitHub va Threads | Thong tin / Thap | Khong phai ma doc, chi la lien ket ngoai mo bang trinh duyet |
| `src/pages/*.jsx` | Cac lien ket den trang tuyen sinh cua truong | Thong tin | Co ve hop ly, khong phai ket noi runtime ngam |
| `src/hooks/usePersistentCalculatorState.js` | Doc/ghi `localStorage` de giu diem da nhap | Thap | Hanh vi mong doi, khong co exfiltration |

## Nhung gi khong tim thay

- Khong co ma hoa tap tin, khoa tap tin, doi tien chuoc
- Khong co doan ma theo doi phim bam, chup man hinh, quay camera, ghi am microphone
- Khong co hanh vi lay cookie, token, session
- Khong co co che tu dong tai file thuc thi, goi PowerShell, hay tao tien trinh con
- Khong co hanh vi tu dong gui du lieu ve webhook, Telegram, Discord, socket server hay host la

## De xuat khac phuc va tang cuong

1. Giu danh sach domain ngoai o muc toi thieu va uu tien lien ket chinh thuc cua cac truong.
2. Can nhac loai bo lien ket `Threads` neu muon giam be mat privacy ben ngoai.
3. Them Content Security Policy trong hosting production de han che script va ket noi ngoai y muon.
4. Khong luu du lieu nhay cam vao `localStorage`; chi luu du lieu diem tinh toan nhu hien tai.
5. Duy tri kiem tra dependency dinh ky bang audit trong CI/CD hoac truoc moi lan phat hanh.

## Gioi han danh gia

Bao cao nay dua tren phan tich tinh ma nguon hien co trong thu muc du an. Bao cao khong thay the cho:

- quet malware tren he thong tep cua may tinh
- quet binary sau build hoac quet server production
- kiem tra reputation va tinh toan ven cua tung dependency ngoai npm registry

Trong gioi han cua phan tich ma nguon, du an hien khong cho thay dau hieu ma doc hoac hanh vi danh cap du lieu.
