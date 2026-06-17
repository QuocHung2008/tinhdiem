import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      title="Lên đầu trang"
      aria-label="Lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] text-[color:var(--text-body)] shadow-[0_20px_40px_-24px_rgba(15,23,42,0.7)] backdrop-blur transition-colors hover:bg-[color:var(--panel-muted)] hover:text-[color:var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-blue-500 lg:bottom-8 lg:right-8"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
