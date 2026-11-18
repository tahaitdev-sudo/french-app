// Contenu additionnel B1 : 10 leçons + 4 quiz + 4 phrases d'écoute. Fusionné dans lib/data.js.

export const B1_LESSONS = [
  {
    id: 'conditionnel-present',
    category: 'conjugation',
    level: 'B1',
    title: 'Le conditionnel présent',
    titleAr: 'الشرط (المضارع الشرطي)',
    description: 'للطلب بأدب وإعطاء النصيحة والتعبير عن الرغبة والفرضية.',
    xp: 35,
    quizId: 'quiz-b1-conditionnel',
    intro:
      'نبني الشرط من جذر المستقبل (infinitif أو الجذر الشاذ) مع نهايات الماضي الناقص: -ais, -ais, -ait, -ions, -iez, -aient.',
    conjugation: [
      {
        title: 'parler — Conditionnel',
        meaning: 'سيتكلم / لو تكلم',
        rows: [
          ['je', 'parlerais'],
          ['tu', 'parlerais'],
          ['il / elle', 'parlerait'],
          ['nous', 'parlerions'],
          ['vous', 'parleriez'],
          ['ils / elles', 'parleraient'],
        ],
      },
      {
        title: 'aller — Conditionnel',
        meaning: 'سيذهب / لو ذهب',
        rows: [
          ['j\'', 'irais'],
          ['tu', 'irais'],
          ['il / elle', 'irait'],
          ['nous', 'irions'],
          ['vous', 'iriez'],
          ['ils / elles', 'iraient'],
        ],
      },
    ],
    rules: [
      {
        title: 'الأدب والنصيحة والرغبة',
        body:
          'نستعمل الشرط لتلطيف الطلب (je voudrais, pourriez-vous), ولإعطاء نصيحة (tu devrais), وللتعبير عن رغبة (j\'aimerais).',
        examples: [
          { fr: "Je voudrais un café, s'il vous plaît.", ar: 'أود قهوة من فضلك.' },
          { fr: 'Tu devrais voir un médecin.', ar: 'ينبغي أن ترى طبيباً.' },
          { fr: "J'aimerais voyager au Canada.", ar: 'أود السفر إلى كندا.' },
        ],
      },
      {
        title: 'جذور شاذة',
        body:
          'بعض الأفعال لها جذر خاص: être → ser-, avoir → aur-, faire → fer-, pouvoir → pourr-, vouloir → voudr-, devoir → devr-, venir → viendr-.',
        examples: [
          { fr: 'Pourriez-vous répéter ?', ar: 'هل يمكنك أن تكرّر؟' },
          { fr: 'Nous serions ravis de venir.', ar: 'سنكون سعداء بالمجيء.' },
        ],
      },
    ],
  },
  {
    id: 'si-conditionnel',
    category: 'grammar',
    level: 'B1',
    title: 'Les phrases avec « si »',
    titleAr: 'الجمل الشرطية بـ si',
    description: 'الشرط الممكن والشرط الافتراضي: أي زمن بعد si وأي زمن في النتيجة.',
    xp: 35,
    quizId: 'quiz-b1-conditionnel',
    intro:
      'القاعدة الذهبية: لا نضع الشرط (conditionnel) مباشرة بعد si. الزمن بعد si يحدد الزمن في الجملة الأخرى.',
    rules: [
      {
        title: 'شرط ممكن: si + présent',
        body: 'إن كان الاحتمال واقعياً: si + présent، والنتيجة بالمستقبل البسيط أو الأمر أو المضارع.',
        examples: [
          { fr: "S'il pleut demain, nous resterons à la maison.", ar: 'إن أمطرت غداً سنبقى في البيت.' },
          { fr: 'Si tu as faim, mange !', ar: 'إن كنت جائعاً فكُل!' },
        ],
      },
      {
        title: 'شرط افتراضي: si + imparfait',
        body: 'إن كان الاحتمال بعيداً أو خيالياً: si + imparfait، والنتيجة بالشرط (conditionnel présent).',
        examples: [
          { fr: "Si j'avais de l'argent, j'achèterais une maison.", ar: 'لو كان عندي مال لاشتريت بيتاً.' },
          { fr: 'Si tu étudiais plus, tu réussirais.', ar: 'لو درست أكثر لنجحت.' },
        ],
      },
      {
        title: 'خطأ شائع',
        body: 'لا نقول « Si j\'aurais… ». بعد si لا يأتي futur ولا conditionnel أبداً.',
        examples: [{ fr: 'Si je pouvais, je viendrais.', ar: 'لو استطعت لجئت.' }],
      },
    ],
  },
  {
    id: 'pronoms-doubles',
    category: 'grammar',
    level: 'B1',
    title: 'Les pronoms doubles',
    titleAr: 'الضمائر المزدوجة',
    description: 'ترتيب الضميرين معاً: Je le lui donne، Il me le dit.',
    xp: 40,
    quizId: 'quiz-b1-pronoms-discours',
    intro: 'نضع ضميرين قبل الفعل أحياناً. الترتيب مهم.',
    rules: [
      {
        title: 'الترتيب العادي',
        body:
          'me / te / nous / vous تسبق le / la / les، و le / la / les تسبق lui / leur.',
        examples: [
          { fr: 'Il me le dit.', ar: 'هو يقوله لي.' },
          { fr: 'Je le lui donne.', ar: 'أعطيه إياه.' },
          { fr: 'Nous les leur envoyons.', ar: 'نرسلها إليهم.' },
        ],
      },
      {
        title: 'مع y و en',
        body: 'y و en يأتيان في آخر السلسلة قبل الفعل مباشرة.',
        examples: [
          { fr: 'Il m\'en parle souvent.', ar: 'يحدّثني عنه كثيراً.' },
          { fr: "Je lui en donne deux.", ar: 'أعطيه منها اثنين.' },
        ],
      },
      {
        title: 'الأمر المثبت: الترتيب يختلف',
        body: 'في الأمر المثبت يأتي الضمير بعد الفعل بشرطات: المباشر أولاً ثم غير المباشر. me تصبح moi.',
        examples: [
          { fr: 'Donne-le-moi !', ar: 'أعطني إياه!' },
          { fr: 'Dis-le-lui.', ar: 'قله له.' },
          { fr: 'Ne me le donne pas.', ar: 'لا تعطني إياه.' },
        ],
      },
    ],
  },
  {
    id: 'discours-indirect',
    category: 'grammar',
    level: 'B1',
    title: 'Le discours indirect',
    titleAr: 'الكلام المنقول',
    description: 'كيف تنقل كلام شخص آخر، وكيف تتغير الأزمنة وظروف الزمان.',
    xp: 40,
    quizId: 'quiz-b1-pronoms-discours',
    intro: 'ننقل الكلام بالفعل (dire, demander…) ثم que أو si، وقد تتغير الأزمنة حسب فعل النقل.',
    rules: [
      {
        title: 'فعل النقل في الحاضر: لا تغيير في الزمن',
        body: 'نغيّر الضمائر فقط.',
        examples: [
          { fr: 'Il dit : « Je suis fatigué. » → Il dit qu\'il est fatigué.', ar: 'هو يقول إنه متعب.' },
          { fr: 'Elle demande : « Tu viens ? » → Elle demande si je viens.', ar: 'تسأل إن كنت قادماً.' },
        ],
      },
      {
        title: 'فعل النقل في الماضي: تتغير الأزمنة',
        body:
          'présent → imparfait، passé composé → plus-que-parfait، futur → conditionnel.',
        examples: [
          { fr: 'Elle a dit : « Je viendrai. » → Elle a dit qu\'elle viendrait.', ar: 'قالت إنها ستأتي.' },
          { fr: "Il m'a demandé : « Où habites-tu ? » → Il m'a demandé où j'habitais.", ar: 'سألني أين أسكن.' },
        ],
      },
      {
        title: 'ظروف الزمان والمكان',
        body: 'demain → le lendemain، hier → la veille، aujourd\'hui → ce jour-là، ici → là.',
        examples: [
          { fr: 'Il a dit qu\'il partirait le lendemain.', ar: 'قال إنه سيسافر في اليوم التالي.' },
        ],
      },
    ],
  },
  {
    id: 'mise-en-relief',
    category: 'grammar',
    level: 'B1',
    title: 'La mise en relief',
    titleAr: 'التركيز (c\'est… qui / que)',
    description: 'لإبراز كلمة أو معلومة في الجملة.',
    xp: 30,
    quizId: 'quiz-b1-pronoms-discours',
    intro: 'لنلفت الانتباه إلى شخص أو شيء، نضعه بين c\'est و qui أو que.',
    rules: [
      {
        title: 'c\'est… qui: لتركيز الفاعل',
        body: 'ما بعد qui هو الفعل.',
        examples: [
          { fr: "C'est Marie qui a téléphoné.", ar: 'ماري هي التي اتصلت.' },
          { fr: "Ce sont mes parents qui m'ont aidé.", ar: 'والداي هما من ساعدني.' },
        ],
      },
      {
        title: 'c\'est… que: لتركيز المفعول أو المكان أو الزمان',
        body: 'ما بعد que يبدأ بفاعل جديد.',
        examples: [
          { fr: "C'est ce livre que je veux.", ar: 'هذا الكتاب هو ما أريده.' },
          { fr: "C'est à Paris que nous sommes allés.", ar: 'إلى باريس هي التي ذهبنا.' },
        ],
      },
      {
        title: 'ce qui / ce que… c\'est',
        body: 'للتركيز على فكرة عامة.',
        examples: [
          { fr: "Ce que j'aime, c'est la musique.", ar: 'ما أحبه هو الموسيقى.' },
          { fr: "Ce qui m'énerve, c'est le bruit.", ar: 'ما يزعجني هو الضجيج.' },
        ],
      },
    ],
  },
  {
    id: 'exprimer-opinion',
    category: 'vocabulary',
    level: 'B1',
    title: 'Donner son opinion',
    titleAr: 'التعبير عن الرأي والاتفاق والاختلاف',
    description: 'عبارات جاهزة لإبداء الرأي والرد على رأي الآخرين.',
    xp: 30,
    quizId: 'quiz-b1-expression',
    intro: 'هذه العبارات أساسية في التعبير الشفهي والكتابي، وخاصة في المهمة الثالثة بالامتحان.',
    vocab: [
      { fr: 'À mon avis, …', ar: 'في رأيي…' },
      { fr: 'Je pense que…', ar: 'أظن أن…' },
      { fr: 'Je trouve que…', ar: 'أجد أن…' },
      { fr: 'Il me semble que…', ar: 'يبدو لي أن…' },
      { fr: 'Je suis d\'accord.', ar: 'أنا موافق.' },
      { fr: 'Tout à fait !', ar: 'تماماً!' },
      { fr: 'Je ne suis pas d\'accord.', ar: 'لست موافقاً.' },
      { fr: 'Pas du tout.', ar: 'أبداً / لا إطلاقاً.' },
      { fr: 'Je suis pour / contre', ar: 'أنا مع / ضد' },
      { fr: 'D\'un côté… d\'un autre côté…', ar: 'من جهة… ومن جهة أخرى…' },
      { fr: 'Certes… mais…', ar: 'صحيح… لكن…' },
    ],
    rules: [
      {
        title: 'بنية الرأي',
        body: 'رأي + سبب + مثال + خاتمة. استعمل أدوات الربط لتبدو الحجج منظمة.',
        examples: [
          { fr: "À mon avis, il faut apprendre la langue du pays. Premièrement, cela aide au travail. Par exemple, on comprend les consignes.", ar: 'نموذج لبنية الحجة.' },
        ],
      },
    ],
  },
  {
    id: 'adverbes-ment',
    category: 'grammar',
    level: 'B1',
    title: 'Les adverbes en -ment',
    titleAr: 'الظروف المنتهية بـ -ment',
    description: 'كيف نصنع الظرف من الصفة ونتجنب الأخطاء.',
    xp: 30,
    quizId: 'quiz-b1-expression',
    intro: 'الظرف يصف الفعل (كيف؟). الطريقة الغالبة: صفة بصيغة المؤنث + -ment.',
    vocab: [
      { fr: 'lent → lentement', ar: 'ببطء' },
      { fr: 'heureux → heureusement', ar: 'لحسن الحظ' },
      { fr: 'vrai → vraiment', ar: 'حقاً' },
      { fr: 'poli → poliment', ar: 'بأدب' },
      { fr: 'évident → évidemment', ar: 'بالطبع' },
      { fr: 'constant → constamment', ar: 'باستمرار' },
      { fr: 'bon → bien / mauvais → mal', ar: 'جيداً / سيئاً' },
    ],
    rules: [
      {
        title: 'القاعدة العامة',
        body: 'نأخذ الصفة المؤنثة ونضيف -ment: lente → lentement، heureuse → heureusement. وإن انتهت الصفة المذكرة بحرف علة نضيف -ment مباشرة: vrai → vraiment.',
        examples: [
          { fr: 'Elle parle lentement.', ar: 'تتكلم ببطء.' },
          { fr: 'Heureusement, il est arrivé à l\'heure.', ar: 'لحسن الحظ وصل في الموعد.' },
        ],
      },
      {
        title: 'النهايات -ent و -ant',
        body: 'تصبح -emment و -amment، وتُنطق كلتاهما « amã ».',
        examples: [
          { fr: 'Évidemment, tu as raison.', ar: 'بالطبع أنت محق.' },
          { fr: 'Il travaille constamment.', ar: 'يعمل باستمرار.' },
        ],
      },
    ],
  },
  {
    id: 'temps-proches',
    category: 'grammar',
    level: 'B1',
    title: 'Passé récent et action en cours',
    titleAr: 'الماضي القريب والفعل الجاري',
    description: 'venir de، être en train de، être sur le point de.',
    xp: 30,
    quizId: 'quiz-b1-expression',
    intro: 'ثلاث صيغ للتعبير عن لحظات قريبة من الآن: ما انتهى للتو، وما يجري الآن، وما سيبدأ بعد لحظة.',
    conjugation: [
      {
        title: 'venir — Présent',
        meaning: 'يأتي',
        rows: [
          ['je', 'viens'],
          ['tu', 'viens'],
          ['il / elle', 'vient'],
          ['nous', 'venons'],
          ['vous', 'venez'],
          ['ils / elles', 'viennent'],
        ],
      },
    ],
    rules: [
      {
        title: 'venir de + مصدر',
        body: 'ما انتهى منذ لحظات (ماضٍ قريب جداً).',
        examples: [{ fr: 'Je viens de finir mon travail.', ar: 'انتهيت للتو من عملي.' }],
      },
      {
        title: 'être en train de + مصدر',
        body: 'ما يجري الآن.',
        examples: [{ fr: 'Elle est en train de cuisiner.', ar: 'هي الآن تطبخ.' }],
      },
      {
        title: 'être sur le point de + مصدر',
        body: 'ما سيحدث بعد لحظات.',
        examples: [{ fr: 'Le train est sur le point de partir.', ar: 'القطار على وشك المغادرة.' }],
      },
    ],
  },
  {
    id: 'vocab-travail-etudes',
    category: 'vocabulary',
    level: 'B1',
    title: 'Travail et études',
    titleAr: 'مفردات العمل والدراسة',
    description: 'كلمات المقابلة والعقد والتكوين والامتحانات.',
    xp: 30,
    quizId: 'quiz-b1-vocab',
    intro: 'مفردات ضرورية للتعامل مع أرباب العمل والإدارات والمعاهد.',
    vocab: [
      { fr: 'un emploi / un travail', ar: 'وظيفة / عمل' },
      { fr: 'un salaire', ar: 'راتب' },
      { fr: 'un patron / une patronne', ar: 'رئيس العمل' },
      { fr: 'un collègue', ar: 'زميل' },
      { fr: "un entretien d'embauche", ar: 'مقابلة توظيف' },
      { fr: 'un CV', ar: 'سيرة ذاتية' },
      { fr: 'une candidature', ar: 'طلب توظيف' },
      { fr: 'un contrat', ar: 'عقد' },
      { fr: 'un stage', ar: 'فترة تدريب' },
      { fr: 'une réunion', ar: 'اجتماع' },
      { fr: 'démissionner', ar: 'يستقيل' },
      { fr: 'être au chômage', ar: 'عاطل عن العمل' },
      { fr: 'un diplôme', ar: 'شهادة' },
      { fr: 'une formation', ar: 'تكوين / دورة' },
      { fr: 'réussir un examen', ar: 'ينجح في امتحان' },
      { fr: 'échouer à un examen', ar: 'يرسب في امتحان' },
    ],
    rules: [
      {
        title: 'عبارات مفيدة',
        body: 'postuler à un poste (يتقدم لوظيفة)، passer un entretien (يجري مقابلة)، être embauché (يُوظَّف)، être licencié (يُفصل).',
        examples: [
          { fr: "J'ai postulé à un poste de comptable.", ar: 'تقدمت لوظيفة محاسب.' },
          { fr: 'Il a été embauché la semaine dernière.', ar: 'تم توظيفه الأسبوع الماضي.' },
        ],
      },
    ],
  },
  {
    id: 'vocab-environnement-medias',
    category: 'vocabulary',
    level: 'B1',
    title: 'Environnement et médias',
    titleAr: 'مفردات البيئة والإعلام',
    description: 'كلمات الحياة اليومية عن التلوث والفرز والأخبار.',
    xp: 30,
    quizId: 'quiz-b1-vocab',
    intro: 'موضوعان يتكرران كثيراً في القراءة والاستماع والمناقشة.',
    vocab: [
      { fr: "l'environnement", ar: 'البيئة' },
      { fr: 'la pollution', ar: 'التلوث' },
      { fr: 'le réchauffement climatique', ar: 'الاحترار المناخي' },
      { fr: 'trier les déchets', ar: 'فرز النفايات' },
      { fr: 'le recyclage', ar: 'إعادة التدوير' },
      { fr: "économiser l'énergie", ar: 'توفير الطاقة' },
      { fr: 'les énergies renouvelables', ar: 'الطاقات المتجددة' },
      { fr: "l'actualité", ar: 'الأخبار الجارية' },
      { fr: 'un article de presse', ar: 'مقال صحفي' },
      { fr: 'une chaîne de télévision', ar: 'قناة تلفزيونية' },
      { fr: 'les réseaux sociaux', ar: 'مواقع التواصل' },
      { fr: "s'abonner", ar: 'يشترك' },
      { fr: 'une fausse information', ar: 'خبر كاذب' },
    ],
    rules: [
      {
        title: 'عبارات مفيدة',
        body: 'protéger la planète (حماية الكوكب)، réduire sa consommation (تقليل الاستهلاك)، vérifier une information (التحقق من خبر).',
        examples: [
          { fr: 'Il faut réduire notre consommation de plastique.', ar: 'يجب أن نقلل استهلاك البلاستيك.' },
          { fr: "Je lis l'actualité tous les matins.", ar: 'أقرأ الأخبار كل صباح.' },
        ],
      },
    ],
  },
];

export const B1_QUIZZES = [
  {
    id: 'quiz-b1-conditionnel',
    title: 'Conditionnel et phrases avec si',
    titleAr: 'الشرط والجمل الشرطية',
    level: 'B1',
    category: 'grammar',
    questions: [
      { id: 'nd1', type: 'mcq', prompt: "Je ___ un café, s'il vous plaît. (طلب مهذب)", options: ['voudrais', 'veux', 'voulais', 'voudrai'], answer: 0, explanation: 'للطلب المهذب نستعمل الشرط: je voudrais.' },
      { id: 'nd2', type: 'fill', prompt: 'Tu ___ voir un médecin. (devoir — نصيحة)', answer: 'devrais', hint: 'جذر devr- + -ais', explanation: 'النصيحة تُقال بالشرط: tu devrais.' },
      { id: 'nd3', type: 'mcq', prompt: 'الشرط من aller مع nous :', options: ['irons', 'irions', 'allerions', 'allions'], answer: 1, explanation: 'جذر ir- + -ions: nous irions.' },
      { id: 'nd4', type: 'mcq', prompt: 'Tu ___ m’aider ? (pouvoir — طلب مهذب)', options: ['pourrais', 'peux', 'pouvais', 'pourras'], answer: 0, explanation: 'جذر pourr- + -ais.' },
      { id: 'nd5', type: 'fill', prompt: "Si j'avais de l'argent, j'___ une maison. (acheter)", answer: 'achèterais', accept: ['acheterais'], hint: 'si + imparfait ← الشرط', explanation: 'si + imparfait → conditionnel: j’achèterais.' },
      { id: 'nd6', type: 'mcq', prompt: "S'il pleut demain, nous ___ à la maison.", options: ['resterons', 'resterions', 'restions', 'serions restés'], answer: 0, explanation: 'si + présent → futur simple.' },
      { id: 'nd7', type: 'mcq', prompt: 'Si j’étais riche, je ___ le monde.', options: ['voyagerais', 'voyagerai', 'voyageais', 'voyagerait'], answer: 0, explanation: 'si + imparfait → conditionnel présent: je voyagerais.' },
      { id: 'nd8', type: 'mcq', prompt: 'أي جملة صحيحة؟', options: ["Si j'avais le temps, je viendrais.", "Si j'aurais le temps, je viendrais.", "Si j'avais le temps, je viendrai.", "Si je aurais le temps, je viens."], answer: 0, explanation: 'لا نضع الشرط بعد si.' },
      { id: 'nd9', type: 'mcq', prompt: "ما وظيفة « J'aimerais voyager » ؟", options: ['رغبة مهذبة', 'أمر', 'حدث ماضٍ', 'عادة ماضية'], answer: 0, explanation: "j'aimerais تعبّر عن رغبة بلطف." },
      { id: 'nd10', type: 'fill', prompt: 'Si tu étudiais plus, tu ___ ton examen. (réussir)', answer: 'réussirais', accept: ['reussirais'], hint: 'conditionnel présent', explanation: 'si + imparfait → réussirais.' },
    ],
  },
  {
    id: 'quiz-b1-pronoms-discours',
    title: 'Pronoms doubles, discours indirect, mise en relief',
    titleAr: 'الضمائر المزدوجة والكلام المنقول والتركيز',
    level: 'B1',
    category: 'grammar',
    questions: [
      { id: 'ne1', type: 'mcq', prompt: 'Je donne le livre à Paul → Je ___ donne.', options: ['le lui', 'lui le', 'le leur', 'lui y'], answer: 0, explanation: 'le/la/les تسبق lui/leur: je le lui donne.' },
      { id: 'ne2', type: 'mcq', prompt: 'Il me montre les photos → Il me ___ montre.', options: ['les', 'le', 'la', 'lui'], answer: 0, explanation: 'me ثم les: il me les montre.' },
      { id: 'ne3', type: 'fill', prompt: 'Donne-moi le sel. → Donne-___-moi.', answer: 'le', hint: 'في الأمر المثبت يأتي المباشر أولاً', explanation: 'Donne-le-moi.' },
      { id: 'ne4', type: 'mcq', prompt: "Il dit : « Je suis fatigué. » → Il dit qu'il ___ fatigué.", options: ['est', 'était', 'serait', 'sera'], answer: 0, explanation: 'فعل النقل في الحاضر: لا يتغير الزمن.' },
      { id: 'ne5', type: 'mcq', prompt: "Elle a dit : « Je viendrai demain. » → Elle a dit qu'elle ___ le lendemain.", options: ['viendrait', 'viendra', 'vient', 'est venue'], answer: 0, explanation: 'فعل النقل في الماضي: futur → conditionnel.' },
      { id: 'ne6', type: 'mcq', prompt: "Il m'a demandé : « Où habites-tu ? » → Il m'a demandé où j'___.", options: ['habitais', 'habite', 'habiterai', 'ai habité'], answer: 0, explanation: 'présent → imparfait في الكلام المنقول الماضي.' },
      { id: 'ne7', type: 'mcq', prompt: 'ماذا يصبح « hier » في الكلام المنقول (فعل النقل ماضٍ)؟', options: ['la veille', 'le lendemain', 'demain', "aujourd'hui"], answer: 0, explanation: 'hier → la veille.' },
      { id: 'ne8', type: 'mcq', prompt: "C'est Marie ___ a téléphoné.", options: ['qui', 'que', 'où', 'dont'], answer: 0, explanation: 'تركيز الفاعل: c’est … qui.' },
      { id: 'ne9', type: 'mcq', prompt: "C'est ce livre ___ je veux.", options: ['que', 'qui', 'dont', 'où'], answer: 0, explanation: 'تركيز المفعول: c’est … que.' },
      { id: 'ne10', type: 'mcq', prompt: "Ce ___ j'aime, c'est la musique.", options: ['que', 'qui', 'quoi', 'dont'], answer: 0, explanation: 'ce que + فاعل + فعل، c’est …' },
    ],
  },
  {
    id: 'quiz-b1-expression',
    title: 'Opinion, adverbes et temps proches',
    titleAr: 'الرأي والظروف والزمن القريب',
    level: 'B1',
    category: 'grammar',
    questions: [
      { id: 'nf1', type: 'mcq', prompt: 'ماذا تعني « Pas du tout » عند الرد على رأي؟', options: ['لا إطلاقاً', 'تماماً', 'ربما', 'بالتأكيد'], answer: 0, explanation: 'pas du tout = على الإطلاق لا.' },
      { id: 'nf2', type: 'mcq', prompt: 'ماذا تعني « Il me semble que… » ؟', options: ['يبدو لي أن…', 'أنا متأكد أن…', 'لا أعرف أن…', 'يجب أن…'], answer: 0, explanation: 'il me semble que = يبدو لي أن.' },
      { id: 'nf3', type: 'mcq', prompt: 'الظرف من « lent » :', options: ['lentement', 'lentment', 'lentemment', 'lente'], answer: 0, explanation: 'lente + ment = lentement.' },
      { id: 'nf4', type: 'mcq', prompt: 'الظرف من « évident » :', options: ['évidemment', 'évidentement', 'évidentment', 'évidemant'], answer: 0, explanation: '-ent → -emment.' },
      { id: 'nf5', type: 'mcq', prompt: 'الظرف من « heureux » :', options: ['heureusement', 'heureuxment', 'heureuxement', 'heureusemment'], answer: 0, explanation: 'heureuse + ment.' },
      { id: 'nf6', type: 'mcq', prompt: 'Je ___ de finir mon travail. (انتهيت للتو)', options: ['viens', 'vais', 'suis', 'ai'], answer: 0, explanation: 'venir de + مصدر = ماضٍ قريب.' },
      { id: 'nf7', type: 'mcq', prompt: 'Elle ___ en train de cuisiner. (الآن)', options: ['est', 'a', 'va', 'vient'], answer: 0, explanation: 'être en train de + مصدر = فعل جارٍ.' },
      { id: 'nf8', type: 'mcq', prompt: 'ماذا تعني « Il est sur le point de partir » ؟', options: ['هو على وشك المغادرة', 'غادر للتو', 'هو يغادر دائماً', 'لن يغادر'], answer: 0, explanation: 'être sur le point de = على وشك.' },
    ],
  },
  {
    id: 'quiz-b1-vocab',
    title: 'Vocabulaire B1',
    titleAr: 'مفردات العمل والدراسة والبيئة والإعلام',
    level: 'B1',
    category: 'vocabulary',
    questions: [
      { id: 'ng1', type: 'mcq', prompt: "ماذا تعني « un entretien d'embauche » ؟", options: ['مقابلة توظيف', 'عقد عمل', 'إجازة', 'راتب'], answer: 0, explanation: 'entretien d’embauche = مقابلة توظيف.' },
      { id: 'ng2', type: 'mcq', prompt: 'ماذا تعني « démissionner » ؟', options: ['يستقيل', 'يتقاعد', 'يُفصل', 'يتدرب'], answer: 0, explanation: 'démissionner = يستقيل بنفسه.' },
      { id: 'ng3', type: 'mcq', prompt: 'ماذا تعني « un stage » ؟', options: ['فترة تدريب', 'امتحان', 'عقد دائم', 'عطلة'], answer: 0, explanation: 'stage = فترة تدريب.' },
      { id: 'ng4', type: 'mcq', prompt: 'ماذا تعني « réussir un examen » ؟', options: ['ينجح في امتحان', 'يرسب في امتحان', 'يؤجل امتحاناً', 'يصحح امتحاناً'], answer: 0, explanation: 'réussir = ينجح.' },
      { id: 'ng5', type: 'mcq', prompt: 'ماذا تعني « le réchauffement climatique » ؟', options: ['الاحترار المناخي', 'التلوث الصوتي', 'إعادة التدوير', 'الأمطار'], answer: 0, explanation: 'ارتفاع حرارة الأرض.' },
      { id: 'ng6', type: 'mcq', prompt: 'ماذا تعني « trier les déchets » ؟', options: ['فرز النفايات', 'رمي النفايات', 'حرق النفايات', 'شراء مواد'], answer: 0, explanation: 'trier = يفرز.' },
      { id: 'ng7', type: 'mcq', prompt: 'ماذا تعني « un article de presse » ؟', options: ['مقال صحفي', 'إعلان تلفزيوني', 'كتاب', 'رسالة'], answer: 0, explanation: 'article de presse = مقال صحفي.' },
      { id: 'ng8', type: 'mcq', prompt: "ماذا تعني « s'abonner » ؟", options: ['يشترك', 'يلغي', 'يتصل', 'يقرأ'], answer: 0, explanation: "s'abonner = يشترك (في مجلة أو قناة)." },
    ],
  },
];

export const B1_LISTENING = [
  { id: 'l41', fr: "Si j'avais plus de temps, je voyagerais davantage.", ar: 'لو كان عندي وقت أكثر لسافرت أكثر.' },
  { id: 'l42', fr: "Je viens de finir mon travail.", ar: 'انتهيت للتو من عملي.' },
  { id: 'l43', fr: "Il m'a dit qu'il viendrait le lendemain.", ar: 'قال لي إنه سيأتي في اليوم التالي.' },
  { id: 'l44', fr: "Ce que j'aime, c'est la musique.", ar: 'ما أحبه هو الموسيقى.' },
];
