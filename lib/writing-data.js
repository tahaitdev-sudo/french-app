// Entraînement à l'expression écrite — sujets ORIGINAUX (pas des sujets officiels).
// Les « vérifications » sont de simples repérages de mots-clés : elles ne corrigent ni la grammaire ni l'orthographe.

// Construit une regex qui cherche des mots/expressions entiers (accents compris).
export const w = (...words) =>
  new RegExp(
    `(?<![\\p{L}])(?:${words.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}])`,
    'iu',
  );

// Auxiliaire + participe (passé composé) et terminaisons d'imparfait
export const PASSE_COMPOSE = /(?<![\p{L}])(?:j'ai|tu as|il a|elle a|on a|nous avons|vous avez|ils ont|je suis|tu es|il est|elle est|on est|nous sommes|vous êtes)\s+\p{L}{2,}/iu;
const IMPARFAIT = /(?<![\p{L}])\p{L}+(?:ais|ait|aient|ions|iez)(?![\p{L}])/iu;

export const CONNECTORS = w(
  'mais', 'cependant', 'pourtant', 'néanmoins', 'toutefois', 'donc', 'car', 'en effet',
  'de plus', 'en outre', 'par ailleurs', 'par conséquent', "d'une part", "d'autre part",
  'en revanche', 'ensuite', 'puis', 'enfin', 'alors', 'parce que', 'puisque',
);

export const WRITING_TASKS = [
  {
    id: 'w1',
    level: 'A1',
    title: 'دعوة إلى حفلة',
    prompt:
      "Écrivez un message à un ami pour l'inviter à votre anniversaire (samedi, à 20 h, chez vous).",
    instructions: 'اكتب رسالة قصيرة لصديق تدعوه فيها إلى عيد ميلادك: اليوم والساعة والمكان.',
    min: 30,
    max: 50,
    checks: [
      { label: 'تحية في البداية', test: w('salut', 'bonjour', 'coucou', 'cher', 'chère') },
      { label: 'ذكرت أنها دعوة أو حفلة', test: w('invite', 'inviter', 'anniversaire', 'fête', 'soirée', 'viens', 'venir') },
      { label: 'ذكرت الساعة (20 h)', test: /(20\s?h|vingt heures|20\s?:\s?00|huit heures)/i },
      { label: 'ذكرت المكان (chez moi / chez nous)', test: w('chez moi', 'chez nous', 'à la maison', 'chez') },
      { label: 'خاتمة ودّية (À samedi, bises…)', test: w('à bientôt', 'à samedi', 'à très vite', 'bises', 'bisous', 'amicalement', 'à demain') },
    ],
    phrases: [
      { fr: "Je t'invite à mon anniversaire.", ar: 'أدعوك إلى عيد ميلادي.' },
      { fr: 'La fête commence à 20 h.', ar: 'تبدأ الحفلة في الثامنة.' },
      { fr: 'Tu peux venir avec un ami ?', ar: 'هل يمكنك أن تأتي مع صديق؟' },
      { fr: 'Réponds-moi vite !', ar: 'أجبني بسرعة!' },
    ],
    model:
      "Salut Karim ! Samedi prochain, c'est mon anniversaire. Je fais une petite fête chez moi à 20 h. Il y aura de la musique et un gâteau. Tu peux venir avec ton frère ? Réponds-moi vite ! À samedi, bises.",
    notes: ['استعمل «Salut» مع الأصدقاء و«Bonjour» في الرسائل الرسمية.', 'الجمل قصيرة وبسيطة، وهذا يكفي في A1.'],
  },
  {
    id: 'w2',
    level: 'A1',
    title: 'تعريف بنفسك',
    prompt:
      "Présentez-vous à une nouvelle collègue : votre nom, votre âge, votre ville, votre profession et vos loisirs.",
    instructions: 'عرّف بنفسك لزميلة جديدة: الاسم والعمر والمدينة والمهنة والهوايات.',
    min: 40,
    max: 60,
    checks: [
      { label: 'ذكرت اسمك', test: w("je m'appelle", 'mon nom', 'je suis') },
      { label: 'ذكرت عمرك', test: /\b\d{1,2}\s*ans\b|(?<![\p{L}])(?:vingt|trente|quarante|cinquante)(?:[-\s]\p{L}+)?\s+ans/iu },
      { label: 'ذكرت مدينتك (J\'habite à…)', test: w("j'habite", 'habite', 'je vis', 'je viens de') },
      { label: 'ذكرت مهنتك', test: w('je travaille', 'métier', 'profession', 'étudiant', 'étudiante', 'infirmière', 'infirmier', 'professeur', 'ingénieur', 'médecin') },
      { label: 'ذكرت هواياتك', test: w("j'aime", "j'adore", 'loisirs', 'passe-temps', 'je joue', 'je pratique') },
    ],
    phrases: [
      { fr: "Je m'appelle Nadia.", ar: 'اسمي ناديا.' },
      { fr: "J'ai trente ans.", ar: 'عمري ثلاثون سنة.' },
      { fr: "J'habite à Lille.", ar: 'أسكن في ليل.' },
      { fr: "J'aime la lecture et la cuisine.", ar: 'أحب القراءة والطبخ.' },
    ],
    model:
      "Bonjour, je m'appelle Nadia. J'ai trente ans et j'habite à Lille, dans le nord de la France. Je suis infirmière dans un hôpital. J'aime la lecture, la cuisine et les promenades avec mon chien. Le week-end, je joue aussi au tennis avec des amies. Et vous, qu'est-ce que vous aimez faire ?",
    notes: ['لاحظ أن العمر يُقال بـ avoir: «J\'ai trente ans» وليس être.', 'ختمنا بسؤال لإبقاء الحوار مفتوحاً.'],
  },
  {
    id: 'w3',
    level: 'A2',
    title: 'عطلة نهاية الأسبوع',
    prompt:
      "Vous avez passé un week-end à la campagne. Racontez-le à un ami dans un message (ce que vous avez fait, le temps, votre opinion).",
    instructions: 'احكِ لصديق عن عطلة نهاية أسبوع قضيتها في الريف: ماذا فعلت، والطقس، ورأيك.',
    min: 60,
    max: 80,
    checks: [
      { label: 'تحية', test: w('salut', 'bonjour', 'coucou', 'cher', 'chère') },
      { label: 'استعملت الماضي المركب (j\'ai fait، nous sommes allés…)', test: PASSE_COMPOSE },
      { label: 'وصفت الطقس أو الأجواء بـ imparfait (il faisait beau، c\'était…)', test: w("c'était", 'il faisait', 'il y avait', 'faisait', 'était') },
      { label: 'ذكرت الريف أو نشاطاً', test: w('campagne', 'village', 'forêt', 'ferme', 'promenade', 'jardin') },
      { label: 'عبّرت عن رأيك (j\'ai adoré، c\'était super…)', test: w("j'ai adoré", "j'ai aimé", 'super', 'génial', 'magnifique', 'agréable', 'calme') },
    ],
    phrases: [
      { fr: 'Nous sommes allés à la campagne.', ar: 'ذهبنا إلى الريف.' },
      { fr: 'Il faisait beau.', ar: 'كان الطقس جميلاً.' },
      { fr: "J'ai adoré ce week-end.", ar: 'أحببت هذه العطلة كثيراً.' },
      { fr: "Et toi, qu'as-tu fait ?", ar: 'وأنت، ماذا فعلت؟' },
    ],
    model:
      "Salut Léa, ce week-end, nous sommes allés à la campagne chez mes grands-parents. Il faisait beau et nous avons fait une grande promenade dans la forêt. Samedi soir, ma grand-mère a préparé un délicieux repas et nous avons mangé dans le jardin. Dimanche, j'ai aidé mon grand-père à ramasser des pommes. C'était très calme et j'ai adoré ! Et toi, qu'as-tu fait ? À bientôt, Sam.",
    notes: ['الأحداث المنتهية بـ passé composé، والوصف بـ imparfait.', 'aller يأخذ être: «nous sommes allés» (اتفاق مع الفاعل).'],
  },
  {
    id: 'w4',
    level: 'A2',
    title: 'تغيير موعد طبيب',
    prompt:
      "Vous ne pouvez pas aller à votre rendez-vous chez le médecin jeudi à 10 h. Écrivez un message poli pour demander un autre rendez-vous.",
    instructions: 'لا تستطيع حضور موعدك عند الطبيب يوم الخميس. اكتب رسالة مهذبة لطلب موعد آخر.',
    min: 60,
    max: 80,
    checks: [
      { label: 'تحية مهذبة', test: w('bonjour', 'madame', 'monsieur', 'docteur', 'docteure') },
      { label: 'ذكرت الموعد الحالي', test: w('rendez-vous', 'rdv', 'consultation') },
      { label: 'قدّمت سبباً (je ne peux pas، empêchement…)', test: w('je ne peux pas', 'malheureusement', 'empêchement', 'car', 'parce que', 'en effet') },
      { label: 'طلبت بصيغة مهذبة (serait-il possible، pourriez-vous…)', test: w('serait-il possible', 'pourriez-vous', 'je voudrais', 'je souhaiterais', 'je vous prie') },
      { label: 'خاتمة مهذبة (Cordialement، merci…)', test: w('cordialement', 'je vous remercie', 'merci', 'bien à vous', 'sincères salutations') },
    ],
    phrases: [
      { fr: 'Je ne peux malheureusement pas venir.', ar: 'للأسف لا أستطيع الحضور.' },
      { fr: 'Serait-il possible de déplacer le rendez-vous ?', ar: 'هل من الممكن تأجيل الموعد؟' },
      { fr: 'Je vous remercie par avance.', ar: 'أشكركم مسبقاً.' },
      { fr: 'Cordialement.', ar: 'مع التحية.' },
    ],
    model:
      "Bonjour Docteur, j'ai un rendez-vous jeudi à 10 h, mais je ne peux malheureusement pas venir à cause d'un empêchement professionnel. Serait-il possible de le déplacer à vendredi, dans la matinée ? Si ce n'est pas possible, je peux aussi venir la semaine prochaine. Je m'excuse pour la gêne occasionnée et je vous remercie par avance pour votre compréhension. Cordialement, Karim Benali.",
    notes: ['«Serait-il possible de…» صيغة شرطية مهذبة للطلب.', 'لا تستعمل tu مع طبيب أو جهة رسمية، استعمل vous.'],
  },
  {
    id: 'w5',
    level: 'B1',
    title: 'شكوى من الضجيج',
    prompt:
      "Votre voisin écoute de la musique très fort le soir. Écrivez-lui une lettre pour expliquer le problème et proposer une solution (ton poli).",
    instructions: 'جارك يشغّل الموسيقى بصوت عالٍ في المساء. اكتب له رسالة تشرح فيها المشكلة وتقترح حلاً بأسلوب مهذب.',
    min: 100,
    max: 120,
    checks: [
      { label: 'تحية مناسبة', test: w('bonjour', 'madame', 'monsieur', 'cher voisin', 'chère voisine') },
      { label: 'وصفت المشكلة (bruit، musique، tard…)', test: w('bruit', 'musique', 'dérange', 'tard', 'nuit', 'volume') },
      { label: 'اقترحت حلاً أو طلباً (pourriez-vous، solution…)', test: w('pourriez-vous', 'solution', 'je vous demande', 'serait-il possible', 'je souhaiterais', 'merci de') },
      { label: 'استعملت صيغة شرطية مهذبة (pourriez، souhaiterais…)', test: w('pourriez', 'pourrions', 'souhaiterais', 'voudrais', 'serait') },
      { label: 'استعملت أدوات ربط (mais، car، en effet…)', test: CONNECTORS },
      { label: 'خاتمة مهذبة', test: w('cordialement', 'salutations', 'je vous remercie', 'merci') },
    ],
    phrases: [
      { fr: 'Je vous écris au sujet du bruit.', ar: 'أكتب إليكم بشأن الضجيج.' },
      { fr: 'Cela nous empêche de dormir.', ar: 'هذا يمنعنا من النوم.' },
      { fr: 'Pourriez-vous baisser le volume après 22 h ?', ar: 'هل يمكنكم خفض الصوت بعد العاشرة مساءً؟' },
      { fr: 'Je suis sûr que nous trouverons une solution.', ar: 'أنا متأكد أننا سنجد حلاً.' },
    ],
    model:
      "Bonjour Madame Martin, je suis votre voisin du troisième étage. Je vous écris au sujet du bruit que nous entendons depuis plusieurs semaines le soir. En effet, la musique est souvent très forte après vingt-deux heures, ce qui nous empêche de dormir, car mes enfants se lèvent tôt pour l'école. Je comprends que vous aimiez la musique, mais pourriez-vous baisser le volume après cette heure-là ? Je suis certain que nous pouvons trouver une solution qui convienne à tout le monde. Je ne doute pas que ce soit involontaire. Je reste disponible si vous souhaitez en discuter. Je vous remercie d'avance pour votre compréhension. Cordialement, M. Durand.",
    notes: ['بعد «une solution qui» نستعمل subjonctif: «convienne».', 'نبدأ بالمشكلة ثم نعترف بوجهة نظر الآخر (je comprends que…) ثم نقترح.'],
  },
  {
    id: 'w6',
    level: 'B1',
    title: 'ذكرى من الطفولة',
    prompt:
      "Racontez un souvenir d'enfance important pour vous : où, avec qui, ce qui s'est passé et ce que vous avez ressenti.",
    instructions: 'احكِ ذكرى مهمة من طفولتك: أين ومع من، وماذا حدث، وبماذا شعرت.',
    min: 100,
    max: 120,
    checks: [
      { label: 'استعملت imparfait للعادات والوصف (je passais، c\'était…)', test: IMPARFAIT },
      { label: 'استعملت passé composé للأحداث', test: PASSE_COMPOSE },
      { label: 'استعملت عبارات زمنية (un jour، quand j\'étais petit…)', test: w("quand j'étais petit", 'un jour', 'soudain', 'à cette époque', 'autrefois', "à l'époque", 'chaque', 'enfant') },
      { label: 'عبّرت عن مشاعرك (heureux، peur، nostalgique…)', test: w('heureux', 'heureuse', 'content', 'contente', 'triste', 'peur', 'joie', 'nostalgique', 'nostalgie', 'ému') },
      { label: 'استعملت أدوات ربط (ensuite، puis، heureusement…)', test: CONNECTORS },
    ],
    phrases: [
      { fr: "Quand j'étais petit, je passais mes vacances chez ma grand-mère.", ar: 'عندما كنت صغيراً كنت أقضي عطلاتي عند جدتي.' },
      { fr: "Un jour, j'ai eu très peur.", ar: 'في يوم من الأيام خفت كثيراً.' },
      { fr: 'Heureusement, tout s\'est bien terminé.', ar: 'لحسن الحظ انتهى كل شيء على خير.' },
      { fr: 'Ce souvenir me rend nostalgique.', ar: 'هذه الذكرى تجعلني أحنّ إلى الماضي.' },
    ],
    model:
      "Quand j'étais petit, je passais toutes mes vacances d'été chez ma grand-mère, dans un petit village de montagne. Chaque matin, je me levais très tôt pour aller chercher du pain avec elle. Ensuite, nous prenions le petit-déjeuner dans le jardin, sous un grand arbre. Un jour, j'ai perdu mon chien dans la forêt et j'ai eu très peur. Heureusement, nous l'avons retrouvé après deux heures de recherche. Le soir, nous avons partagé une grande tarte aux pommes pour fêter ça. Ce jour-là, ma grand-mère m'a serré dans ses bras et je me suis senti en sécurité. Aujourd'hui encore, ce souvenir me rend à la fois très heureux et un peu nostalgique.",
    notes: ['imparfait للخلفية والعادة، وpassé composé للحدث المحدد («Un jour, j\'ai perdu…»).', 'اتفاق اسم المفعول مع COD المتقدم: «nous l\'avons retrouvé».'],
  },
  {
    id: 'w7',
    level: 'B2',
    title: 'مقال رأي: العمل عن بُعد',
    prompt:
      "Le télétravail se développe de plus en plus. Dans un texte structuré, présentez ses avantages et ses inconvénients, puis donnez votre opinion.",
    instructions: 'العمل عن بُعد ينتشر. اكتب نصاً منظماً تعرض فيه مزاياه وعيوبه ثم رأيك الشخصي.',
    min: 150,
    max: 180,
    checks: [
      { label: 'عبّرت عن رأيك (à mon avis، selon moi…)', test: w('à mon avis', 'selon moi', 'je pense que', 'je crois que', "d'après moi", 'je trouve que', 'je suis convaincu', 'je suis convaincue') },
      { label: 'ذكرت مزايا', test: w('avantage', 'avantages', 'gagner du temps', 'flexibilité', 'économiser', 'concentr') },
      { label: 'ذكرت عيوباً', test: w('inconvénient', 'inconvénients', 'isolement', 'solitude', 'difficile', 'manque') },
      { label: 'استعملت أدوات ربط متنوعة', test: new RegExp(`(?:${CONNECTORS.source}).*(?:${CONNECTORS.source})`, 'isu') },
      { label: 'استعملت d\'une part / d\'autre part أو en revanche', test: w("d'une part", "d'autre part", 'en revanche', 'cependant', 'toutefois', 'néanmoins') },
      { label: 'ختمت بخلاصة (en conclusion…)', test: w('en conclusion', 'pour conclure', 'en résumé', 'en définitive', 'finalement', 'somme toute') },
    ],
    phrases: [
      { fr: "D'une part…, d'autre part…", ar: 'من جهة…، ومن جهة أخرى…' },
      { fr: 'À mon avis, il présente à la fois des avantages et des inconvénients.', ar: 'في رأيي له مزايا وعيوب معاً.' },
      { fr: 'En revanche, il peut entraîner un sentiment d\'isolement.', ar: 'في المقابل قد يسبب شعوراً بالعزلة.' },
      { fr: 'En conclusion, tout dépend de la manière dont il est organisé.', ar: 'في الخلاصة كل شيء يتوقف على طريقة تنظيمه.' },
    ],
    model:
      "Depuis quelques années, le télétravail s'est largement développé et il divise l'opinion. À mon avis, il présente à la fois des avantages et des inconvénients. D'une part, il permet de gagner du temps, car on évite les transports, et il offre plus de flexibilité pour organiser sa journée. De plus, beaucoup d'employés affirment qu'ils sont plus concentrés chez eux, loin du bruit du bureau. De nombreuses études montrent d'ailleurs que cette organisation améliore l'équilibre de vie. D'autre part, le télétravail peut entraîner un sentiment d'isolement, puisque l'on voit moins ses collègues. En outre, il est parfois difficile de séparer la vie professionnelle de la vie privée, ce qui peut finir par fatiguer les salariés. Selon moi, la meilleure solution consiste à combiner les deux formules : deux ou trois jours à la maison, et le reste de la semaine au bureau. En conclusion, le télétravail est un outil utile, à condition qu'il soit bien encadré par les entreprises.",
    notes: ['بنية المقال: مقدمة ← مزايا ← عيوب ← رأي ← خلاصة.', 'بعد «à condition que» نستعمل subjonctif: «qu\'il soit».', 'نوّع أدوات الربط ولا تكرر «et» و«mais» فقط.'],
  },
  {
    id: 'w8',
    level: 'B2',
    title: 'رسالة شكوى رسمية',
    prompt:
      "Vous avez commandé un appareil sur Internet. Il est arrivé en retard et il est endommagé. Écrivez une lettre de réclamation formelle pour demander une solution.",
    instructions: 'طلبت جهازاً عبر الإنترنت فوصل متأخراً وتالفاً. اكتب رسالة شكوى رسمية تطلب فيها حلاً.',
    min: 150,
    max: 180,
    checks: [
      { label: 'نداء رسمي (Madame, Monsieur)', test: w('madame', 'monsieur') },
      { label: 'عرّفت بالطلب (commande، numéro، colis…)', test: w('commande', 'colis', 'numéro', 'livraison', 'produit', 'appareil') },
      { label: 'وصفت المشكلة (retard، endommagé، ne fonctionne pas…)', test: w('retard', 'endommagé', 'abîmé', 'défectueux', 'ne fonctionne pas', 'cassé') },
      { label: 'طلبت حلاً (remboursement، remplacement…)', test: w('remboursement', 'rembours', 'remplacement', 'échange', 'je vous demande', 'je réclame') },
      { label: 'أسلوب رسمي (veuillez، je vous prie…)', test: w('veuillez', 'je vous prie', 'je vous serais reconnaissant', 'je vous serais reconnaissante', 'vous voudrez bien') },
      { label: 'عبارة ختام رسمية (Veuillez agréer…)', test: w('veuillez agréer', 'salutations distinguées', 'sincères salutations', 'respectueuses salutations') },
    ],
    phrases: [
      { fr: "Je vous écris pour vous faire part de mon mécontentement.", ar: 'أكتب إليكم لأعبّر عن استيائي.' },
      { fr: "À l'ouverture du colis, j'ai constaté que l'appareil était endommagé.", ar: 'عند فتح الطرد لاحظت أن الجهاز تالف.' },
      { fr: 'Je vous demande de procéder au remplacement ou au remboursement.', ar: 'أطلب منكم استبداله أو رد ثمنه.' },
      { fr: 'Veuillez agréer, Madame, Monsieur, mes salutations distinguées.', ar: 'تفضلوا بقبول فائق الاحترام.' },
    ],
    model:
      "Madame, Monsieur, je vous écris pour vous faire part de mon mécontentement. Le 3 novembre, j'ai passé la commande numéro 45872 sur votre site internet : il s'agissait d'une machine à café. Le colis devait être livré sous cinq jours, mais je l'ai reçu avec deux semaines de retard. De plus, à l'ouverture, j'ai constaté que l'appareil était endommagé et qu'il ne fonctionnait pas. J'ai contacté votre service client à deux reprises, mais personne n'a pu m'apporter de solution. Cette situation est d'autant plus regrettable que j'ai toujours été satisfait de vos services. Par conséquent, je vous demande de bien vouloir procéder au remplacement de l'appareil ou, à défaut, à son remboursement intégral. Je joins à ce courrier la facture ainsi que des photographies du produit afin de vous permettre de vérifier mes propos. Je vous serais reconnaissant de me répondre dans un délai de huit jours. Dans l'attente de votre réponse, veuillez agréer, Madame, Monsieur, mes salutations distinguées. Sophie Lambert.",
    notes: ['الأسلوب رسمي: vous دائماً، وصيغ مثل «je vous serais reconnaissant».', 'رتّب الرسالة: الطلب ← المشكلة ← ما فعلته ← المطلوب ← المهلة ← الخاتمة.'],
  },
];

export const WRITING_BY_ID = Object.fromEntries(WRITING_TASKS.map((t) => [t.id, t]));
export const WRITING_XP = 10;

// ---- analyse ----

export const countWords = (text) =>
  (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;

export function analyze(task, text) {
  const words = countWords(text);
  const sentences = text.split(/[.!?…]+/).filter((s) => /\p{L}/u.test(s)).length;
  const hasAccent = /[àâçéèêëîïôùûüœ]/i.test(text);

  return {
    words,
    sentences,
    lengthStatus: words < task.min ? 'short' : words > task.max ? 'long' : 'ok',
    checks: task.checks.map((c) => ({ label: c.label, ok: c.test.test(text) })),
    missingAccents: words >= 30 && !hasAccent,
    connectorsUsed: CONNECTORS.test(text),
  };
}
