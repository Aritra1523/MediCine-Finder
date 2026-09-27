import { useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "⌕",
    title: "Search medicines",
    text: "Find medicines by name and discover pharmacies that list them.",
  },
  {
    icon: "₹",
    title: "Compare prices",
    text: "See listed prices and units before you contact a pharmacy.",
  },
  {
    icon: "✓",
    title: "Check stock",
    text: "Know whether a medicine is in stock or running low.",
  },
  {
    icon: "↗",
    title: "Contact directly",
    text: "Call or message the pharmacy through the available contact options.",
  },
];

const steps = [
  {
    number: "01",
    title: "Search",
    text: "Enter the medicine you need.",
  },
  {
    number: "02",
    title: "Compare",
    text: "Review pharmacies, price, unit and stock.",
  },
  {
    number: "03",
    title: "Connect",
    text: "Call or WhatsApp the pharmacy.",
  },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const userPath = token && role === "user" ? "/user" : "/login";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7faff] text-slate-900">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0b63f6] text-lg font-black text-white shadow-lg shadow-blue-200">
              M
            </span>

            <span className="text-xl font-extrabold tracking-tight">
              Medi<span className="text-[#0b63f6]">Finder</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0b63f6]"
            >
              How it works
            </a>

            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0b63f6]"
            >
              Features
            </a>

            <a
              href="#pharmacists"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0b63f6]"
            >
              For pharmacists
            </a>

            <Link
              to="/login"
              className="text-sm font-bold text-slate-700 hover:text-[#0b63f6]"
            >
              Log in
            </Link>

            <Link
              to={userPath}
              className="rounded-xl bg-[#0b63f6] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-slate-200 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                onClick={() => setMenuOpen(false)}
                href="#how-it-works"
                className="font-semibold"
              >
                How it works
              </a>

              <a
                onClick={() => setMenuOpen(false)}
                href="#features"
                className="font-semibold"
              >
                Features
              </a>

              <a
                onClick={() => setMenuOpen(false)}
                href="#pharmacists"
                className="font-semibold"
              >
                For pharmacists
              </a>

              <Link to="/login" className="font-semibold">
                Log in
              </Link>

              <Link
                to={userPath}
                className="rounded-xl bg-[#0b63f6] px-5 py-3 text-center font-bold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#071b3a]">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-28">
            {/* Hero Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Find medicines with less searching
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
                Find the medicine you need,
                <span className="text-blue-400">
                  {" "}
                  without the pharmacy hunt.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100/80">
                Search medicines, check listed prices and stock, then connect
                with a pharmacy directly.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={userPath}
                  className="rounded-2xl bg-white px-6 py-3.5 text-center font-extrabold text-[#0759db] shadow-xl transition hover:-translate-y-1"
                >
                  Find a medicine →
                </Link>

                <Link
                  to="/register"
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-center font-extrabold text-white transition hover:bg-white/15"
                >
                  I'm a pharmacist
                </Link>
              </div>

              {/* Highlights */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100/70">
                <span>✓ Search by medicine name</span>

                <span>✓ Price & stock visibility</span>

                <span>✓ Call / WhatsApp</span>
              </div>
            </div>

            {/* Product Preview */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-blue-400/10 blur-2xl" />

              <div className="relative rounded-[2rem] border border-white/15 bg-white p-4 shadow-2xl shadow-black/30 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      MediFinder
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold">
                      Find your medicine
                    </h3>
                  </div>

                  <span className="rounded-xl bg-blue-50 px-3 py-2 text-xl">
                    ⌕
                  </span>
                </div>

                {/* Search */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-slate-400">⌕</span>

                  <span className="text-sm text-slate-500">
                    Search medicine name...
                  </span>
                </div>

                {/* Medicine Card */}
                <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold">Paracetamol 500mg</p>

                      <p className="mt-1 text-xs text-slate-500">
                        ABC Pharmacy
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      In Stock
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-black text-[#0b63f6]">₹25</p>

                      <p className="text-xs text-slate-400">per strip</p>
                    </div>

                    <div className="flex gap-2">
                      <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                        Call
                      </span>

                      <span className="rounded-xl bg-emerald-500 px-3 py-2 text-xs font-bold text-white">
                        WhatsApp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Second Medicine */}
                <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Amoxicillin 500mg</span>

                    <span className="text-xs font-bold text-amber-600">
                      Low Stock
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    City Care Pharmacy · ₹80 / strip
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUE STRIP ================= */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 py-7 md:grid-cols-4 lg:px-8">
            {[
              "Search medicines",
              "Check prices",
              "Check stock",
              "Contact pharmacy",
            ].map((item) => (
              <div
                key={item}
                className="px-4 text-center text-sm font-extrabold text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
        >
          <div className="max-w-2xl">
            <p className="font-bold text-[#0b63f6]">HOW IT WORKS</p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              From medicine name to pharmacy in three steps.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              A simple flow designed to help you spend less time searching and
              more time getting what you need.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-sm font-black text-[#0b63f6]">
                  {step.number}
                </span>

                <h3 className="mt-8 text-2xl font-black">{step.title}</h3>

                <p className="mt-3 leading-7 text-slate-500">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <p className="font-bold text-[#0b63f6]">FOR MEDICINE SEARCHERS</p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Everything you need before you make the call.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
                Useful information is brought together in one clean search
                experience.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-[#f8fbff] p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-xl font-black text-[#0b63f6]">
                    {feature.icon}
                  </span>

                  <h3 className="mt-6 text-xl font-black">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-slate-500">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PHARMACIST ================= */}
        <section
          id="pharmacists"
          className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
        >
          <div className="overflow-hidden rounded-[2rem] bg-[#0b63f6]">
            <div className="grid lg:grid-cols-2">
              {/* Text */}
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="font-bold text-blue-100">FOR PHARMACISTS</p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Keep your medicine inventory easy to manage.
                </h2>

                <p className="mt-5 text-lg leading-8 text-blue-100">
                  Register your pharmacy, add medicines, update stock and keep
                  your listings ready for customers to discover.
                </p>

                <Link
                  to="/register"
                  className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3.5 font-extrabold text-[#0759db]"
                >
                  Create pharmacist account →
                </Link>
              </div>

              {/* Dashboard Preview */}
              <div className="bg-[#0759db] p-8 sm:p-12">
                <div className="rounded-3xl bg-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Dashboard
                      </p>

                      <h3 className="mt-1 text-xl font-black">
                        Inventory overview
                      </h3>
                    </div>

                    <span className="rounded-xl bg-blue-50 px-3 py-2 text-xl">
                      ▦
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      ["24", "Medicines"],
                      ["20", "In stock"],
                      ["4", "Low stock"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-2xl font-black text-[#0b63f6]">
                          {value}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Medicine List */}
                  <div className="mt-5 space-y-3">
                    {[
                      "Paracetamol 500mg",
                      "Azithromycin 250mg",
                      "Cetirizine 10mg",
                    ].map((name, index) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                      >
                        <span className="text-sm font-bold">{name}</span>

                        <span
                          className={
                            index === 2
                              ? "text-xs font-bold text-amber-600"
                              : "text-xs font-bold text-emerald-600"
                          }
                        >
                          {index === 2 ? "Low stock" : "In stock"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 px-6 py-14 text-center sm:px-12">
            <p className="font-bold text-[#0b63f6]">READY TO SEARCH?</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Less searching. More certainty.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
              Search for your medicine and explore the available pharmacy
              information in one place.
            </p>

            <Link
              to={userPath}
              className="mt-8 inline-flex rounded-2xl bg-[#0b63f6] px-7 py-4 font-extrabold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1"
            >
              Find a medicine →
            </Link>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-[#06162f] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0b63f6] text-lg font-black text-white shadow-lg shadow-blue-900/30">
                  M
                </span>

                <span className="text-2xl font-black tracking-tight">
                  Medi<span className="text-blue-400">Finder</span>
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                Find medicines faster, check listed prices and stock, and
                connect with pharmacies directly.
              </p>

              <Link
                to={userPath}
                className="mt-6 inline-flex items-center rounded-xl bg-[#0b63f6] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Find a medicine
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Product
              </h3>

              <div className="mt-5 flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  How it works
                </a>

                <a
                  href="#pharmacists"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  For pharmacists
                </a>

                <Link
                  to={userPath}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Search medicines
                </Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Account
              </h3>

              <div className="mt-5 flex flex-col gap-4">
                <Link
                  to="/login"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Create account
                </Link>

                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Pharmacist registration
                </Link>
              </div>
            </div>

            {/* Contact / Trust */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                MediFinder
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                A simple platform for discovering listed medicine information
                from participating pharmacies.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-bold text-white">
                      Search with confidence
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Check information before contacting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-500">
                © {new Date().getFullYear()} MediFinder. All rights reserved.
              </p>

              <div className="flex flex-wrap gap-5">
                <span className="text-slate-500">
                  Built for simpler medicine discovery
                </span>

                <span className="hidden text-slate-700 sm:inline">•</span>

                <span className="text-slate-500">India</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
