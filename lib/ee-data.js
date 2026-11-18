// Expression écrite — format TCF IRN (fiche France Compétences RS6643, 30 min, 3 tâches) :
//  Tâche 1 : rédiger un message pour décrire un objet, en réaction à une question
//  Tâche 2 : rédiger un récit d'activités sociales et professionnelles, selon un objectif précis
//  Tâche 3 : donner son avis
// Sujets ORIGINAUX. Les longueurs min/max sont INDICATIVES (non précisées sur la fiche).
import { PASSE_COMPOSE, w } from './writing-data';

export const EE_TASK_TYPES = {
  1: { label: 'المهمة 1', desc: 'وصف شيء في رسالة ردّاً على سؤال', min: 40, max: 80 },
  2: { label: 'المهمة 2', desc: 'سرد أنشطة اجتماعية ومهنية لهدف محدد', min: 70, max: 130 },
  3: { label: 'المهمة 3', desc: 'إبداء رأيك', min: 80, max: 160 },
};

const COLOR = w('bleu', 'vert', 'noir', 'gris', 'rouge', 'blanc', 'beige', 'marron', 'jaune', 'violet', 'rose', 'couleur');
const POLITE = w('cordialement', 'merci', 'bonne journée', 'à bientôt', "d'avance", 'bien à vous');
const PRICE = /(euros?|€|prix|budget|payé|coûte)/iu;
const TIME = w('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'hier', 'ensuite', 'puis', "d'abord", 'la semaine', 'le matin', "l'après-midi", 'le soir');
const OPINION = w('à mon avis', 'je pense', 'selon moi', 'personnellement', 'je crois', 'je suis pour', 'je suis contre', 'je préfère', 'je suis favorable');
const ARGUMENT = w('premièrement', 'deuxièmement', "d'abord", "tout d'abord", 'de plus', 'en outre', 'ensuite', "d'un côté", "d'un autre côté", 'par exemple');
const CONTRAST = w('cependant', 'toutefois', 'certes', 'pourtant', 'mais', 'bien sûr', 'néanmoins', "d'un autre côté");
const CONCLUSION = w('en conclusion', 'pour conclure', 'par conséquent', 'donc', 'finalement', 'en résumé');
const GREETING = w('bonjour', 'salut', 'chers', 'cher', 'chère', 'madame', 'monsieur');

const phrases1 = [
  { fr: 'Il est de couleur…', ar: 'لونه…' },
  { fr: 'Il est assez grand / petit.', ar: 'هو كبير / صغير نوعاً ما.' },
  { fr: "Il est en bon état.", ar: 'هو في حالة جيدة.' },
  { fr: 'Il a une particularité : …', ar: 'له علامة مميزة: …' },
];
const phrases2 = [
  { fr: "D'abord… puis… ensuite… enfin…", ar: 'أولاً… ثم… بعد ذلك… وأخيراً…' },
  { fr: "J'ai rencontré / j'ai participé à…", ar: 'التقيت بـ / شاركت في…' },
  { fr: "C'était une expérience très positive.", ar: 'كانت تجربة إيجابية جداً.' },
  { fr: "Je vous écris pour vous raconter…", ar: 'أكتب لك لأروي لك…' },
];
const phrases3 = [
  { fr: 'À mon avis, … / Selon moi, …', ar: 'في رأيي… / بحسب رأيي…' },
  { fr: "D'abord… De plus… Cependant…", ar: 'أولاً… وأيضاً… لكن…' },
  { fr: 'Par exemple, …', ar: 'على سبيل المثال…' },
  { fr: 'En conclusion, …', ar: 'في الخلاصة…' },
];

const RAW_TASKS = [
  /* ---------------------------- Tâche 1 ---------------------------- */
  {
    id: 'e1a', type: 1, title: 'حقيبة ضائعة',
    prompt: "Vous avez perdu votre sac à dos dans le bus. Le service des objets trouvés vous écrit : « Pouvez-vous décrire votre sac et son contenu ? » Répondez par un message.",
    instructions: 'صف حقيبتك: اللون والحجم والحالة والمحتويات وعلامة مميزة.',
    checks: [
      { label: 'ذكرت اللون', test: COLOR },
      { label: 'ذكرت الحجم أو الحالة', test: w('grand', 'petit', 'moyen', 'usé', 'neuf', 'état', 'léger', 'lourd') },
      { label: 'ذكرت المحتويات', test: w('dedans', "à l'intérieur", 'contient', 'il y a', 'dans le sac') },
      { label: 'ختمت بصيغة مهذبة', test: POLITE },
    ],
    phrases: phrases1,
    model: "Bonjour, mon sac à dos est de couleur bleu foncé et il est assez grand. Il est un peu usé, avec une fermeture éclair cassée sur la poche avant. À l'intérieur, il y a un ordinateur portable gris, un cahier rouge, ma carte d'étudiant et une bouteille d'eau. Un petit porte-clés en forme de tour Eiffel est accroché à la poche. Pouvez-vous me dire si vous l'avez trouvé ? Merci beaucoup, cordialement.",
    notes: ['اذكر التفاصيل التي تميّز الشيء عن غيره.', 'ابدأ بتحية وانهِ بشكر.'],
  },
  {
    id: 'e1b', type: 1, title: 'بيع دراجة',
    prompt: "Vous vendez votre vélo sur un site d'annonces. Un acheteur vous écrit : « Pouvez-vous me décrire le vélo et dire son prix ? » Répondez à son message.",
    instructions: 'صف الدراجة: اللون والعمر والحالة والسعر.',
    checks: [
      { label: 'ذكرت اللون', test: COLOR },
      { label: 'ذكرت الحالة أو العمر', test: w('état', 'neuf', 'ans', 'ancien', 'récent', 'usé') },
      { label: 'ذكرت السعر', test: PRICE },
      { label: 'ختمت بصيغة مهذبة', test: POLITE },
    ],
    phrases: phrases1,
    model: "Bonjour, je vends un vélo de ville de couleur verte. Il a cinq ans, mais il est en très bon état. Il est léger, avec un panier à l'avant et une sonnette neuve. Les freins et les pneus ont été changés l'année dernière. Je le vends pour cent cinquante euros. Si vous êtes intéressé, vous pouvez venir l'essayer ce week-end. Cordialement.",
    notes: ['اذكر السعر بوضوح.', 'اقترح خطوة تالية (التجربة أو الموعد).'],
  },
  {
    id: 'e1c', type: 1, title: 'آلة قهوة',
    prompt: "Votre voisin veut acheter une cafetière comme la vôtre. Il vous demande : « Elle est comment ? Tu la conseilles ? » Écrivez-lui un message.",
    instructions: 'صف الآلة: الحجم واللون وطريقة العمل والمزايا والعيوب والسعر.',
    checks: [
      { label: 'وصفت الشكل أو اللون أو الحجم', test: w('petit', 'petite', 'grand', 'grande', 'noir', 'blanc', 'rouge', 'gris', 'taille', 'forme') },
      { label: 'ذكرت طريقة العمل أو المزايا', test: w('fonctionne', 'facile', 'rapide', 'pratique', 'avantage', 'bouton') },
      { label: 'ذكرت عيباً أو رأياً', test: w('défaut', 'inconvénient', 'conseille', 'dommage', 'mais') },
      { label: 'ذكرت السعر', test: PRICE },
    ],
    phrases: phrases1,
    model: "Bonjour Paul, ma cafetière est petite et noire, elle ne prend pas beaucoup de place sur la table. Elle fonctionne avec des capsules, donc c'est très rapide : il suffit d'appuyer sur un bouton. Le café est bon et elle est facile à nettoyer. Le seul défaut, c'est le prix des capsules. Je l'ai payée quatre-vingts euros. Je te la conseille ! À bientôt.",
    notes: ['أجب عن السؤال المباشر: هل تنصح بها؟', 'اذكر ميزة وعيباً.'],
  },
  {
    id: 'e1d', type: 1, title: 'هاتف منسي',
    prompt: "Vous avez oublié votre téléphone dans un café. Le serveur vous écrit : « Pouvez-vous décrire votre téléphone pour que je le reconnaisse ? » Répondez.",
    instructions: 'صف الهاتف بدقة: الماركة واللون والغطاء وأي علامة، وأين نسيته.',
    checks: [
      { label: 'ذكرت اللون أو الماركة', test: w('noir', 'blanc', 'bleu', 'rouge', 'gris', 'couleur', 'marque', 'samsung', 'iphone') },
      { label: 'ذكرت علامة مميزة', test: w('coque', 'rayure', 'fond', 'photo', 'autocollant', 'écran') },
      { label: 'ذكرت المكان أو الوقت', test: w('table', 'hier', 'près de', 'vers', 'heures', 'fenêtre', 'comptoir') },
      { label: 'ختمت بصيغة مهذبة', test: POLITE },
    ],
    phrases: phrases1,
    model: "Bonjour, mon téléphone est un smartphone noir de marque Samsung. Il a une coque transparente avec une photo de ma famille à l'arrière. L'écran a une petite rayure en haut à gauche. Le fond d'écran est une plage au coucher du soleil. Je l'ai oublié sur la table près de la fenêtre, hier vers quinze heures. Pouvez-vous me le garder, s'il vous plaît ? Merci d'avance.",
    notes: ['التفاصيل الصغيرة تثبت أنه ملكك.', 'اطلب شيئاً محدداً في النهاية.'],
  },
  {
    id: 'e1e', type: 1, title: 'أريكة مستعملة',
    prompt: "Vous cherchez un canapé d'occasion. Un vendeur vous demande : « Quel type de canapé cherchez-vous ? » Répondez en décrivant ce que vous voulez.",
    instructions: 'صف الأريكة التي تبحث عنها: الحجم واللون والمادة والحالة والميزانية.',
    checks: [
      { label: 'ذكرت الحجم', test: w('places', 'mètres', 'long', 'grand', 'petit', 'taille') },
      { label: 'ذكرت اللون أو المادة', test: new RegExp(`${COLOR.source}|(?<![\\p{L}])(tissu|cuir)(?![\\p{L}])`, 'iu') },
      { label: 'ذكرت الميزانية', test: PRICE },
      { label: 'ختمت بصيغة مهذبة', test: POLITE },
    ],
    phrases: phrases1,
    model: "Bonjour, je cherche un canapé confortable pour mon salon. Je voudrais un modèle à trois places, d'environ deux mètres de long, de couleur grise ou beige. Je préfère le tissu au cuir, parce qu'il est plus chaleureux. Il doit être en bon état, sans taches. Mon budget est de trois cents euros maximum. Pouvez-vous me proposer quelques modèles ? Merci et bonne journée.",
    notes: ['استعمل «je voudrais» للطلب بأدب.', 'علّل اختيارك بجملة قصيرة.'],
  },

  /* ---------------------------- Tâche 2 ---------------------------- */
  {
    id: 'e2a', type: 2, title: 'أسبوعي الأول في العمل',
    prompt: "Vous venez de commencer un travail. Écrivez à votre responsable, Mme Leroy, pour lui raconter votre première semaine, afin de montrer que vous êtes motivé(e).",
    instructions: 'احكِ ما فعلته يوماً بيوم (لقاءات، مهام، اجتماعات) لتُظهر حماسك.',
    checks: [
      { label: 'استعملت الماضي المركب', test: PASSE_COMPOSE },
      { label: 'نظّمت الأحداث زمنياً', test: TIME },
      { label: 'ذكرت أنشطة مهنية', test: w('équipe', 'réunion', 'client', 'rapport', 'logiciel', 'dossier', 'travail', 'collègues') },
      { label: 'عبّرت عن الحماس أو الهدف', test: w('motivé', 'motivée', 'satisfait', 'satisfaite', 'heureux', 'heureuse', 'espère', 'content', 'contente') },
      { label: 'تحية وختام', test: GREETING },
    ],
    phrases: phrases2,
    model: "Bonjour Madame Leroy, je vous écris pour vous raconter ce que j'ai fait pendant ma première semaine dans l'entreprise. Lundi, j'ai rencontré toute l'équipe et j'ai appris à utiliser le logiciel de gestion. Mardi et mercredi, j'ai aidé les clients au téléphone et j'ai répondu à leurs courriels. Jeudi, j'ai participé à la réunion avec la directrice, et j'ai présenté un petit rapport. Vendredi, j'ai organisé les dossiers du mois. Je suis très motivé, et j'espère que vous serez satisfaite de mon travail. Cordialement.",
    notes: ['استعمل الماضي المركب للأحداث المنتهية.', 'اربط القصة بهدف الرسالة في الخاتمة.'],
  },
  {
    id: 'e2b', type: 2, title: 'يوم تطوعي',
    prompt: "Vous avez passé une journée avec une association de quartier. Écrivez à un ami pour lui raconter cette journée et le convaincre de venir la prochaine fois.",
    instructions: 'احكِ يوم التطوع ثم أقنع صديقك بالمشاركة.',
    checks: [
      { label: 'استعملت الماضي المركب', test: PASSE_COMPOSE },
      { label: 'نظّمت الأحداث زمنياً', test: TIME },
      { label: 'ذكرت أنشطة اجتماعية', test: w('association', 'bénévoles', 'enfants', 'nettoyé', 'aidé', 'rencontré', 'quartier') },
      { label: 'دعوت الصديق للمشاركة', test: w('viens', 'venir', 'prochaine fois', 'rejoins', 'participer') },
    ],
    phrases: phrases2,
    model: "Salut Samir ! Samedi dernier, j'ai passé la journée avec l'association de mon quartier. Le matin, nous avons nettoyé le parc avec une vingtaine de bénévoles, puis nous avons préparé le déjeuner tous ensemble. L'après-midi, j'ai aidé des enfants à faire leurs devoirs et nous avons joué au football. J'ai rencontré beaucoup de gens sympas et j'ai vraiment passé un excellent moment. La prochaine fois, viens avec moi, tu vas adorer ! À bientôt.",
    notes: ['الهدف إقناع صديقك، فاختم بدعوة واضحة.', 'استعمل tu مع الصديق.'],
  },
  {
    id: 'e2c', type: 2, title: 'نشاط البحث عن عمل',
    prompt: "Vous cherchez du travail. Écrivez à votre conseillère pour lui raconter ce que vous avez fait cette semaine, afin de montrer vos efforts.",
    instructions: 'اذكر خطواتك: السيرة الذاتية، الاتصالات، المقابلات، التكوين.',
    checks: [
      { label: 'استعملت الماضي المركب', test: PASSE_COMPOSE },
      { label: 'نظّمت الأحداث زمنياً', test: TIME },
      { label: 'ذكرت خطوات البحث', test: w('cv', 'candidatures', 'lettres', 'entretien', 'appelé', 'envoyé', 'entreprises', 'formation', 'atelier') },
      { label: 'تحية وختام مهذب', test: new RegExp(`${GREETING.source}|${POLITE.source}`, 'iu') },
    ],
    phrases: phrases2,
    model: "Bonjour Madame, voici ce que j'ai fait cette semaine pour trouver du travail. Lundi, j'ai mis à jour mon CV et j'ai écrit trois lettres de motivation. Mardi, j'ai envoyé mes candidatures et j'ai appelé deux entreprises. Mercredi, j'ai passé un entretien dans un supermarché. Jeudi, je suis allé à un atelier sur la préparation aux entretiens. Vendredi, j'ai suivi un cours de français en ligne. Je continue mes recherches et je reste disponible pour un rendez-vous. Cordialement.",
    notes: ['استعمل vous مع المستشارة.', 'بيّن أنك نشيط ومنظّم.'],
  },
  {
    id: 'e2d', type: 2, title: 'حفلة الحي',
    prompt: "Vous avez organisé une fête dans votre immeuble. Écrivez à vos voisins absents pour leur raconter la soirée et leur proposer de participer à la prochaine.",
    instructions: 'احكِ كيف جرت الحفلة، ثم اقترح عليهم المشاركة في التنظيم القادم.',
    checks: [
      { label: 'استعملت الماضي المركب', test: PASSE_COMPOSE },
      { label: 'نظّمت الأحداث زمنياً', test: TIME },
      { label: 'ذكرت أنشطة الحفلة', test: w('fête', 'soirée', 'repas', 'plat', 'musique', 'jeux', 'guitare', 'mangé', 'chanté', 'voisins') },
      { label: 'اقترحت المشاركة', test: w('participer', 'aide', 'année prochaine', 'prochaine fois', 'voulez-vous', 'rejoindre') },
    ],
    phrases: phrases2,
    model: "Chers voisins, vous étiez absents le mois dernier, alors je vous raconte la fête de l'immeuble. Nous avons installé des tables dans la cour, et chaque famille a apporté un plat. Les enfants ont fait des jeux, puis un voisin a joué de la guitare. Nous avons mangé, chanté et parlé jusqu'à minuit. Tout le monde a passé une soirée agréable. L'année prochaine, nous voudrions recommencer, et nous aurons besoin d'aide pour l'organisation. Voulez-vous participer avec nous ? Cordialement.",
    notes: ['استعمل vous مع الجيران.', 'ختام بسؤال يدعو إلى الرد.'],
  },
  {
    id: 'e2e', type: 2, title: 'تبرير تأخر',
    prompt: "Vous avez eu une semaine très chargée (démarches, famille, travail). Écrivez à votre professeur de français pour raconter cette semaine et expliquer pourquoi vous n'avez pas rendu votre devoir.",
    instructions: 'احكِ ما شغلك يوماً بيوم، ثم اعتذر ووعد بموعد جديد.',
    checks: [
      { label: 'استعملت الماضي المركب', test: PASSE_COMPOSE },
      { label: 'نظّمت الأحداث زمنياً', test: TIME },
      { label: 'اعتذرت', test: w('excuse', 'excuser', 'désolé', 'désolée', 'pardon', 'regrette') },
      { label: 'وعدت بتسليم الواجب', test: w('rendrai', 'promets', 'lundi', 'demain', 'prochain') },
    ],
    phrases: phrases2,
    model: "Bonjour Monsieur, je m'excuse pour mon retard dans le devoir. Cette semaine, j'ai été très occupé. Lundi, je suis allé à la mairie pour faire une démarche administrative, et j'ai attendu longtemps. Mardi, j'ai accompagné mon fils chez le médecin. Mercredi, j'ai commencé une formation professionnelle le soir. Jeudi et vendredi, j'ai travaillé jusqu'à tard, donc je n'ai pas eu le temps d'écrire. Je vous rendrai le devoir lundi matin, je vous le promets. Merci de votre compréhension.",
    notes: ['الاعتذار والوعد هما هدف الرسالة.', 'اربط الأسباب بـ «donc» و«parce que».'],
  },

  /* ---------------------------- Tâche 3 ---------------------------- */
  {
    id: 'e3a', type: 3, title: 'الهاتف في المدرسة',
    prompt: "Faut-il limiter l'usage du téléphone portable à l'école ? Donnez votre avis et justifiez-le avec des arguments et des exemples.",
    instructions: 'اعرض رأيك بوضوح مع حجتين ومثال، ثم اختم.',
    checks: opinionChecks(),
    phrases: phrases3,
    model: "À mon avis, il faut limiter l'usage du téléphone portable à l'école. Premièrement, les élèves se concentrent mieux en classe quand ils ne regardent pas leur écran. De plus, le téléphone peut provoquer des problèmes entre élèves, par exemple des moqueries sur les réseaux sociaux. Certes, le portable est utile pour joindre les parents en cas d'urgence. Cependant, cet usage reste rare et l'école peut toujours téléphoner aux familles. En conclusion, je pense qu'il vaut mieux l'interdire pendant les cours, tout en l'autorisant à la sortie de l'école.",
    notes: ['اذكر الرأي المخالف ثم ردّ عليه.', 'ابنِ النص: رأي، حجج، مثال، خاتمة.'],
  },
  {
    id: 'e3b', type: 3, title: 'مواقع التواصل والشباب',
    prompt: "Les réseaux sociaux sont-ils une bonne ou une mauvaise chose pour les jeunes ? Donnez votre avis avec des arguments.",
    instructions: 'اعرض رأيك مع الإيجابيات والسلبيات ثم اختم بموقف واضح.',
    checks: opinionChecks(),
    phrases: phrases3,
    model: "Je pense que les réseaux sociaux ont autant d'avantages que d'inconvénients pour les jeunes. D'un côté, ils permettent de garder le contact avec ses amis et de découvrir des informations. De plus, certains jeunes y trouvent des idées pour leurs études. D'un autre côté, ils font perdre beaucoup de temps et peuvent rendre anxieux, parce qu'on se compare toujours aux autres. Par exemple, beaucoup d'adolescents dorment moins à cause des écrans. Donc, selon moi, il faut limiter le temps passé en ligne et en parler avec ses parents. En conclusion, tout dépend de l'usage que l'on en fait.",
    notes: ['يمكنك أن تتخذ موقفاً وسطاً إن برّرته.', 'استعمل «d\'un côté… d\'un autre côté».'],
  },
  {
    id: 'e3c', type: 3, title: 'المدينة أم الريف',
    prompt: "Préférez-vous vivre en ville ou à la campagne ? Donnez votre avis et expliquez vos raisons.",
    instructions: 'اختر موقفاً واحداً ودافع عنه بحجج وأمثلة.',
    checks: opinionChecks(),
    phrases: phrases3,
    model: "Personnellement, je préfère vivre en ville. Tout d'abord, on y trouve facilement du travail, des écoles et des hôpitaux. En outre, les transports en commun sont nombreux, donc on n'a pas besoin de voiture. Bien sûr, la ville est bruyante et la vie y est plus chère. Cependant, la campagne offre peu de services et on se sent parfois isolé. Par exemple, il faut parfois faire trente kilomètres pour voir un médecin. En conclusion, je choisis la ville, même si je vais souvent à la campagne le week-end pour me reposer.",
    notes: ['اعترف بعيوب اختيارك ثم قلّل من شأنها.', 'مثال واقعي يقوّي الحجة.'],
  },
  {
    id: 'e3d', type: 3, title: 'لغة أجنبية في الطفولة',
    prompt: "Faut-il apprendre une langue étrangère dès l'école maternelle ? Donnez votre avis avec des arguments.",
    instructions: 'اعرض رأيك ثم ناقش اعتراضاً محتملاً قبل أن تختم.',
    checks: opinionChecks(),
    phrases: phrases3,
    model: "Selon moi, il est utile d'apprendre une langue étrangère dès la maternelle. D'abord, les jeunes enfants apprennent facilement les sons d'une nouvelle langue. Ensuite, cela leur ouvre l'esprit et leur donne plus de chances pour leur futur métier. On peut objecter que les petits doivent d'abord bien maîtriser leur langue maternelle. C'est vrai, mais jouer et chanter dans une autre langue ne les empêche pas de progresser. Par conséquent, je suis favorable à cette idée, à condition que les cours restent des jeux et ne soient pas trop longs.",
    notes: ['مناقشة اعتراض تُظهر مستوى B2.', 'اربط الحجج بأدوات ربط.'],
  },
  {
    id: 'e3e', type: 3, title: 'مواصلات مجانية',
    prompt: "Les transports en commun devraient-ils être gratuits dans les grandes villes ? Donnez votre avis et justifiez-le.",
    instructions: 'اعرض موقفك مع حجتين وتحفظ واحد ثم اختم.',
    checks: opinionChecks(),
    phrases: phrases3,
    model: "À mon avis, les transports en commun devraient être gratuits dans les grandes villes. Premièrement, cela aiderait les familles qui ont peu d'argent. Deuxièmement, moins de personnes utiliseraient leur voiture, donc il y aurait moins de pollution et d'embouteillages. Toutefois, il faut bien financer le service, et les impôts pourraient augmenter. Ce n'est pas un problème si l'on améliore en même temps la qualité des bus et des métros. En conclusion, je suis pour la gratuité, au moins pour les enfants, les étudiants et les personnes âgées.",
    notes: ['استعمل الشرط (devraient, aiderait) للتعبير عن الفرضية.', 'اقترح حلاً وسطاً في الخاتمة.'],
  },
];

function opinionChecks() {
  return [
    { label: 'عبّرت عن رأيك بوضوح', test: OPINION },
    { label: 'استعملت أدوات لتنظيم الحجج', test: ARGUMENT },
    { label: 'أظهرت تحفظاً أو رأياً مقابلاً', test: CONTRAST },
    { label: 'ختمت بخلاصة', test: CONCLUSION },
  ];
}

export const EE_TASKS = RAW_TASKS.map((t) => ({
  ...t,
  min: EE_TASK_TYPES[t.type].min,
  max: EE_TASK_TYPES[t.type].max,
}));

export const EE_BY_ID = Object.fromEntries(EE_TASKS.map((t) => [t.id, t]));
