import * as React from "react";
import { Tex } from "@/components/Tex";
import { ZoomImage } from "@/components/ZoomImage";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { Timeline } from "@/components/ui/timeline";
import { fmt, useApp, type Lang } from "@/lib/app";
import { ui } from "@/lib/strings";
import { CITATION, METHODS, TABLE1, TABLE2 } from "./blackbody-data";

const tex = String.raw;
const IMG = "images/blackbody/";

/* ---------- shared building blocks ---------- */

function Eq({ children }: { children: string }) {
  return <Tex display>{children}</Tex>;
}

function Fig({ src, children, small }: { src: string; children: React.ReactNode; small?: boolean }) {
  return (
    <figure className="my-8">
      <ZoomImage src={IMG + src} className={small ? "max-w-sm" : "w-full"} />
      <figcaption className="ui mt-3 text-center text-sm text-muted-foreground">{children}</figcaption>
    </figure>
  );
}

function TableWrap({ caption, children }: { caption: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="my-8">
      <div className="ui mb-2 text-sm text-muted-foreground">{caption}</div>
      <div className="ui overflow-x-auto rounded-lg border border-border" dir="ltr">
        <table className="w-full min-w-max text-center text-sm tabular-nums">{children}</table>
      </div>
    </div>
  );
}
const th = "border-b border-border bg-card px-4 py-2 font-semibold";
const td = "border-b border-border/60 px-4 py-1.5 last-of-type:border-b-0";

function Table1({ lang }: { lang: Lang }) {
  return (
    <TableWrap
      caption={
        lang === "fa" ? (
          <>جدول ۱: مقادیر <Tex>{"x_{\\eta s}"}</Tex>، <Tex>{"x_{\\eta l}"}</Tex>، <Tex>{"RW_{\\eta t}"}</Tex> و <Tex>{"RSF_{\\eta t}"}</Tex> برای مقادیر مختلف <Tex>{"\\eta"}</Tex>.</>
        ) : (
          <>Table 1: <Tex>{"x_{\\eta s}"}</Tex>, <Tex>{"x_{\\eta l}"}</Tex>, <Tex>{"RW_{\\eta t}"}</Tex> and <Tex>{"RSF_{\\eta t}"}</Tex> for different <Tex>{"\\eta"}</Tex>.</>
        )
      }
    >
      <thead>
        <tr>
          <th className={th}><Tex>{"\\eta"}</Tex></th>
          <th className={th}><Tex>{"x_{\\eta s}"}</Tex></th>
          <th className={th}><Tex>{"x_{\\eta l}"}</Tex></th>
          <th className={th}><Tex>{"RW_{\\eta t}"}</Tex></th>
          <th className={th}><Tex>{"RSF_{\\eta t}"}</Tex></th>
        </tr>
      </thead>
      <tbody>
        {TABLE1.map((r) => (
          <tr key={r.eta}>
            <td className={td}>{r.eta.toFixed(4)}</td>
            <td className={td}>{r.xs.toFixed(4)}</td>
            <td className={td}>{r.xl.toFixed(4)}</td>
            <td className={td}>{r.rw.toFixed(4)}</td>
            <td className={td}>{r.rsf.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

function Table2({ lang }: { lang: Lang }) {
  return (
    <>
      <TableWrap
        caption={
          lang === "fa" ? (
            <>جدول ۲: <Tex>{"\\lambda_{\\eta s}"}</Tex> و <Tex>{"\\lambda_{\\eta l}"}</Tex> (μm) بر حسب <Tex>{"\\eta"}</Tex> در دمای <Tex>{"T=1000\\,\\mathrm{K}"}</Tex>.</>
          ) : (
            <>Table 2: <Tex>{"\\lambda_{\\eta s}"}</Tex> and <Tex>{"\\lambda_{\\eta l}"}</Tex> (μm) for different <Tex>{"\\eta"}</Tex> at <Tex>{"T=1000\\,\\mathrm{K}"}</Tex>.</>
          )
        }
      >
        <thead>
          <tr>
            <th className={th}><Tex>{"\\eta"}</Tex></th>
            <th className={th}><Tex>{"\\lambda_{\\eta s}"}</Tex></th>
            <th className={th}><Tex>{"\\lambda_{\\eta l}"}</Tex></th>
          </tr>
        </thead>
        <tbody>
          {TABLE2.map((r) => (
            <tr key={r.eta}>
              <td className={td}>{r.eta.toFixed(4)}</td>
              <td className={td}>{r.ls.toFixed(4)}</td>
              <td className={td}>{r.ll.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
      <p className="ui -mt-4 mb-8 text-sm text-muted-foreground">
        {lang === "fa"
          ? "یادداشت: مقادیر این جدول از جدول ۱ با λ = C₂/(xT) محاسبه شده‌اند. دو مقدار چاپ‌شده در مقاله با این محاسبه نمی‌خواند (η=۰٫۴ ← ۶٫۸۲۹۴ و η=۰٫۵ ← ۲٫۷۳۲۵) و احتمالاً غلط تایپی است؛ مقادیر محاسبه‌شده اینجا آمده‌اند."
          : "Note: this table is computed from Table 1 with λ = C₂/(xT). Two printed values disagree with that (η = 0.4: 6.8294, η = 0.5: 2.7325) and look like typos; the computed values are shown."}
      </p>
    </>
  );
}

function Cite() {
  const { lang } = useApp();
  const s = ui[lang];
  return (
    <div className="my-10 rounded-xl border border-border bg-card p-5">
      <div className="ui mb-2 text-sm font-semibold">{s.cite}</div>
      <p dir="ltr" className="ui text-left text-sm text-muted-foreground">
        {CITATION}
      </p>
      <div className="mt-4">
        <CopyButton size="sm" value={CITATION} label={s.copy} copiedLabel={s.copied} />
      </div>
    </div>
  );
}

/** Timeline's rail is drawn left-to-right, so it is used for English; Persian
 *  gets a plain numbered list that follows the text direction. */
function Steps({ lang, steps }: { lang: Lang; steps: { title: string; description: React.ReactNode }[] }) {
  if (lang === "en")
    return (
      <div className="ui my-8">
        <Timeline steps={steps.map((st) => ({ title: st.title, description: String(st.description) }))} />
      </div>
    );
  return (
    <ol className="ui my-8 space-y-5">
      {steps.map((st, i) => (
        <li key={i} className="flex gap-4">
          <Badge size="sm">{`گام ${fmt(i + 1, "fa")}`}</Badge>
          <div>
            <div className="font-semibold">{st.title}</div>
            <div className="text-sm text-muted-foreground">{st.description}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

const METHOD_NAME: Record<Lang, Record<string, string>> = {
  fa: { bisection: "Bisection (نصف‌کردن)", newton: "Newton–Raphson", fixed: "Fixed-point", graphical: "Graphical (ترسیمی)" },
  en: { bisection: "Bisection", newton: "Newton–Raphson", fixed: "Fixed-point iteration", graphical: "Graphical" },
};

function MethodsTable({ lang }: { lang: Lang }) {
  return (
    <TableWrap
      caption={
        lang === "fa"
          ? "جدول — حل عددی معادله‌ی وین (نوت‌بوک پایتون)"
          : "Table — numerical solutions of Wien's equation (Python notebook)"
      }
    >
      <thead>
        <tr>
          <th className={th}>{lang === "fa" ? "روش" : "Method"}</th>
          <th className={th}><Tex>x</Tex></th>
          <th className={th}><Tex>{"\\lambda_m T\\ (\\mu\\mathrm{m\\cdot K})"}</Tex></th>
        </tr>
      </thead>
      <tbody>
        {METHODS.map((m) => (
          <tr key={m.id}>
            <td className={`${td} text-start`}>{METHOD_NAME[lang][m.id]}</td>
            <td className={td}>{m.x}</td>
            <td className={td}>{m.wT}</td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 mb-3 text-2xl font-bold tracking-tight">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => <p className="my-4">{children}</p>;

/* ---------- Persian: paper rewrite + numerical verification ---------- */

export function BlackbodyFa() {
  const lang: Lang = "fa";
  return (
    <>
      <p className="ui text-sm text-muted-foreground">
        Xin Yang، Bing Wei — Xidian University · بازنویسی و تأیید محاسباتی: مصطفی
      </p>
      <div className="my-6 rounded-xl border border-border bg-card p-5">
        پس از مطالعه‌ی عمیق معادله‌ی نرمالایزشده‌ی پلانک، نوع تازه‌ای از منحنی‌های طیف تابش جسم سیاه ارائه
        می‌شود و دو پارامتر «عرض نسبی» (RW) و «فاکتور تقارن» (RSF) تعریف می‌شوند. تأیید تجربی این پارامترها
        سه کاربرد دارد: (۱) اندازه‌گیری دما از روی طول موج تابش، (۲) تعیین کیفیت جسم سیاه، و (۳) استفاده از
        دمای حاصل به‌عنوان یک معیار.
      </div>

      <H2>۱) مقدمه</H2>
      <P>در صد سال گذشته، اساس نظری تابش حرارتی جسم سیاه در قالب قانون پلانک بیان شده است:</P>
      <Eq>{tex`e_b(\lambda, T) = C_1\,\lambda^{-5}\left(e^{\,C_2/\lambda T} - 1\right)^{-1} \tag{1}`}</Eq>
      <P>
        که در آن <Tex>{tex`C_1 = 3.7415\times10^{-4}\ \mathrm{W\cdot\mu m^{4}\cdot m^{-2}}`}</Tex> و{" "}
        <Tex>{tex`C_2 = 1.4388\times10^{4}\ \mathrm{\mu m\cdot K}`}</Tex>. در اینجا{" "}
        <Tex>{tex`e_b(\lambda,T)`}</Tex> گسیلندگی تابشی تک‌فام جسم سیاه در دمای <Tex>T</Tex> (کلوین) و طول موج{" "}
        <Tex>{tex`\lambda`}</Tex> (میکرومتر) است.
      </P>
      <Fig src="1.png" small>شکل ۱: منحنی طیف سنتی تابش جسم سیاه.</Fig>
      <P>
        با صفر قراردادن مشتق اول <Tex>{tex`e_b`}</Tex> نسبت به <Tex>{tex`\lambda`}</Tex>، رابطه‌ی بین دما و طول
        موج قله <Tex>{tex`\lambda_m`}</Tex> به دست می‌آید؛ همان قانون جابجایی وین:
      </P>
      <Eq>{tex`\lambda_m\, T = 2897.8268\ \mathrm{\mu m\cdot K} \tag{2}`}</Eq>
      <P>با مطالعه‌ی نقاط عطف در دو طرف منحنی، معادله‌ی زیر برای این نقاط حاصل می‌شود:</P>
      <Eq>{tex`(x^2 - 12x + 30)\,e^{2x} + (x^2 + 12x - 60)\,e^{x} + 30 = 0 \tag{3}`}</Eq>
      <P>و از آن، رابطه‌ی نقطه‌ی عطف چپ <Tex>{tex`\lambda_{il}`}</Tex> و راست <Tex>{tex`\lambda_{ir}`}</Tex> با دما:</P>
      <Eq>{tex`\lambda_{il}\,T = 4082.6612\ \mathrm{\mu m\cdot K} \qquad \lambda_{ir}\,T = 1703.8230\ \mathrm{\mu m\cdot K} \tag{4, 5}`}</Eq>
      <P>برای یافتن دامنه‌ی طول موج معادله‌ی (۱)، یک معادله‌ی نرمالایزشده‌ی پلانک پیشنهاد شده است:</P>
      <Eq>{tex`x^5 - 21.2014\,\eta\, e^{x} + 21.2014\,\eta = 0 \tag{6}`}</Eq>
      <Fig src="2.png" small>
        شکل ۲: منحنی سمت چپ معادله‌ی (۶) وقتی <Tex>{tex`\eta = 0.8,\ 0.85,\ 0.9`}</Tex> است.
      </Fig>
      <P>
        که ضریب نرمال‌سازی <Tex>{tex`\eta`}</Tex> چنین تعریف می‌شود و <Tex>{tex`x = C_2/\lambda T`}</Tex>:
      </P>
      <Eq>{tex`\lambda^{-5}\left(e^{\,C_2/\lambda T}-1\right)^{-1} = \eta\,\lambda_m^{-5}\left(e^{\,C_2/\lambda_m T}-1\right)^{-1} \tag{7}`}</Eq>
      <P>
        بدیهی است <Tex>{tex`\eta\in(0,1)`}</Tex>. برای <Tex>{tex`\eta = 10^{-6}`}</Tex>، دامنه‌ی طول موج{" "}
        <Tex>{tex`\lambda`}</Tex> بین ۸۸ تا ۱۰۵۱ میکرومتر است، وقتی دما بین ۲۰۰ تا ۶۰۰۰ کلوین باشد.
      </P>

      <H2>۲) تأیید محاسباتی</H2>
      <P>
        از صفر‌کردن مشتق پلانک و جایگذاری <Tex>{tex`x = C_2/\lambda T`}</Tex>، شکل ساده‌شده‌ی معادله‌ی وین چنین
        می‌شود:
      </P>
      <Eq>{tex`x\,e^{x} - 5\left(e^{x}-1\right) = 0 \iff 5\left(e^{x}-1\right) = x\,e^{x}`}</Eq>
      <P>این معادله‌ی متعالی با چند روش حل شد و همگی به یک ریشه همگرا شدند:</P>
      <Steps
        lang={lang}
        steps={[
          { title: "مشتق پلانک", description: <>با Sympy مشتق پلانک نسبت به <Tex>{tex`\lambda`}</Tex> ساده شد و به معادله‌ی وین رسید.</> },
          { title: "Newton–Raphson", description: <><Tex>{tex`f(x)=5(e^x-1)-xe^x`}</Tex> و <Tex>{tex`f'(x)=(4-x)e^x`}</Tex>؛ ریشه <Tex>{tex`x\approx 4.965114`}</Tex>.</> },
          { title: "Fixed-point", description: <><Tex>{tex`x=5(1-e^{-x})`}</Tex> با <Tex>{tex`x_0=6`}</Tex>؛ همگرا به <Tex>4.9651142</Tex>.</> },
          { title: "ترسیمی و نصف‌کردن", description: "تقاطع دو منحنی و جست‌وجوی دودویی؛ همان ریشه (روش ترسیمی دقت کمتری دارد)." },
        ]}
      />
      <MethodsTable lang={lang} />
      <Fig src="1_py.png" small>
        دو طرف معادله‌ی متعالی <Tex>{tex`5(e^x-1)`}</Tex> و <Tex>{tex`xe^x`}</Tex>؛ تقاطع نزدیک <Tex>x=5</Tex> است.
      </Fig>
      <P>
        مقدار دقیق: <Tex>{tex`x \approx 4.9651`}</Tex> و{" "}
        <Tex>{tex`\lambda_m T \approx 2897.82\ \mathrm{\mu m\cdot K}`}</Tex>، هم‌خوان با مرجع. نقاط عطف نیز
        به‌صورت عددی با <code dir="ltr">nsolve</code> بازتولید شدند: راست <Tex>1703.8229</Tex> و چپ{" "}
        <Tex>4082.6999</Tex> (μm·K). مقدار چاپ‌شده‌ی مقاله برای نقطه‌ی عطف چپ <Tex>4082.6612</Tex> است.
      </P>
      <Fig src="ref1.png">نقاط عطف منحنی <Tex>{tex`e_b(\lambda,T)`}</Tex> در دماهای ۳۵۰۰ تا ۵۵۰۰ کلوین.</Fig>

      <H2>۳) نتایج: منحنی طیف نرمالایزشده</H2>
      <P>
        برای هر <Tex>{tex`\eta`}</Tex> مشخص، معادله‌ی (۶) دو ریشه‌ی حقیقی{" "}
        <Tex>{tex`x_{\eta l}<x_{\eta s}`}</Tex> دارد که به طول موج‌های <Tex>{tex`\lambda_{\eta l}`}</Tex> و{" "}
        <Tex>{tex`\lambda_{\eta s}`}</Tex> در دو طرف منحنی منجر می‌شوند. برای <Tex>{tex`\eta=1`}</Tex> داریم{" "}
        <Tex>{tex`x_{\eta l}=x_{\eta s}=x_m`}</Tex>. با <Tex>{tex`x=C_2/\lambda T`}</Tex>:
      </P>
      <Eq>{tex`\lambda_{\eta l}=\frac{C_2}{x_{\eta l}\,T}, \qquad \lambda_{\eta s}=\frac{C_2}{x_{\eta s}\,T}, \qquad \lambda_m=\frac{C_2}{x_m\,T} \tag{9, 10, 11}`}</Eq>
      <Table1 lang={lang} />
      <Fig src="3.png">
        شکل ۳: نوع جدید منحنی طیف نرمالایزشده‌ی تابش حرارتی جسم سیاه؛ <Tex>{tex`\eta`}</Tex> بر حسب{" "}
        <Tex>{tex`\lambda`}</Tex> در دماهای ۶۰۰۰، ۳۰۰۰، ۲۰۰۰ و ۱۰۰۰ کلوین (و ۹۰۰ تا ۲۰۰ کلوین).
      </Fig>
      <Table2 lang={lang} />

      <H2>۴) ویژگی‌ها و تحلیل کاربرد</H2>
      <P>«عرض نسبی» و «فاکتور تقارن» به‌صورت تجربی (از طول موج‌های اندازه‌گیری‌شده):</P>
      <Eq>{tex`RW_{\eta e} = \frac{\lambda_m - \lambda_{\eta s}}{\lambda_m}, \qquad RSF_{\eta e} = \frac{\lambda_m - \lambda_{\eta s}}{\lambda_{\eta l} - \lambda_m} \tag{12, 13}`}</Eq>
      <P>و به‌صورت نظری (بر حسب ریشه‌های <Tex>x</Tex>):</P>
      <Eq>{tex`RW_{\eta t} = \frac{x_m\,(x_{\eta s} - x_{\eta l})}{x_{\eta s}\,x_{\eta l}}, \qquad RSF_{\eta t} = \frac{x_{\eta l}\,(x_{\eta s} - x_m)}{x_{\eta s}\,(x_m - x_{\eta l})} \tag{14, 15}`}</Eq>
      <P>همچنین دمای واقعی را می‌توان از طول موج‌ها استخراج کرد؛ یعنی روشی برای دماسنجی بر پایه‌ی طول موج:</P>
      <Eq>{tex`T_l = \frac{C_2}{x_l\,\lambda_l}, \qquad T_s = \frac{C_2}{x_s\,\lambda_s}, \qquad T_m = \frac{C_2}{x_m\,\lambda_m} \tag{16, 17, 18}`}</Eq>

      <H2>۵) بحث</H2>
      <P>
        بر پایه‌ی نوع جدید منحنی‌ها، سه نتیجه‌ی مهم به دست می‌آید. نخست، روشی برای تأیید ماهیت جسم سیاه و
        درجه‌بندی آن با دو خطای <Tex>a</Tex> و <Tex>b</Tex>:
      </P>
      <Eq>{tex`a = 1 - \left|\frac{RW_{\eta t} - RW_{\eta e}}{RW_{\eta t} + RW_{\eta e}}\right|, \qquad b = 1 - \left|\frac{RSF_{\eta t} - RSF_{\eta e}}{RSF_{\eta t} + RSF_{\eta e}}\right| \tag{19, 20}`}</Eq>
      <P>
        وقتی <Tex>a=b=1</Tex>، جسم سیاهِ ایده‌آل است؛ مقادیر نزدیک به ۱ درجات مختلف جسم سیاه واقعی را
        تعریف می‌کنند. دوم، در دمای ثابت می‌توان دمای واقعی را از سه طول موج (قله و دو طول موج متناظر با یک{" "}
        <Tex>{tex`\eta`}</Tex> مناسب) تعیین کرد که یک کالیبراسیون متقابل فراهم می‌کند. سوم، برای تابش حرارتی
        زمین، امواج مایکروویوِ شناسایی‌شده توسط سنجش از دور پسیو با قانون پلانک قابل پیش‌بینی نیست؛ برای جسم
        خاکستری باید قانون کیرشهف عمیق‌تر مطالعه شود.
      </P>
      <Cite />
    </>
  );
}

/* ---------- English: the numerical-analysis exercise ---------- */

export function BlackbodyEn() {
  const lang: Lang = "en";
  return (
    <>
      <p className="ui text-sm text-muted-foreground">
        Exercise on Yang &amp; Wei (2016) · numerical analysis by S. Mustafa
      </p>
      <div className="my-6 rounded-xl border border-border bg-card p-5">
        I took this paper as an exercise in reading physics research and in applying what I learned in
        university classes. At roughly the halfway point of an undergraduate physics programme, I wanted to
        challenge myself to analyse a paper: simulate the data, and reproduce the paper&apos;s new method for
        the black-body radiation distribution in code. I also used Jupyter notebooks from GitHub to benefit
        from others&apos; experience with black-body analysis.
      </div>

      <H2>1. Black-body radiation and Planck&apos;s law</H2>
      <P>First, the traditional spectrum curve (Figure 1 of the paper), from Planck&apos;s distribution:</P>
      <Eq>{tex`e_b(\lambda, T) = C_1 \lambda^{-5} \left(e^{ \frac{C_2}{\lambda T}} - 1 \right)^{-1}, \quad C_1 = 2hc^2,\ \ C_2 = \frac{hc}{k} \tag{1}`}</Eq>
      <Fig src="radation_micropng.png">
        Graph of <Tex>{tex`e_b(\lambda,T)`}</Tex>.
      </Fig>
      <P>
        The paper&apos;s traditional curve has wavelength in nanometres, so I also plotted a function like its
        Eq. 8:
      </P>
      <Eq>{tex`u(\lambda) = \frac{\alpha}{\lambda^{5}\left(e^{\beta}-1\right)} \times 10^{-3}, \quad \alpha = 8\pi h c,\ \ \beta = \frac{h c}{\lambda k T}`}</Eq>
      <Fig src="radation_micro2.png">
        Graph of <Tex>{tex`u(\lambda)`}</Tex>.
      </Fig>

      <H2>2. Wien&apos;s displacement constant</H2>
      <P>
        The maximum of <Tex>{tex`e_b`}</Tex> is where <Tex>{tex`\partial e_b/\partial\lambda = 0`}</Tex>.
        Simplifying with Sympy gives
      </P>
      <Eq>{tex`\frac{C_{1} \left(C_{2} e^{\frac{C_{2}}{T \lambda}} - 5 T \lambda \left(e^{\frac{C_{2}}{T \lambda}} - 1\right)\right)}{T \lambda^{7} \left(e^{\frac{C_{2}}{T \lambda}} - 1\right)^{2}} = 0`}</Eq>
      <P>which reduces to a transcendental equation, with <Tex>{tex`x = C_2/\lambda T`}</Tex>:</P>
      <Eq>{tex`(x - 5)e^x + 5 = 0 \iff 5(e^x - 1) = x e^x \tag{3}`}</Eq>
      <P>
        Newton–Raphson uses <Tex>{tex`f(x) = 5(e^x - 1) - x e^x`}</Tex>, so{" "}
        <Tex>{tex`f'(x) = (4 - x)e^x`}</Tex> and <Tex>{tex`x_{n+1} = x_n - f(x_n)/f'(x_n)`}</Tex>. Fixed-point
        iteration divides by <Tex>{tex`e^x`}</Tex>: <Tex>{tex`x = g(x) = 5(1 - e^{-x})`}</Tex>, started at{" "}
        <Tex>{tex`x_0 = 6`}</Tex>.
      </P>
      <Steps
        lang={lang}
        steps={[
          { title: "Differentiate Planck", description: "Sympy simplifies ∂e_b/∂λ = 0 to 5(eˣ − 1) = x eˣ." },
          { title: "Bisection", description: "Binary search on the interval around the root: x ≈ 4.9651." },
          { title: "Newton–Raphson", description: "scipy.optimize.newton with f′(x) = (4 − x)eˣ: x ≈ 4.965114." },
          { title: "Fixed-point", description: "x = 5(1 − e⁻ˣ), x₀ = 6: converges to 4.9651142." },
          { title: "Graphical", description: "Read the crossing off the plot and narrow the interval: x ≈ 4.930158, coarser." },
        ]}
      />
      <MethodsTable lang={lang} />
      <Fig src="1_py.png" small>
        The two sides of Eq. (3): <Tex>{tex`5(e^x-1)`}</Tex> and <Tex>{tex`xe^x`}</Tex>.
      </Fig>
      <Fig src="2_py.png" small>Intersection of the two curves.</Fig>
      <Eq>{tex`\lambda_{max} T = \frac{C_2}{x} \approx 2897.8186\ \mu\mathrm{m\cdot K}, \qquad x \approx 4.9651`}</Eq>
      <P>
        The textbook value is 2897.8268 μm·K (Zettili, Example 1.1; Greiner, Exercise 2.4). The graphical
        method lands at 2918.3649 μm·K, about 0.7% off, as expected from reading a plot by eye.
      </P>

      <H2>3. Inflection points</H2>
      <P>
        The paper computes the inflection points of Planck&apos;s curve (where the second derivative vanishes)
        to analyse its shape and symmetry. They define the curve&apos;s relative width and symmetry factor and
        mark where it changes from a steep slope to a gentle one. I found them with{" "}
        <code dir="ltr">nsolve</code>; the same code works at any temperature.
      </P>
      <Fig src="ref1.png">Inflection points at different temperatures.</Fig>
      <Eq>{tex`\lambda_{il} T = 4082.6999\ \mu\mathrm{m\cdot K}, \qquad \lambda_{ir} T = 1703.8229\ \mu\mathrm{m\cdot K}`}</Eq>
      <P>
        The paper prints 4082.6612 for the left point; my numerical root of its Eq. (3) is 4082.6999. The
        right point matches to four decimals.
      </P>

      <H2>4. The paper&apos;s normalized spectrum</H2>
      <P>
        To bound the wavelength range of Eq. (1), the paper proposes a normalized Planck equation. With the
        normalization factor <Tex>{tex`\eta\in(0,1)`}</Tex> and <Tex>{tex`x = C_2/\lambda T`}</Tex>:
      </P>
      <Eq>{tex`x^5 - 21.2014\,\eta\, e^{x} + 21.2014\,\eta = 0 \tag{6}`}</Eq>
      <P>
        For each <Tex>{tex`\eta`}</Tex> there are two real roots <Tex>{tex`x_{\eta l}<x_{\eta s}`}</Tex>; at{" "}
        <Tex>{tex`\eta=1`}</Tex> they merge at <Tex>{tex`x_m`}</Tex>. The wavelengths follow from{" "}
        <Tex>{tex`\lambda = C_2/(xT)`}</Tex>. The relative width and symmetry factor are
      </P>
      <Eq>{tex`RW_{\eta t} = \frac{x_m\,(x_{\eta s} - x_{\eta l})}{x_{\eta s}\,x_{\eta l}}, \qquad RSF_{\eta t} = \frac{x_{\eta l}\,(x_{\eta s} - x_m)}{x_{\eta s}\,(x_m - x_{\eta l})}`}</Eq>
      <Table1 lang={lang} />
      <Fig src="3.png">
        The paper&apos;s Fig. 3: normalized spectra <Tex>{tex`\eta`}</Tex> vs <Tex>{tex`\lambda`}</Tex> at 6000,
        3000, 2000, 1000 K (and 900 to 200 K).
      </Fig>
      <Table2 lang={lang} />
      <P>
        Because the roots give the temperature as <Tex>{tex`T = C_2/(x\lambda)`}</Tex>, three measured
        wavelengths (the peak and the pair for one <Tex>{tex`\eta`}</Tex>) give a self-consistent
        thermometry method, and the errors <Tex>a</Tex> and <Tex>b</Tex> between theoretical and measured{" "}
        <Tex>RW</Tex> and <Tex>RSF</Tex> grade how close a real body is to an ideal black body.
      </P>
      <Cite />
    </>
  );
}
