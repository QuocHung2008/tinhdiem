const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M12 .5C5.7.5.6 5.6.6 11.9c0 5 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.7 2.7 1.4 3.1 1.1.8 2.3.6 2.9.4.1-.8.4-1.4.8-1.7-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.8C23.4 5.6 18.3.5 12 .5Z" />
  </svg>
);

const ThreadsIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M17.6 11.2c-.3-.1-.6-.2-.9-.3-.1-1.5-.6-2.7-1.5-3.5-.8-.8-1.9-1.2-3.3-1.2-2.3 0-4 1.3-4.5 3.5l1.8.5c.4-1.5 1.3-2.2 2.7-2.2 1.7 0 2.7 1 2.9 2.7-.8-.1-1.7-.1-2.6 0-2.5.2-4 1.4-4 3.2 0 1 .5 1.9 1.4 2.5.8.6 1.9.8 3.1.7 1.6-.1 2.9-.8 3.5-2 .4-.7.6-1.5.6-2.5.1 0 .2.1.3.1 1.3.6 2 1.6 1.9 3-.1 1.5-.9 2.8-2.3 3.7-1.2.8-2.8 1.2-4.6 1.2-2.1 0-3.9-.7-5.2-2-1.3-1.4-2-3.3-2-5.6s.7-4.2 2-5.6c1.3-1.3 3.1-2 5.2-2s3.9.7 5.2 2c.6.6 1.1 1.4 1.4 2.3l1.8-.5c-.4-1.2-1-2.2-1.9-3.1C16.9 4.5 14.7 3.7 12 3.7s-4.9.8-6.5 2.5C3.9 7.9 3.1 10.2 3.1 13s.8 5.1 2.4 6.8c1.6 1.7 3.8 2.5 6.5 2.5 2.2 0 4.1-.5 5.6-1.5 1.9-1.3 3-3.1 3.1-5.1.1-2.1-1-3.7-3.1-4.5Zm-3.1 3.1c-.3.6-.9.9-1.9 1-1.4.1-2.3-.5-2.4-1.4 0-.7.8-1.2 2.1-1.3.3 0 .7-.1 1-.1.5 0 1 0 1.4.1 0 .7-.1 1.3-.2 1.7Z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[color:var(--line-soft)] bg-[color:var(--footer-bg)] text-white">
      <div className="app-container py-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,var(--panel-strong),var(--panel-strong-2))] px-6 py-6 shadow-[0_24px_80px_-36px_rgba(2,12,27,0.8)] sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                VNUHCM Calculator
              </p>
              <p className="mt-2 text-lg font-black text-white">
                Giao diện mới gọn hơn, hỗ trợ dark mode và truy cập nhanh tới từng trường
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                Công cụ tham khảo giúp so sánh nhanh nhiều phương thức tuyển sinh.
                Kết quả không thay thế thông báo chính thức từ các trường thành viên.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a
                href="https://github.com/trhming/vnuhcm-calculator"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/15 hover:text-amber-200"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.threads.com/@trhming_"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/15 hover:text-amber-200"
              >
                <ThreadsIcon className="h-4 w-4" />
                Threads
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
