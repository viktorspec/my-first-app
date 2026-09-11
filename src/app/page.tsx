import Image from "next/image";

// Главная страница электрика с современным Hero-блоком, списком услуг и контактами
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-zinc-100 to-white dark:from-zinc-900 dark:via-black dark:to-zinc-800 font-sans px-4 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-2">
            <Image
              src="/electrician.svg"
              alt="Логотип электрика"
              width={52}
              height={52}
              className="h-13 w-13"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 dark:text-blue-200 text-center mb-2">
            Электрик в вашем городе
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 text-center max-w-md">
            Профессиональный электромонтаж, ремонт и обслуживание для квартиры, дома и офиса. Оперативно, качественно, с гарантией.
          </p>
        </div>

        <ul className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <li className="flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-800 dark:text-blue-200 font-medium shadow-sm">
            <span className="font-bold text-xl">⚡</span> Монтаж электрики
          </li>
          <li className="flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-800 dark:text-blue-200 font-medium shadow-sm">
            <span className="font-bold text-xl">🛠️</span> Ремонт проводки
          </li>
          <li className="flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-950 rounded-xl text-blue-800 dark:text-blue-200 font-medium shadow-sm">
            <span className="font-bold text-xl">🗄️</span> Установка щитков
          </li>
        </ul>

        <a
          href="tel:+71234567890"
          className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg text-lg font-semibold transition-colors"
        >
          <span>Вызвать мастера</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h12m-7-2h6a1 1 0 001-1V7a1 1 0 00-1-1h-9l-1.34-2.68A1 1 0 006 3H5a1 1 0 000 2h1zm7 7a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        </a>

        <div className="w-full border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Контакты</h2>
          <div className="flex flex-col sm:flex-row gap-2 items-center text-zinc-600 dark:text-zinc-300">
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2c-.9 1.1-1.9 2.1-2.8 2.9-2.6 2.7-4.1 4.1-8.5 8.7a2 2 0 01-2.6.2l-4.3-3.5A2 2 0 012.01 7.84l3.66-4.73A2 2 0 018.14 3.01l3.53 2.83c.7.55 1.7.47 2.28-.26 1.1-1.3 2.2-2.5 3.3-3.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:electro.pro@mail.ru" className="hover:underline">electro.pro@mail.ru</a>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 01-2.18 2A19.9 19.9 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13 1.05.35 2.08.63 3.06a2 2 0 01-.45 2l-1.27 1.27a16 16 0 006.88 6.88l1.27-1.27a2 2 0 012-.45c.98.28 2.01.5 3.06.63a2 2 0 011.73 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="tel:+71234567890" className="hover:underline">+7 123 456-78-90</a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
