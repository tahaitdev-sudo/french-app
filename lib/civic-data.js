// Examen civique : 40 questions originales d'entraînement (QCM).
// ⚠ Ce ne sont PAS les questions officielles. Vérifiez les faits avec le « livret du citoyen »
// et les sites officiels (service-public.fr) avant l'examen.

export const CIVIC_PASS_RATIO = 0.8; // 32 bonnes réponses sur 40

// Une question : c(thème, énoncé, bonne réponse, ...mauvaises réponses, explication)
const c = (id, theme, prompt, correct, w1, w2, w3, explanation) => ({
  id,
  theme,
  type: 'mcq',
  prompt,
  options: [correct, w1, w2, w3],
  answer: 0, // la bonne réponse est toujours en premier ; mélangée à l'exécution
  explanation,
});

export const CIVIC_THEMES = {
  principes: 'المبادئ والقيم',
  institutions: 'المؤسسات',
  histoire: 'التاريخ',
  culture: 'الثقافة',
  geo: 'الجغرافيا',
  vie: 'الحياة العملية والحقوق',
};

export const CIVIC_QUESTIONS = [
  /* ---------------- Principes et valeurs ---------------- */
  c('cv1', 'principes', 'ما شعار الجمهورية الفرنسية؟', 'Liberté, Égalité, Fraternité', 'Travail, Famille, Patrie', 'Unité, Force, Progrès', 'Paix, Justice, Honneur', 'الشعار هو «حرية، مساواة، إخاء» وهو منقوش في الدستور.'),
  c('cv2', 'principes', 'متى العيد الوطني الفرنسي؟', 'Le 14 juillet', 'Le 1er mai', 'Le 11 novembre', 'Le 8 mai', 'العيد الوطني هو 14 يوليو.'),
  c('cv3', 'principes', 'ما النشيد الوطني لفرنسا؟', 'La Marseillaise', 'Le Chant des partisans', 'La Marche impériale', "L'Hymne à la joie", 'النشيد الوطني هو La Marseillaise.'),
  c('cv4', 'principes', 'ما ألوان العلم الفرنسي؟', 'Bleu, blanc, rouge', 'Rouge, blanc, vert', 'Bleu, jaune, rouge', 'Noir, blanc, rouge', 'العلم ثلاثي الألوان: أزرق وأبيض وأحمر.'),
  c('cv5', 'principes', 'ما معنى مبدأ العلمانية (laïcité)؟', "La séparation des Églises et de l'État", "L'interdiction de toute religion", "L'obligation de pratiquer une religion", "Une religion officielle de l'État", 'العلمانية تعني فصل الكنائس عن الدولة (قانون 1905)، وحرية المعتقد مكفولة.'),
  c('cv6', 'principes', 'من أي سن يمكن للمواطن الفرنسي أن ينتخب؟', '18 ans', '16 ans', '21 ans', '25 ans', 'سن الاقتراع والرشد المدني هو 18 سنة.'),
  c('cv7', 'principes', 'من أي سن التعليم إلزامي في فرنسا؟', '3 ans', '5 ans', '6 ans', '7 ans', 'التعليم إلزامي من 3 سنوات (ومجاني ولا ديني).'),
  c('cv8', 'principes', 'ما الذي يضمنه مبدأ المساواة؟', 'Les mêmes droits pour tous, sans discrimination', "Le même salaire pour tous", "Le droit de ne pas payer d'impôts", 'Le même métier pour tous', 'المساواة أمام القانون، والتمييز ممنوع.'),

  /* ---------------- Institutions ---------------- */
  c('ci1', 'institutions', 'كم مدة ولاية رئيس الجمهورية؟', '5 ans', '4 ans', '6 ans', '7 ans', 'الولاية 5 سنوات (quinquennat).'),
  c('ci2', 'institutions', 'كم ولاية متتالية كحد أقصى يمكن أن يتولاها الرئيس؟', 'Deux', 'Une', 'Trois', 'Illimitée', 'الحد الأقصى ولايتان متتاليتان.'),
  c('ci3', 'institutions', 'كيف يُنتخب رئيس الجمهورية؟', 'Au suffrage universel direct', 'Par les sénateurs', 'Par le Premier ministre', "Par les maires", 'ينتخبه المواطنون مباشرة بالاقتراع العام.'),
  c('ci4', 'institutions', 'كم عدد النواب في الجمعية الوطنية؟', '577', '348', '100', '650', 'للجمعية الوطنية 577 نائباً.'),
  c('ci5', 'institutions', 'كيف يُنتخب أعضاء مجلس الشيوخ؟', 'Au suffrage indirect', 'Au suffrage universel direct', 'Ils sont nommés par le Président', 'Par tirage au sort', 'الشيوخ ينتخبهم «كبار الناخبين» (اقتراع غير مباشر).'),
  c('ci6', 'institutions', 'من يعيّن رئيس الوزراء؟', 'Le Président de la République', "L'Assemblée nationale", 'Le Sénat', 'Les citoyens', 'رئيس الجمهورية يعيّن رئيس الوزراء.'),
  c('ci7', 'institutions', 'في أي سنة اعتُمد دستور الجمهورية الخامسة؟', '1958', '1789', '1905', '1946', 'الدستور الحالي منذ 1958.'),
  c('ci8', 'institutions', 'من ينتخب العمدة (le maire)؟', 'Le conseil municipal', 'Le préfet', 'Le Président', 'Le Sénat', 'ينتخب المجلس البلدي العمدة.'),

  /* ---------------- Histoire ---------------- */
  c('ch1', 'histoire', 'في أي سنة صدر إعلان حقوق الإنسان والمواطن؟', '1789', '1815', '1905', '1944', 'الإعلان صدر عام 1789 خلال الثورة الفرنسية.'),
  c('ch2', 'histoire', 'أي حدث وقع يوم 14 يوليو 1789؟', 'La prise de la Bastille', "L'appel du 18 juin", "L'armistice", 'Le sacre de Napoléon', 'اقتحام سجن الباستيل.'),
  c('ch3', 'histoire', 'في أي سنة حصلت المرأة الفرنسية على حق التصويت (بمرسوم)؟', '1944', '1789', '1905', '1981', 'المرسوم صدر عام 1944 وطُبّق في انتخابات 1945.'),
  c('ch4', 'histoire', 'ماذا حدث يوم 18 يونيو 1940؟', "L'appel du général de Gaulle", "La fin de la guerre", "La prise de la Bastille", 'La fête de la musique', 'نداء الجنرال ديغول من لندن للمقاومة.'),
  c('ch5', 'histoire', 'ماذا نحيي يوم 8 مايو؟', 'La victoire de 1945', "L'armistice de 1918", 'La fête du travail', 'La fête nationale', 'الاحتفال بنهاية الحرب العالمية الثانية في أوروبا (1945).'),
  c('ch6', 'histoire', 'ماذا نحيي يوم 11 نوفمبر؟', "L'armistice de 1918", 'La victoire de 1945', "L'abolition de l'esclavage", 'La Révolution', 'هدنة 1918 التي أنهت الحرب العالمية الأولى.'),
  c('ch7', 'histoire', 'أي قانون أصدره نابليون بونابرت عام 1804؟', 'Le Code civil', 'La Constitution de 1958', "La loi de 1905", "La Déclaration des droits de l'homme", 'القانون المدني (Code Napoléon) عام 1804.'),
  c('ch8', 'histoire', 'أي ملك يُلقّب «الملك الشمس» وبنى قصر فرساي؟', 'Louis XIV', 'Louis XVI', 'Napoléon', 'Charlemagne', 'لويس الرابع عشر.'),
  c('ch9', 'histoire', 'في أي سنة أُلغيت عقوبة الإعدام في فرنسا؟', '1981', '1958', '1944', '2000', 'أُلغيت عام 1981 بفضل روبير بادنتير.'),

  /* ---------------- Culture ---------------- */
  c('cc1', 'culture', 'لأي حدث بُني برج إيفل؟', 'Exposition universelle de 1889', 'Les Jeux olympiques', 'La fête nationale', 'Le mariage du roi', 'بُني للمعرض العالمي عام 1889.'),
  c('cc2', 'culture', 'من كتب رواية «البؤساء» (Les Misérables)؟', 'Victor Hugo', 'Molière', 'Voltaire', 'Albert Camus', 'فيكتور هوغو.'),

  /* ---------------- Géographie ---------------- */
  c('cg1', 'geo', 'كم عدد المناطق (régions) في فرنسا الأوروبية؟', '13', '18', '22', '8', 'منذ 2016: 13 منطقة في فرنسا الأم.'),
  c('cg2', 'geo', 'ما أطول نهر في فرنسا؟', 'La Loire', 'La Seine', 'Le Rhône', 'La Garonne', 'نهر اللوار هو الأطول.'),
  c('cg3', 'geo', 'ما أعلى قمة في جبال الألب الفرنسية؟', 'Le Mont Blanc', 'Le Puy de Dôme', 'Le Canigou', 'Le Mont Ventoux', 'مون بلان.'),
  c('cg4', 'geo', 'أي بحر يقع جنوب فرنسا؟', 'La Méditerranée', 'La mer du Nord', 'La Manche', "L'océan Indien", 'البحر الأبيض المتوسط.'),
  c('cg5', 'geo', 'أي بلد ليس جاراً لفرنسا؟', 'Le Portugal', "L'Espagne", "L'Italie", "L'Allemagne", 'البرتغال لا تشترك في حدود برية مع فرنسا.'),
  c('cg6', 'geo', 'أي من هذه أقاليم ما وراء البحار (DOM)؟', 'La Martinique', 'La Corse', 'La Bretagne', 'La Savoie', 'المارتينيك إقليم فرنسي ما وراء البحار.'),

  /* ---------------- Vie pratique et droits ---------------- */
  c('cp1', 'vie', 'ما رقم الإطفاء (pompiers) في فرنسا؟', '18', '17', '15', '19', '18 الإطفاء، 17 الشرطة، 15 الإسعاف (SAMU)، 112 الرقم الأوروبي.'),
  c('cp3', 'vie', 'ما واجب الشاب الفرنسي في سن 16؟', 'Se faire recenser à la mairie', 'Passer le permis de conduire', 'Voter', 'Faire son service militaire', 'التسجيل (recensement) في البلدية، ثم يوم الدفاع والمواطنة.'),
  c('cp4', 'vie', 'أي واجب هو من واجبات المواطن؟', 'Payer ses impôts', 'Voter obligatoirement', 'Porter un uniforme', 'Participer à un parti politique', 'احترام القانون ودفع الضرائب من الواجبات.'),
  c('cp5', 'vie', 'ما فائدة البطاقة الحيوية (carte Vitale)؟', "Se faire rembourser les soins de santé", 'Voter', 'Prendre le train', 'Ouvrir un compte bancaire', 'تُستعمل لاسترداد نفقات العلاج.'),
  c('cp6', 'vie', 'ماذا يعني SMIC ؟', 'Le salaire minimum légal', 'Un diplôme', 'Une assurance', 'Un impôt', 'الحد الأدنى القانوني للأجور.'),
  c('cp7', 'vie', 'ماذا يعني CDI ؟', 'Contrat à durée indéterminée', 'Carte de dépôt international', 'Certificat de droit individuel', 'Contrat de dix ans', 'عقد عمل غير محدد المدة.'),
  c('cp8', 'vie', 'أين يُسجَّل الزواج المدني؟', 'À la mairie', "À l'église", 'Au tribunal', 'À la préfecture', 'الزواج المدني يتم في البلدية، وهو وحده المعترف به قانونياً.'),
];

export const CIVIC_COUNT = CIVIC_QUESTIONS.length;

// Mélange les options (Fisher-Yates) et retrouve l'index de la bonne réponse.
export function shuffleQuestion(q) {
  const options = [...q.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...q, options, answer: options.indexOf(q.options[0]) };
}

export function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
