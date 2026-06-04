import { Link } from 'react-router-dom';
import { SCHOOLS } from '../constants/common';
import { ChevronRight, ExternalLink } from 'lucide-react';

export const Home = () => {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <section className="surface-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.9fr)] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-800">
              Cong cu tham khao cho mua tuyen sinh 2026
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              <span className="block">Tính điểm xét tuyển</span>
              <span className="block bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
                ĐHQG-HCM 2026
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Giao diện mới tập trung vào tốc độ nhập liệu, khả năng đọc kết quả rõ ràng
              và trải nghiệm thống nhất trên điện thoại, máy tính bảng và desktop.
            </p>
            <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Nhanh và rõ ràng</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Nhập điểm chi tiết hoặc tổng điểm tùy dữ liệu bạn đang có.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Tự động lưu dữ liệu</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Giữ lại toàn bộ thông tin trên trình duyệt để tiếp tục ngay lần sau.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-900">Tối ưu mọi màn hình</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">Thao tác mượt trên chuột, bàn phím lẫn cảm ứng.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.8)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
              Điểm nhấn trải nghiệm
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">
              Chọn trường, nhập điểm, xem ngay kịch bản tốt nhất
            </h2>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Kết quả hiển thị tức thì</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Mỗi máy tính đều có bảng tổng hợp cố định và phiên bản xem nhanh trên mobile.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Bố cục đồng nhất</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Các trường dùng chung hệ section, banner và card kết quả để giảm nhiễu thị giác.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="section-title">Danh sách công cụ</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Chọn trường bạn muốn tính điểm
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SCHOOLS.map((school) => {
          const Icon = school.icon;
          const isUit = school.id === 'uit';
          const cardClass = "group relative flex min-h-[17rem] flex-col justify-between rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.28)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_70px_-32px_rgba(37,99,235,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className={`inline-flex rounded-[1.25rem] p-4 ${school.bg} ${school.color} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition group-hover:text-slate-700">
                  {isUit ? (
                    <ExternalLink className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-black text-slate-950 leading-tight">
                  {school.acronym}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {school.name}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${school.bg} ${school.color}`}>
                  {isUit ? 'Thông tin tuyển sinh' : 'Mở máy tính'}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  2026
                </span>
              </div>
            </>
          );

          if (isUit) {
            return (
              <a
                key={school.id}
                href="https://tuyensinh.uit.edu.vn/2026-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026"
                target="_blank"
                rel="noreferrer"
                className={cardClass}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={school.id}
              to={`/${school.slug}`}
              className={cardClass}
            >
              {content}
            </Link>
          );
        })}
        </div>
      </section>
    </div>
  );
};
