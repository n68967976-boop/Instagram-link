// Ssenariy ma'lumotlari: B. Franklin va A. Fitrat – ma'rifatparvarlik va milliy uyg'onish.
// Faktlar faqat tekshirilgan, keng tan olingan ma'lumotlardan olingan; aniq iqtiboslar
// to'qilmagan, asarlar mazmuni parafraz qilingan.

export const FPS = 30;

export type Axis = {
  kind: 'axis';
  num: string;
  title: string;
  accent: string;
  franklin: string[];
  fitrat: string[];
  reason: string;
  seconds: number;
};

export type Statement = {
  kind: 'statement';
  eyebrow: string;
  title: string;
  accent?: string;
  lines: string[];
  seconds: number;
};

export type Bios = {kind: 'bios'; seconds: number};
export type Intro = {kind: 'intro'; seconds: number};
export type Sources = {kind: 'sources'; seconds: number};
export type Outro = {kind: 'outro'; seconds: number};

export type Scene = Axis | Statement | Bios | Intro | Sources | Outro;

export const FRANKLIN_BIO = {
  name: 'Benjamin Franklin',
  years: '1706 – 1790',
  place: 'Boston · Filadelfiya',
  facts: [
    'Bosmaxona shogirdi, keyin noshir va jurnalist',
    'Olim: elektr tajribalari, chaqmoq qaytargich',
    'Mustaqillik deklaratsiyasi (1776) va AQSH Konstitutsiyasini (1787) imzolaganlardan biri',
  ],
};

export const FITRAT_BIO = {
  name: 'Abdurauf Fitrat',
  years: '1886 – 1938',
  place: 'Buxoro · Toshkent',
  facts: [
    '1909–1913-yillarda Istanbulda tahsil olgan',
    'Shoir, dramaturg, tilshunos va adabiyotshunos olim',
    '1918-yilda "Chig\'atoy gurungi" jamiyatini tuzgan; qatag\'on qurboni (1938)',
  ],
};

export const SCENES: Scene[] = [
  {kind: 'intro', seconds: 20},
  {kind: 'bios', seconds: 45},
  {
    kind: 'statement',
    eyebrow: 'Metod',
    title: 'Ta\'sir emas,',
    accent: 'tipologik o\'xshashlik',
    lines: [
      'Franklin va Fitrat o\'rtasida bevosita aloqa (kontakt aloqa) hujjatlashtirilmagan.',
      'Shuning uchun asosiy usul – tarixiy-tipologik qiyos (V. Jirmunskiy konsepsiyasi).',
      'Turli davrda, lekin o\'xshash ijtimoiy-madaniy bosqichda o\'xshash g\'oyalar tug\'iladi.',
      '"Ma\'rifatparvarlik": Franklinda – Yevropa Ma\'rifat davri, Fitratda – jadid ma\'rifatparvarligi.',
    ],
    seconds: 45,
  },
  {
    kind: 'axis',
    num: '01',
    title: 'Ma\'rifat orqali',
    accent: 'shaxs kamoloti',
    franklin: [
      '"Avtobiografiya" (1771–1790, tugallanmagan)',
      '13 fazilat: mo\'tadillik, tartib, tejamkorlik, mehnatsevarlik, kamtarlik…',
      'Fazilatlarni jadval asosida haftama-hafta mashq qilish',
      '"O\'zini o\'zi yaratgan inson" (self-made man) modeli',
    ],
    fitrat: [
      '"Rahbari najot" – axloqiy-tarbiyaviy, falsafiy risola',
      '"Oila" – oila tarbiyasi va ayol huquqi masalalari',
      'Axloq va ilm – millat najotining yo\'li',
      'Shaxs kamoloti millat taqdiri bilan bog\'liq',
    ],
    reason: 'Protestant etikasi va pragmatizm  ↔  islomiy axloq va ma\'naviy najot',
    seconds: 60,
  },
  {
    kind: 'axis',
    num: '02',
    title: 'Ta\'lim',
    accent: 'islohoti',
    franklin: [
      'Junto (1727) – o\'z-o\'zini takomillashtirish klubi',
      'Filadelfiya kutubxona kompaniyasi (1731)',
      'Yoshlar ta\'limi haqida takliflar (1749)',
      '→ Filadelfiya akademiyasi, keyin Pensilvaniya universiteti',
    ],
    fitrat: [
      '"Munozara" (Istanbul, 1909)',
      'Buxorolik mudarris va yevropalik o\'rtasida bahs',
      'Mavzu – yangi usul (jadid) maktablari',
      'Eski maktab tanqidi, zamonaviy ilmga da\'vat',
    ],
    reason: 'Fuqarolik jamiyati tashabbusi  ↔  amirlik va mustamlaka to\'siqlari',
    seconds: 60,
  },
  {
    kind: 'axis',
    num: '03',
    title: 'Niqob',
    accent: 'poetikasi',
    franklin: [
      'Silence Dogood maktublari (1722) – 16 yoshida, beva ayol niqobida',
      '"Poor Richard\'s Almanack" (1732–1758) – Richard Sonders niqobi',
      '"The Way to Wealth" (1758) – "Ota Avraam" nutqi',
      'Xalqona, satirik niqob',
    ],
    fitrat: [
      '"Munozara" – mudarris va farangi tilidan',
      '"Hind sayyohi bayonoti" (Istanbul, 1912)',
      'Hindistonlik sayyoh ko\'zi bilan Buxoro hayoti',
      '"Begona ko\'z" niqobi – o\'z jamiyatiga tashqaridan qarash',
    ],
    reason: 'Satirik-xalqona niqob  ↔  "begona kuzatuvchi" niqobi',
    seconds: 60,
  },
  {
    kind: 'axis',
    num: '04',
    title: 'Satira va',
    accent: 'ijtimoiy tanqid',
    franklin: [
      '"Polly Beyker nutqi" (1747)',
      'Jamiyatning axloqiy ikkiyuzlamachiligi tanqidi',
      '"Bagatellar" – qisqa falsafiy-hazil asarlar',
      'Ma\'rifat davrining aql-idrok kulti',
    ],
    fitrat: [
      '"Qiyomat" (1923) – qahramoni Pochamir',
      'Xurofot va johillik ustidan kulgi',
      '"Hind sayyohi bayonoti" – ijtimoiy illatlar tanqidi',
      'Kulgi – uyg\'otish vositasi',
    ],
    reason: 'Ma\'rifat ratsionalizmi  ↔  jadid islohotchiligi',
    seconds: 60,
  },
  {
    kind: 'axis',
    num: '05',
    title: 'Mustamlaka va',
    accent: 'milliy o\'zlik',
    franklin: [
      '"Buyuk imperiyani kichraytirish qoidalari" (1773)',
      'Britaniya mustamlaka siyosatiga satira',
      'Amerika o\'zligining shakllanishi',
      'Mustaqil davlat qurilishida ishtirok',
    ],
    fitrat: [
      'Vatan obrazi va milliy o\'zlik – she\'riyatda',
      '"Abulfayzxon" (1924) – tarixiy drama',
      'Hokimiyat inqirozi, zulm va xiyonat tasviri',
      'O\'tmish orqali zamonani tanqid',
    ],
    reason: 'G\'olib inqilob  ↔  fojiali tugagan uyg\'onish',
    seconds: 60,
  },
  {
    kind: 'axis',
    num: '06',
    title: 'Matbuot –',
    accent: 'ma\'rifat vositasi',
    franklin: [
      '"The Pennsylvania Gazette" noshiri (1729-yildan)',
      'Almanax – keng xalq o\'qiydigan nashr',
      'Bosma so\'z orqali jamoatchilik fikrini shakllantirish',
      'Bozor asosidagi noshirlik',
    ],
    fitrat: [
      'Jadid matbuoti va nashrlari',
      'Istanbulda chop etilgan asarlar – vatanga yo\'llangan so\'z',
      '"Munozara"ning ruscha tarjimasi (Toshkent, 1911)',
      'Senzura va taqiq sharoitida ijod',
    ],
    reason: 'Erkin bozor noshirligi  ↔  senzura sharoiti',
    seconds: 60,
  },
  {
    kind: 'statement',
    eyebrow: 'Farq sababi',
    title: 'Bir g\'oya,',
    accent: 'ikki taqdir',
    lines: [
      'Franklin: ma\'rifat g\'oyalari mustaqil davlat poydevoriga aylandi.',
      'Fitrat: milliy uyg\'onish qatag\'on bilan uzildi; asarlari uzoq yillar taqiqlandi.',
      'Mustaqillik yillarida Fitrat merosi qayta tiklandi va nashr etildi.',
      'Qiyos baho emas: biri yuqori, biri past emas – g\'oyaviy funksiya solishtiriladi.',
    ],
    seconds: 45,
  },
  {
    kind: 'statement',
    eyebrow: 'Xulosa',
    title: 'Ma\'rifat –',
    accent: 'uyg\'onish kaliti',
    lines: [
      'Ikkala adib uchun ham ilm va axloq – jamiyatni o\'zgartirish vositasi.',
      'Ikkalasi ham niqob, dialog va satira orqali g\'oyani xalqqa yetkazdi.',
      'Ta\'lim islohoti va matbuot – ikkala harakatning tayanchi.',
      'Farqlar tarixiy-madaniy sharoitdan kelib chiqadi: tipologik o\'xshashlik, lekin turli taqdir.',
    ],
    seconds: 45,
  },
  {kind: 'sources', seconds: 30},
  {kind: 'outro', seconds: 10},
];

export const SOURCES = [
  'Franklin B. The Autobiography / ed. J.A.L. Lemay, P.M. Zall. – New York: Norton, 1986.',
  'Isaacson W. Benjamin Franklin: An American Life. – New York: Simon & Schuster, 2003.',
  'Wood G.S. The Americanization of Benjamin Franklin. – New York: Penguin Press, 2004.',
  'Qosimov B. Milliy uyg\'onish: jasorat, ma\'rifat, fidoyilik. – T.: Ma\'naviyat, 2002.',
  'Rizayev Sh. Jadid dramasi. – T.: Sharq, 1997.',
  'Khalid A. The Politics of Muslim Cultural Reform. – Berkeley: UC Press, 1998.',
  'Allworth E. Evading Reality: The Devices of \'Abdalrauf Fitrat. – Leiden: Brill, 2002.',
  'Жирмунский В.М. Сравнительное литературоведение: Восток и Запад. – Л.: Наука, 1979.',
];

export const totalSeconds = SCENES.reduce((s, x) => s + x.seconds, 0);
