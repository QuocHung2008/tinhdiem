import { Link } from 'react-router-dom';
import { MoonStar, SunMedium } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const Navbar = () => {
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`;
  const { theme, toggleTheme } = useTheme();

  const scrollHomeToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Dieu huong chinh"
      className="sticky top-0 z-50 border-b border-[color:var(--line-soft)] bg-[color:var(--nav-bg)] text-[color:var(--nav-foreground)] backdrop-blur-xl"
    >
      <div className="app-container">
        <div className="flex min-h-[5rem] items-center justify-between gap-4">
          <div className="flex min-w-0">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="group flex min-w-0 items-center gap-3 rounded-[1.35rem] px-2 py-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-[#f7b500] to-[#ffd666] shadow-sm shadow-slate-950/20">
                <img src={faviconUrl} alt="Web Tính Điểm ĐHQG-HCM" className="h-6 w-6 rounded-md" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/90">
                  Smart Admission Hub
                </div>
                <div className="truncate text-base font-black text-white sm:text-lg">
                  Web Tính Điểm ĐHQG-HCM
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 lg:block">
              Dark mode + giao diện mới 2026
            </div>
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Trang chủ
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              title={theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              className="inline-flex items-center gap-2 rounded-[1.1rem] border border-amber-300/40 bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#0d3b66] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
