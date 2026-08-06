import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Tv, Download, Wifi, MonitorPlay, Smartphone } from "lucide-react";
import qrCode from "@/assets/qrcode-qgtv.png";

const STEPS = [
  {
    icon: Download,
    title: "1. Instale o app Downloader",
    text: "Na Google TV, abra a Play Store e instale o app 'Downloader by AFTVnews' (gratuito).",
  },
  {
    icon: Wifi,
    title: "2. Digite o endereço",
    text: "Abra o Downloader e digite: qgtv.lovable.app — o navegador interno abre a apresentação em tela cheia.",
  },
  {
    icon: MonitorPlay,
    title: "3. Deixe rodando 24/7",
    text: "A apresentação entra em loop automático. Use as setas do controle para avançar ou voltar slides.",
  },
  {
    icon: Smartphone,
    title: "4. Atalho na tela inicial",
    text: "No navegador da TV, use 'Adicionar à tela inicial' para abrir o QG TV como um app com ícone próprio.",
  },
];

const TVInstall = () => {
  useEffect(() => {
    document.title = "Instalar QG TV na Google TV | QG do Rolê";
  }, []);

  return (
    <main className="min-h-screen bg-dark-gradient text-brand-cream">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="text-center mb-14">
          <p className="font-display tracking-[0.4em] uppercase text-brand-sky/70 text-sm mb-3">
            QG do Rolê
          </p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-brand-orange">
            Instalar na Google TV
          </h1>
          <p className="mt-4 text-lg md:text-xl text-brand-cream/80 max-w-2xl mx-auto">
            Abra a apresentação direto na TV, sem computador e sem pen drive.
          </p>
        </header>

        <section className="grid md:grid-cols-[1fr_320px] gap-10 items-center mb-14">
          <div className="rounded-3xl border border-brand-orange/30 bg-white/[0.04] p-8">
            <div className="flex items-center gap-4 mb-4">
              <Tv className="h-10 w-10 text-brand-orange" />
              <h2 className="font-display font-bold text-2xl md:text-3xl">Endereço direto</h2>
            </div>
            <p className="text-brand-cream/80 mb-5">
              Digite este endereço no navegador da TV (ou no app Downloader):
            </p>
            <p className="font-display text-3xl md:text-4xl font-black text-brand-sky break-all">
              qgtv.lovable.app
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-brand-orange px-7 py-4 font-display font-bold text-lg text-brand-cream hover:opacity-90 transition"
            >
              <MonitorPlay className="h-5 w-5" />
              Abrir apresentação agora
            </Link>
          </div>

          <figure className="rounded-3xl border border-brand-sky/30 bg-white/[0.04] p-6 text-center">
            <img
              src={qrCode}
              alt="QR Code para abrir a apresentação do QG do Rolê na TV"
              width={600}
              height={600}
              loading="lazy"
              className="w-full rounded-2xl bg-white p-3"
            />
            <figcaption className="mt-4 text-sm text-brand-cream/70">
              Aponte a câmera do celular e envie o link para a TV
            </figcaption>
          </figure>
        </section>

        <section>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6 text-brand-orange">
            Passo a passo
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-brand-cream/10 bg-white/[0.03] p-6"
              >
                <s.icon className="h-8 w-8 text-brand-sky mb-3" />
                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-brand-cream/75 leading-relaxed">{s.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TVInstall;
