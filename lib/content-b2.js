// Contenu additionnel B2 : 8 leçons + 3 quiz + 4 phrases d'écoute. Fusionné dans lib/data.js.

export const B2_LESSONS = [
  {
    id: 'voix-passive',
    category: 'grammar',
    level: 'B2',
    title: 'La voix passive',
    titleAr: 'المبني للمجهول',
    description: 'être + اسم المفعول، ومتى نفضّله على المبني للمعلوم.',
    xp: 40,
    quizId: 'quiz-b2-grammaire',
    intro:
      'في المبني للمجهول يصبح المفعول فاعل الجملة. نكوّنه بـ être (بنفس زمن الفعل الأصلي) + اسم المفعول (participe passé) يتفق مع الفاعل.',
    rules: [
      {
        title: 'التكوين',
        body:
          'الفعل être يتصرف بالزمن المطلوب، واسم المفعول يتفق مع الفاعل في الجنس والعدد. الفاعل الحقيقي يأتي بعد par (أو de).',
        examples: [
          { fr: 'Le gâteau est mangé par les enfants.', ar: 'الكعكة تؤكل من الأطفال.' },
          { fr: 'La lettre a été écrite hier.', ar: 'كُتبت الرسالة أمس.' },
          { fr: 'Les résultats seront annoncés demain.', ar: 'ستُعلن النتائج غداً.' },
        ],
      },
      {
        title: 'متى نستعمله؟',
        body:
          'نستعمله حين لا يهم الفاعل أو لا نعرفه، وفي الأخبار والنصوص الرسمية. وإن أمكن، تحوّل الجملة بـ on إلى مبني للمعلوم.',
        examples: [
          { fr: 'Le musée a été fermé pour travaux.', ar: 'أُغلق المتحف بسبب أشغال.' },
          { fr: 'On a fermé le musée. (= actif)', ar: 'أغلقوا المتحف.' },
        ],
      },
      {
        title: 'ملاحظة',
        body:
          'لا نكوّن المبني للمجهول إلا مع أفعال تأخذ مفعولاً مباشراً. ولا نقول « Il est téléphoné par… » لأن téléphoner à شخص بمفعول غير مباشر.',
        examples: [{ fr: 'Ce film est vu par des millions de personnes.', ar: 'يشاهد هذا الفيلم ملايين الناس.' }],
      },
    ],
  },
  {
    id: 'concordance-temps',
    category: 'grammar',
    level: 'B2',
    title: 'La concordance des temps',
    titleAr: 'توافق الأزمنة',
    description: 'كيف نختار الأزمنة في الجمل المركبة والكلام المنقول.',
    xp: 40,
    quizId: 'quiz-b2-grammaire',
    intro: 'الزمن في الجملة الفرعية يتحدد بزمن الجملة الرئيسية، وبالعلاقة الزمنية بين الحدثين.',
    rules: [
      {
        title: 'الرئيسية في الماضي',
        body:
          'سابق للفعل الرئيسي → plus-que-parfait. مواز → imparfait. لاحق → conditionnel.',
        examples: [
          { fr: "Il a dit qu'il avait fini.", ar: 'قال إنه كان قد انتهى.' },
          { fr: "Il a dit qu'il finissait.", ar: 'قال إنه ينتهي.' },
          { fr: "Il a dit qu'il finirait demain.", ar: 'قال إنه سينتهي غداً.' },
        ],
      },
      {
        title: 'الرئيسية في الحاضر',
        body: 'سابق → passé composé. مواز → présent. لاحق → futur.',
        examples: [
          { fr: "Je pense qu'elle est arrivée.", ar: 'أظن أنها وصلت.' },
          { fr: "Je pense qu'elle arrivera demain.", ar: 'أظن أنها ستصل غداً.' },
        ],
      },
      {
        title: 'جمل si في الماضي',
        body: 'si + plus-que-parfait → conditionnel passé (نادم أو افتراض مستحيل).',
        examples: [{ fr: "Si j'avais su, je serais venu.", ar: 'لو علمت لجئت.' }],
      },
    ],
  },
  {
    id: 'subjonctif-indicatif',
    category: 'grammar',
    level: 'B2',
    title: 'Subjonctif ou indicatif ?',
    titleAr: 'متى subjonctif ومتى indicatif؟',
    description: 'اختيار الصيغة بعد أفعال الرأي والشعور وأدوات الربط.',
    xp: 40,
    quizId: 'quiz-b2-grammaire',
    intro:
      'القاعدة المبسطة: indicatif للواقع واليقين، وsubjonctif للرغبة والشك والشعور والضرورة.',
    rules: [
      {
        title: 'أفعال الرأي: الإثبات والنفي',
        body:
          'je pense / je crois / je trouve que + indicatif (إثبات). أما في النفي والاستفهام فنستعمل غالباً subjonctif: je ne pense pas que + subjonctif.',
        examples: [
          { fr: 'Je pense qu\'il viendra.', ar: 'أظن أنه سيأتي.' },
          { fr: "Je ne pense pas qu'il vienne.", ar: 'لا أظن أنه سيأتي.' },
        ],
      },
      {
        title: 'يتطلب subjonctif',
        body:
          'il faut que، vouloir que، avoir peur que، être content que، pour que، bien que، avant que، à condition que.',
        examples: [
          { fr: 'Il faut que tu partes.', ar: 'يجب أن تغادر.' },
          { fr: 'Bien qu\'il pleuve, nous sortons.', ar: 'رغم أنها تمطر نخرج.' },
          { fr: 'Je suis content que tu sois là.', ar: 'أنا مسرور لأنك هنا.' },
        ],
      },
      {
        title: 'يتطلب indicatif',
        body: 'parce que، puisque، pendant que، après que، alors que، il est évident que، je sais que.',
        examples: [
          { fr: 'Je sais que tu es occupé.', ar: 'أعلم أنك مشغول.' },
          { fr: 'Après qu\'il est parti, nous avons mangé.', ar: 'بعد أن غادر أكلنا.' },
        ],
      },
    ],
  },
  {
    id: 'nominalisation',
    category: 'grammar',
    level: 'B2',
    title: 'La nominalisation',
    titleAr: 'الصياغة الاسمية (أسلوب رسمي)',
    description: 'تحويل الفعل إلى اسم لنصوص أكثر رسمية وإيجازاً.',
    xp: 35,
    quizId: 'quiz-b2-style',
    intro: 'في الكتابة الرسمية نفضّل الأسماء على الأفعال لنكتب بإيجاز وقوة.',
    vocab: [
      { fr: 'arriver → l\'arrivée', ar: 'يصل → الوصول' },
      { fr: 'décider → la décision', ar: 'يقرر → القرار' },
      { fr: 'augmenter → l\'augmentation', ar: 'يزداد → الزيادة' },
      { fr: 'réduire → la réduction', ar: 'يقلل → التقليل' },
      { fr: 'développer → le développement', ar: 'يطوّر → التطوير' },
      { fr: 'participer → la participation', ar: 'يشارك → المشاركة' },
      { fr: 'réagir → la réaction', ar: 'يتفاعل → التفاعل' },
    ],
    rules: [
      {
        title: 'من الجملة إلى العبارة',
        body: 'نستبدل الجملة الفرعية باسم: « Quand il est arrivé, … » → « À son arrivée, … ».',
        examples: [
          { fr: "Les prix ont augmenté, ce qui inquiète les consommateurs. → L'augmentation des prix inquiète les consommateurs.", ar: 'ارتفاع الأسعار يقلق المستهلكين.' },
          { fr: 'Il a décidé de partir. → Sa décision de partir…', ar: 'قراره بالمغادرة…' },
        ],
      },
    ],
  },
  {
    id: 'relatifs-composes',
    category: 'grammar',
    level: 'B2',
    title: 'Les pronoms relatifs composés',
    titleAr: 'الضمائر الموصولة المركبة',
    description: 'lequel، auquel، duquel وبقية الأشكال بعد حروف الجر.',
    xp: 40,
    quizId: 'quiz-b2-grammaire',
    intro:
      'بعد حرف جر (avec, pour, sans, dans…) مع شيء غير حي نستعمل lequel / laquelle / lesquels / lesquelles. ومع à تصبح auquel / à laquelle / auxquels / auxquelles.',
    rules: [
      {
        title: 'أشكال lequel',
        body: 'lequel (مذكر مفرد)، laquelle (مؤنث مفرد)، lesquels (مذكر جمع)، lesquelles (مؤنث جمع). مع الأشخاص نستعمل غالباً qui بعد حرف الجر.',
        examples: [
          { fr: "Voici la clé avec laquelle j'ouvre la porte.", ar: 'هذا هو المفتاح الذي أفتح به الباب.' },
          { fr: "C'est le projet pour lequel il travaille.", ar: 'هذا هو المشروع الذي يعمل من أجله.' },
          { fr: "L'ami avec qui je voyage est français.", ar: 'الصديق الذي أسافر معه فرنسي.' },
        ],
      },
      {
        title: 'à + lequel',
        body: 'à + lequel = auquel، à + lesquels = auxquels، à + lesquelles = auxquelles. وللمؤنث المفرد: à laquelle.',
        examples: [
          { fr: "C'est une question à laquelle je n'ai pas répondu.", ar: 'هذا سؤال لم أجب عنه.' },
          { fr: 'Les problèmes auxquels nous faisons face sont graves.', ar: 'المشكلات التي نواجهها خطيرة.' },
        ],
      },
    ],
  },
  {
    id: 'cause-consequence-but',
    category: 'grammar',
    level: 'B2',
    title: 'Cause, conséquence et but',
    titleAr: 'السبب والنتيجة والغاية',
    description: 'أدوات الربط ومعها الصيغة المناسبة (indicatif أو subjonctif).',
    xp: 40,
    quizId: 'quiz-b2-style',
    intro: 'ثلاث علاقات يجب أن تتقنها في الكتابة والتحدث بمستوى B2.',
    vocab: [
      { fr: 'parce que / car / puisque', ar: 'لأن (سبب)' },
      { fr: 'étant donné que / comme', ar: 'بما أن (سبب)' },
      { fr: 'à cause de + اسم', ar: 'بسبب (سلبي)' },
      { fr: 'grâce à + اسم', ar: 'بفضل (إيجابي)' },
      { fr: 'donc / par conséquent / c\'est pourquoi', ar: 'لذلك (نتيجة)' },
      { fr: 'si bien que / de sorte que', ar: 'بحيث (نتيجة)' },
      { fr: 'pour que / afin que + subjonctif', ar: 'كي (غاية)' },
      { fr: 'afin de / pour + مصدر', ar: 'من أجل (غاية)' },
    ],
    rules: [
      {
        title: 'السبب: مع indicatif',
        body: 'parce que، puisque، étant donné que + indicatif. وبعد à cause de و grâce à نضع اسماً.',
        examples: [
          { fr: "Je suis en retard parce que le bus était bloqué.", ar: 'تأخرت لأن الحافلة كانت متوقفة.' },
          { fr: "Grâce à ton aide, j'ai réussi.", ar: 'بفضل مساعدتك نجحت.' },
        ],
      },
      {
        title: 'الغاية: مع subjonctif',
        body: 'pour que وafin que تأخذان subjonctif. إن كان الفاعل نفسه نستعمل pour أو afin de + مصدر.',
        examples: [
          { fr: 'Je parle lentement pour que tu comprennes.', ar: 'أتكلم ببطء كي تفهم.' },
          { fr: 'Il travaille dur afin de réussir.', ar: 'يعمل بجد كي ينجح.' },
        ],
      },
    ],
  },
  {
    id: 'lettre-formelle',
    category: 'vocabulary',
    level: 'B2',
    title: 'La lettre formelle',
    titleAr: 'الرسالة الرسمية',
    description: 'بنية الرسالة وعباراتها الجاهزة للبداية والطلب والختام.',
    xp: 35,
    quizId: 'quiz-b2-style',
    intro: 'الرسائل الرسمية (إدارة، عمل، شكوى) لها بنية ثابتة وعبارات محفوظة.',
    vocab: [
      { fr: 'Madame, Monsieur,', ar: 'السيدة، السيد، (بداية)' },
      { fr: 'Je me permets de vous écrire afin de…', ar: 'أتشرف بمراسلتكم من أجل…' },
      { fr: 'Suite à notre conversation…', ar: 'إثر محادثتنا…' },
      { fr: 'Je vous serais reconnaissant de bien vouloir…', ar: 'أكون ممتناً لو تكرمتم بـ…' },
      { fr: 'Veuillez trouver ci-joint…', ar: 'تجدون طيّه…' },
      { fr: 'Dans l\'attente de votre réponse,', ar: 'في انتظار ردكم،' },
      { fr: 'Veuillez agréer, Madame, Monsieur, mes salutations distinguées.', ar: 'تفضلوا بقبول فائق الاحترام. (ختام)' },
    ],
    rules: [
      {
        title: 'البنية',
        body: '١) مكان وتاريخ. ٢) موضوع الرسالة. ٣) نداء. ٤) المقدمة وسبب الرسالة. ٥) الطلب أو الشرح. ٦) عبارة الانتظار. ٧) التحية الختامية والتوقيع.',
        examples: [
          { fr: "Je me permets de vous écrire afin de demander un rendez-vous. Je vous serais reconnaissant de bien vouloir me proposer une date. Dans l'attente de votre réponse, veuillez agréer, Madame, Monsieur, mes salutations distinguées.", ar: 'نموذج مختصر لرسالة طلب موعد.' },
        ],
      },
      {
        title: 'الأسلوب',
        body: 'نستعمل vous والشرط للتهذيب، ونتجنب الاختصارات (j\'veux) والعامية.',
        examples: [{ fr: 'Pourriez-vous me communiquer les informations nécessaires ?', ar: 'هل يمكنكم تزويدي بالمعلومات اللازمة؟' }],
      },
    ],
  },
  {
    id: 'essai-opinion',
    category: 'vocabulary',
    level: 'B2',
    title: "L'essai d'opinion",
    titleAr: 'مقال الرأي وتنظيم الحجج',
    description: 'مقدمة، حجج، رأي مخالف، خاتمة: بنية مقال من 150 كلمة.',
    xp: 35,
    quizId: 'quiz-b2-style',
    intro: 'مقال رأي جيد في الامتحان يتبع بنية واضحة وروابط تنظم الأفكار.',
    vocab: [
      { fr: 'Tout d\'abord, …', ar: 'أولاً…' },
      { fr: 'En outre, / De plus, …', ar: 'علاوة على ذلك…' },
      { fr: 'Par exemple, …', ar: 'مثلاً…' },
      { fr: 'Certes, … mais …', ar: 'صحيح… لكن…' },
      { fr: 'Cependant, / Toutefois, …', ar: 'ومع ذلك…' },
      { fr: 'En revanche, …', ar: 'في المقابل…' },
      { fr: 'En conclusion, / Pour conclure, …', ar: 'في الخلاصة…' },
    ],
    rules: [
      {
        title: 'البنية',
        body: '١) المقدمة: اعرض الموضوع وموقفك. ٢) الحجة الأولى مع مثال. ٣) الحجة الثانية مع مثال. ٤) الرأي المخالف والرد عليه. ٥) الخاتمة بإعادة الموقف.',
        examples: [
          { fr: "À mon avis, le télétravail est bénéfique. Tout d'abord, il fait gagner du temps. En outre, il améliore l'équilibre de vie. Certes, il peut isoler, mais on peut organiser des rencontres. En conclusion, c'est une solution d'avenir.", ar: 'نموذج مختصر لبنية المقال.' },
        ],
      },
    ],
  },
];

export const B2_QUIZZES = [
  {
    id: 'quiz-b2-grammaire',
    title: 'Grammaire B2',
    titleAr: 'المبني للمجهول والأزمنة وsubjonctif والموصولات',
    level: 'B2',
    category: 'grammar',
    questions: [
      { id: 'nh1', type: 'mcq', prompt: 'حوّل إلى المبني للمجهول: « Les enfants mangent le gâteau. »', options: ['Le gâteau est mangé par les enfants.', 'Le gâteau mange les enfants.', 'Les enfants sont mangés par le gâteau.', 'Le gâteau a mangé par les enfants.'], answer: 0, explanation: 'المفعول يصبح فاعلاً: être + participe + par.' },
      { id: 'nh2', type: 'mcq', prompt: 'La lettre ___ hier. (écrire، مبني للمجهول)', options: ['a été écrite', 'est écrite', 'était écrit', 'a écrit'], answer: 0, explanation: 'passé composé مبني للمجهول: a été + participe متفق مع lettre (مؤنث).' },
      { id: 'nh3', type: 'mcq', prompt: "Il a dit : « J'ai fini. » → Il a dit qu'il ___ fini.", options: ['avait', 'a', 'aura', 'avait eu'], answer: 0, explanation: 'passé composé → plus-que-parfait في الكلام المنقول الماضي.' },
      { id: 'nh4', type: 'mcq', prompt: "Si j'avais su, je ___ venu.", options: ['serais', 'suis', 'étais', 'serai'], answer: 0, explanation: 'si + plus-que-parfait → conditionnel passé: je serais venu.' },
      { id: 'nh5', type: 'mcq', prompt: "Je ne pense pas qu'il ___ la réponse.", options: ['connaisse', 'connaît', 'connaîtra', 'connaissait'], answer: 0, explanation: 'je ne pense pas que + subjonctif.' },
      { id: 'nh6', type: 'mcq', prompt: 'Je pense qu\'il ___ demain.', options: ['viendra', 'vienne', 'venir', 'viendrait'], answer: 0, explanation: 'je pense que في الإثبات + indicatif.' },
      { id: 'nh7', type: 'mcq', prompt: 'Bien qu\'il ___ fatigué, il travaille.', options: ['soit', 'est', 'sera', 'serait'], answer: 0, explanation: 'bien que + subjonctif.' },
      { id: 'nh8', type: 'fill', prompt: 'La clé avec ___ j\'ouvre la porte. (laquelle / lequel)', answer: 'laquelle', hint: 'clé مؤنث مفرد', explanation: 'avec + laquelle لأن clé مؤنث.' },
      { id: 'nh9', type: 'mcq', prompt: "C'est une question ___ je n'ai pas répondu.", options: ['à laquelle', 'à lequel', 'auxquelles', 'duquel'], answer: 0, explanation: 'répondre à + question (مؤنث): à laquelle.' },
      { id: 'nh10', type: 'mcq', prompt: 'Après qu\'il ___ parti, nous avons mangé.', options: ['est', 'soit', 'serait', 'sera'], answer: 0, explanation: 'après que + indicatif.' },
    ],
  },
  {
    id: 'quiz-b2-style',
    title: 'Écrire et argumenter (B2)',
    titleAr: 'الكتابة الرسمية والحجة والسبب والنتيجة',
    level: 'B2',
    category: 'vocabulary',
    questions: [
      { id: 'ni1', type: 'mcq', prompt: 'الصياغة الاسمية لـ « Quand il est arrivé, … » :', options: ["À son arrivée, …", 'Son arriver, …', 'Il arrive, …', 'Pour arriver, …'], answer: 0, explanation: 'arriver → l’arrivée.' },
      { id: 'ni2', type: 'mcq', prompt: 'Le nom de « décider » :', options: ['la décision', 'le décidé', 'la décider', 'le décidement'], answer: 0, explanation: 'décider → la décision.' },
      { id: 'ni3', type: 'mcq', prompt: '___ ton aide, j’ai réussi. (بفضل)', options: ['Grâce à', 'À cause de', 'Parce que', 'Puisque'], answer: 0, explanation: 'grâce à + اسم للسبب الإيجابي.' },
      { id: 'ni4', type: 'mcq', prompt: 'Je parle lentement pour que tu ___.', options: ['comprennes', 'comprends', 'comprendras', 'comprenais'], answer: 0, explanation: 'pour que + subjonctif.' },
      { id: 'ni5', type: 'mcq', prompt: 'Il travaille dur ___ réussir.', options: ['afin de', 'afin que', 'parce que', 'bien que'], answer: 0, explanation: 'نفس الفاعل → afin de + مصدر.' },
      { id: 'ni6', type: 'mcq', prompt: 'ما العبارة المناسبة لختام رسالة رسمية؟', options: ['Veuillez agréer, Madame, Monsieur, mes salutations distinguées.', 'Bisous !', 'À plus !', 'Salut, ciao.'], answer: 0, explanation: 'هي التحية الرسمية المعتادة.' },
      { id: 'ni7', type: 'mcq', prompt: 'أي عبارة تفتح رسالة رسمية؟', options: ['Madame, Monsieur,', 'Coucou !', 'Salut à tous', 'Cher ami,'], answer: 0, explanation: 'نبدأ بـ Madame, Monsieur عند عدم معرفة المرسل إليه.' },
      { id: 'ni8', type: 'mcq', prompt: 'عبارة تفتح خاتمة المقال:', options: ['En conclusion, …', 'D’abord, …', 'Par exemple, …', 'Au début, …'], answer: 0, explanation: 'en conclusion للخاتمة.' },
    ],
  },
];

export const B2_LISTENING = [
  { id: 'l45', fr: "Le projet a été approuvé par le conseil municipal.", ar: 'وافق المجلس البلدي على المشروع.' },
  { id: 'l46', fr: "Je ne pense pas qu'il puisse venir ce soir.", ar: 'لا أظن أنه يستطيع المجيء الليلة.' },
  { id: 'l47', fr: "Si j'avais su, je serais venu plus tôt.", ar: 'لو علمت لجئت باكراً.' },
  { id: 'l48', fr: "Je me permets de vous écrire afin de demander un rendez-vous.", ar: 'أتشرف بمراسلتكم لطلب موعد.' },
];
