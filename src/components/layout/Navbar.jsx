import { Link } from 'react-router-dom';

export const Navbar = () => {
  const faviconUrl = `${import.meta.env.BASE_URL}favicon.svg`;

  const scrollHomeToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Dieu huong chinh"
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="flex flex-shrink-0 items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <img src={faviconUrl} alt="Web Tính Điểm ĐHQG-HCM" className="h-8 w-8 rounded-lg" />
              <span className="hidden text-xl font-bold text-slate-900 sm:block">
                Web Tính Điểm ĐHQG-HCM 2026
              </span>
              <span className="text-sm font-bold text-slate-900 sm:hidden">
                VNUHCM 2026
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              onClick={scrollHomeToTop}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
