"use client";

import Image from "next/image";
import { useState, useRef } from "react";

// Стоимости услуг для калькулятора (в гривнах)
const SERVICES = [
  { key: "wire_replacement", label: "Замена проводки", price: 1600 },
  { key: "panel_installation", label: "Установка щитка", price: 1000 },
  { key: "socket_installation", label: "Монтаж розеток", price: 600 },
  { key: "diagnostics", label: "Диагностика", price: 400 },
];

// Toast-компонент для уведомлений
function Toast({
  message,
  open,
  onClose,
}: {
  message: string;
  open: boolean;
  onClose: () => void;
}) {
  const hasShown = useRef(false);

  if (open && !hasShown.current) {
    hasShown.current = true;
    setTimeout(() => {
      hasShown.current = false;
      onClose();
    }, 2500);
  }

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 transform -translate-x-1/2 transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 bg-blue-700 text-white dark:bg-blue-950 dark:text-blue-100 px-5 py-3 rounded-2xl shadow-lg text-base font-semibold">
        <svg className="w-5 h-5 text-lime-300 dark:text-lime-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}

// Калькулятор стоимости услуг
function Calculator() {
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const total = SERVICES.reduce(
    (sum, s) => (selected[s.key] ? sum + s.price : sum),
    0
  );
  return (
    <section className="w-full bg-blue-50 dark:bg-blue-950 rounded-2xl p-6 flex flex-col items-center gap-5 shadow-md">
      <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Калькулятор стоимости</h2>
      <form className="w-full flex flex-col gap-3">
        {SERVICES.map((s) => (
          <label
            className="flex items-center gap-3 cursor-pointer text-lg text-blue-900 dark:text-blue-100"
            key={s.key}
          >
            <input
              type="checkbox"
              className="accent-blue-700 w-5 h-5 rounded transition"
              checked={!!selected[s.key]}
              onChange={() =>
                setSelected((prev) => ({
                  ...prev,
                  [s.key]: !prev[s.key],
                }))
              }
            />
            <span className="flex-1">{s.label}</span>
            <span className="text-blue-700 dark:text-blue-400 font-semibold">{s.price.toLocaleString()} ₴</span>
          </label>
        ))}
      </form>
      <div className="w-full text-right mt-2">
        <span className="text-xl font-bold text-blue-900 dark:text-lime-300">
          Итог: {total.toLocaleString()} ₴
        </span>
      </div>
    </section>
  );
}

// Форма обратной связи
function ContactForm() {
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setFields({ name: "", phone: "", message: "" });
    setToastOpen(true);
  };

  return (
    <>
      <section className="w-full rounded-2xl bg-blue-50 dark:bg-blue-950 px-6 py-6 flex flex-col items-center gap-3 shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-1">Обратная связь</h2>
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit} autoComplete="off">
          <input
            required
            name="name"
            placeholder="Ваше имя"
            className="px-4 py-2 rounded-lg bg-white dark:bg-black/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            minLength={2}
            value={fields.name}
            onChange={handleChange}
          />
          <input
            required
            name="phone"
            type="tel"
            placeholder="Телефон (+380...)"
            className="px-4 py-2 rounded-lg bg-white dark:bg-black/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
            pattern="^[\d\s\+\-\(\)]{9,}$"
            value={fields.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Ваш вопрос или пожелание (необязательно)"
            className="px-4 py-2 min-h-[80px] rounded-lg bg-white dark:bg-black/30 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-300 outline-none transition resize-none"
            value={fields.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg text-lg font-semibold transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M5 5v14"/>
              </svg>
            )}
            <span>Отправить</span>
          </button>
        </form>
      </section>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Спасибо! Ваше сообщение отправлено."
      />
    </>
  );
}

// Главная страница электрика
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-zinc-100 to-white dark:from-zinc-900 dark:via-black dark:to-zinc-800 font-sans px-4 py-12">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col items-center gap-10">
        
        {/* Логотип + Заголовок */}
        <div className="flex flex-col items-center gap-2">
          {/* Иконка логотипа (Щит и Молот/Молния) */}
          <div className="flex flex-col items-center justify-center mb-1">
            <div className="w-16 h-16 bg-gradient-to-b from-blue-600 to-blue-900 rounded-b-2xl rounded-t-lg flex items-center justify-center shadow-lg relative border-2 border-amber-400">
              <span className="text-3xl select-none">⚡</span>
            </div>
            <span className="text-sm font-extrabold tracking-widest text-blue-900 dark:text-blue-300 uppercase mt-2">
              Електро Сервіс
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 dark:text-blue-200 text-center mb-1">
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

        {/* Калькулятор стоимости */}
        <Calculator />

        {/* Форма обратной связи */}
        <ContactForm />

        <a
          href="tel:+380991234567"
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
              <a href="mailto:electro.pro@gmail.com" className="hover:underline">electro.pro@gmail.com</a>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 01-2.18 2A19.9 19.9 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13 1.05.35 2.08.63 3.06a2 2 0 01-.45 2l-1.27 1.27a16 16 0 006.88 6.88l1.27-1.27a2 2 0 012-.45c.98.28 2.01.5 3.06.63a2 2 0 011.73 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="tel:+380991234567" className="hover:underline">+380 99 123-45-67</a>
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}