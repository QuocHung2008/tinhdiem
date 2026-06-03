import { Link } from 'react-router-dom';
import { SCHOOLS } from '../constants/common';
import { ChevronRight, ExternalLink } from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 px-6 py-12 text-center shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)] backdrop-blur sm:px-10">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-800">
          Công cụ tham khảo cho mùa tuyển sinh 2026
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          <span className="block">Tính điểm xét tuyển</span>
          <span className="block text-blue-700">ĐHQG-HCM 2026</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 sm:text-lg md:text-xl">
          Công cụ hỗ trợ tính toán điểm xét tuyển vào các trường thành viên của Đại học Quốc gia TP.HCM,
          tối ưu cho thao tác nhanh trên máy tính và điện thoại.
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Nhanh và rõ ràng</p>
            <p className="mt-1 text-sm text-slate-600">Nhập điểm theo từng môn hoặc tổng điểm tùy theo cách bạn đang có.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Tự động lưu dữ liệu</p>
            <p className="mt-1 text-sm text-slate-600">Dữ liệu được giữ lại trên trình duyệt để bạn không cần nhập lại.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Hoạt động trên mọi thiết bị</p>
            <p className="mt-1 text-sm text-slate-600">Bố cục responsive, dễ đọc và dễ thao tác bằng chuột, bàn phím hoặc cảm ứng.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SCHOOLS.map((school) => {
          const Icon = school.icon;
          const isUit = school.id === 'uit';
          const cardClass = "group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";
          const content = (
            <>
              <div className={`p-4 rounded-xl ${school.bg} ${school.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center leading-tight mb-1">
                {school.acronym}
              </h3>
              <p className="text-sm text-slate-500 text-center line-clamp-2">
                {school.name}
              </p>
              {isUit && (
                <span className="mt-3 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  Thông tin tuyển sinh
                </span>
              )}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {isUit ? (
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
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
    </div>
  );
};
