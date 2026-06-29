import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Search, Sparkles } from 'lucide-react';
import { SCHOOLS } from '../constants/common';

export const Home = () => {
  const [query, setQuery] = useState('');

  const filteredSchools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return SCHOOLS;
    }

    return SCHOOLS.filter((school) => `${school.acronym} ${school.name}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 sm:space-y-7">
      <section className="surface-card hcmut-grid overflow-hidden px-6 py-8 sm:px-8 sm:py-9 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.92fr)] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-soft)] bg-[color:var(--panel-muted)] px-4 py-2 text-sm font-semibold text-[color:var(--brand-700)]">
              <Sparkles className="h-4 w-4" />
              Giao diện mới tối ưu cho sinh viên
            </div>

            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-[color:var(--text-strong)] sm:text-5xl">
                Chọn trường, nhập điểm, xem kết quả nhanh hơn trong một giao diện mới.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
                Hero được rút gọn để đưa tính năng chính lên cao hơn, card trường đồng bộ hơn,
                và toàn bộ project đã sẵn sàng với chế độ sáng/tối cho những phiên nhập điểm ban đêm.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                  Tập trung tác vụ
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">
                  Tính điểm ngay từ vùng đầu trang
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                  Card đồng bộ
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">
                  Mô tả cân hàng, hover rõ, CTA dễ hiểu
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                  Dark mode
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--text-strong)]">
                  Chuyển sáng/tối ngay trên header
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/aspirations"
                className="inline-flex items-center gap-2 rounded-[1rem] bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(13,59,102,0.7)] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4 text-amber-200" />
                Phân tích nguyện vọng AI (Mới)
              </Link>
              <a
                href="#school-directory"
                className="inline-flex items-center gap-2 rounded-[1rem] bg-[color:var(--panel-elevated)] border border-[color:var(--line-soft)] px-5 py-3 text-sm font-semibold text-[color:var(--text-strong)] transition hover:-translate-y-0.5 hover:bg-[color:var(--panel-muted)]"
              >
                Chọn trường tự tính
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[color:var(--line-soft)] bg-[linear-gradient(180deg,var(--panel-strong),var(--panel-strong-2))] p-6 text-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.8)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                  Tính điểm nhanh
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Tìm trường và mở máy tính ngay
                </h2>
              </div>
              <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-100 sm:block">
                Không cần cuộn quá sâu
              </div>
            </div>

            <label
              htmlFor="home-school-search"
              className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3 focus-within:border-amber-300/70 focus-within:bg-white/15"
            >
              <Search className="h-4 w-4 text-amber-100" />
              <input
                id="home-school-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nhập tên trường của bạn..."
                className="w-full border-0 bg-transparent p-0 text-sm text-white placeholder:text-slate-300 focus:ring-0"
              />
            </label>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SCHOOLS.slice(0, 4).map((school) => (
                <Link
                  key={`quick-${school.id}`}
                  to={`/${school.slug}`}
                  className="group rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-black tracking-tight text-white">{school.acronym}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-300">{school.name}</div>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-100 transition group-hover:translate-x-0.5 group-hover:text-amber-200">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/10 p-4">
              <p className="text-sm font-semibold text-white">Tìm thấy {filteredSchools.length} trường phù hợp</p>
              <p className="mt-1 text-sm text-slate-300">
                Từ khóa hỗ trợ cả tên đầy đủ lẫn viết tắt như `HCMUS`, `UIT`, `Bách khoa`.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="school-directory">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-title">Danh sách công cụ</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[color:var(--text-strong)] sm:text-3xl">
              Chọn trường bạn muốn tính điểm
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)] sm:text-base">
              Danh sách được căn lại để các mô tả và nút bấm luôn thẳng hàng, giúp thao tác nhanh và dễ quét hơn.
            </p>
          </div>

          <label
            htmlFor="school-directory-filter"
            className="flex w-full items-center gap-3 rounded-[1.1rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] px-4 py-3 shadow-sm lg:max-w-sm"
          >
            <Search className="h-4 w-4 text-[color:var(--text-faint)]" />
            <input
              id="school-directory-filter"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên hoặc viết tắt..."
              className="w-full border-0 bg-transparent p-0 text-sm text-[color:var(--text-strong)] placeholder:text-[color:var(--text-faint)] focus:ring-0"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredSchools.map((school) => {
            const Icon = school.icon;
            const mark = school.acronym.slice(0, 2);

            return (
              <Link
                key={school.id}
                to={`/${school.slug}`}
                className="group relative flex min-h-[18.5rem] flex-col rounded-[1.75rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] p-6 shadow-[0_24px_60px_-36px_rgba(13,59,102,0.24)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-28px_rgba(13,59,102,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-[color:var(--brand-700)] to-[color:var(--brand-500)] text-base font-black tracking-[0.2em] text-white shadow-sm">
                      {mark}
                    </div>
                    <div className={`inline-flex rounded-[1rem] p-3 ${school.bg} ${school.color} transition-transform duration-200 group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="rounded-full border border-[color:var(--line-soft)] bg-[color:var(--panel-muted)] p-2 text-[color:var(--brand-700)] transition group-hover:bg-[color:var(--brand-700)] group-hover:text-white">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black leading-tight text-[color:var(--text-strong)]">
                      {school.acronym}
                    </h3>
                    <span className="rounded-full border border-[color:var(--line-soft)] bg-[color:var(--panel-muted)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-700)]">
                      2026
                    </span>
                  </div>
                  <p className="mt-3 min-h-[3.6rem] text-sm leading-7 text-[color:var(--text-muted)]">
                    {school.name}
                  </p>
                </div>

                <div className="mt-auto space-y-4 pt-6">
                  <div className="h-px w-full bg-[color:var(--line-soft)]" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-[0.95rem] bg-[color:var(--brand-700)] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[color:var(--brand-800)]">
                      Mở máy tính
                    </span>
                    <span className="rounded-full border border-[color:var(--line-soft)] bg-[color:var(--panel-muted)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-faint)]">
                      Dark mode ready
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredSchools.length === 0 && (
          <div className="surface-card mt-5 px-6 py-8 text-center">
            <p className="text-lg font-bold text-[color:var(--text-strong)]">Không tìm thấy trường phù hợp</p>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              Thử lại với từ khóa khác như `HCMUT`, `Khoa học Tự nhiên`, `Quốc tế`, `Kinh tế`.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
