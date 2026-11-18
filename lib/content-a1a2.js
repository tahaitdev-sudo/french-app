// Contenu additionnel A1–A2 (12 leçons + 3 quiz). Fusionné dans lib/data.js.

export const EXTRA_LESSONS = [
  /* ------------------------------ A1 ------------------------------ */
  {
    id: 'pronoms-sujets',
    category: 'grammar',
    level: 'A1',
    title: 'Les pronoms sujets',
    titleAr: 'ضمائر الفاعل',
    description: 'الضمائر التسعة التي تسبق كل فعل، ومتى نستعمل on بدل nous.',
    xp: 20,
    quizId: 'quiz-a1-grammaire',
    intro: 'قبل أي فعل يأتي ضمير الفاعل. احفظ هذه الضمائر فهي أساس كل جملة.',
    vocab: [
      { fr: 'je', ar: 'أنا' },
      { fr: 'tu', ar: 'أنتَ / أنتِ (غير رسمي)' },
      { fr: 'il', ar: 'هو' },
      { fr: 'elle', ar: 'هي' },
      { fr: 'on', ar: 'نحن / الناس (محادثة)' },
      { fr: 'nous', ar: 'نحن' },
      { fr: 'vous', ar: 'أنتم / حضرتك (رسمي)' },
      { fr: 'ils', ar: 'هم (مذكر أو مختلط)' },
      { fr: 'elles', ar: 'هنّ (مؤنث فقط)' },
    ],
    rules: [
      {
        title: 'on = nous في الكلام اليومي',
        body:
          'يستعمل الفرنسيون on كثيراً بمعنى «نحن»، ويأخذ الفعل صيغة المفرد (il). أما nous فأكثر رسمية.',
        examples: [
          { fr: 'On mange ensemble ?', ar: 'هل نأكل معاً؟' },
          { fr: 'Nous mangeons à midi.', ar: 'نأكل عند الظهر.' },
        ],
      },
      {
        title: 'ils أم elles؟',
        body:
          'استعمل elles للمؤنث فقط. إذا كان في المجموعة ولو شخص واحد مذكر فنقول ils.',
        examples: [
          { fr: 'Marie et Sara sont amies : elles sont ici.', ar: 'ماري وسارة صديقتان: هما هنا.' },
          { fr: 'Marie et Paul sont amis : ils sont ici.', ar: 'ماري وبول صديقان: هما هنا.' },
        ],
      },
      {
        title: 'الحذف (élision)',
        body: 'يصبح je قبل حرف علة j\'، مثل j\'habite و j\'aime.',
        examples: [{ fr: "J'habite à Lyon.", ar: 'أسكن في ليون.' }],
      },
    ],
  },
  {
    id: 'genre-pluriel',
    category: 'grammar',
    level: 'A1',
    title: 'Le genre et le pluriel',
    titleAr: 'المذكر والمؤنث والجمع',
    description: 'كيف تحوّل الاسم إلى مؤنث وإلى جمع، مع أهم الاستثناءات.',
    xp: 20,
    quizId: 'quiz-a1-grammaire',
    intro: 'كل اسم فرنسي إما مذكر أو مؤنث، والجمع غالباً بإضافة s.',
    vocab: [
      { fr: 'un étudiant / une étudiante', ar: 'طالب / طالبة' },
      { fr: 'un ami / une amie', ar: 'صديق / صديقة' },
      { fr: 'un cheval / des chevaux', ar: 'حصان / خيول' },
      { fr: 'un bureau / des bureaux', ar: 'مكتب / مكاتب' },
      { fr: 'un pays / des pays', ar: 'بلد / بلدان' },
    ],
    rules: [
      {
        title: 'المؤنث: أضف e غالباً',
        body:
          'للأشخاص والصفات نضيف e عادةً. وإن انتهت الكلمة بـ e فلا تتغير. بعض النهايات تتغير: -ien → -ienne، -eur → -euse.',
        examples: [
          { fr: 'un petit ami → une petite amie', ar: 'صديق صغير → صديقة صغيرة' },
          { fr: 'un musicien → une musicienne', ar: 'موسيقي → موسيقية' },
        ],
      },
      {
        title: 'الجمع: أضف s',
        body:
          'النطق لا يتغير غالباً (s صامتة)، والفرق يظهر في الأداة: le → les، un → des.',
        examples: [
          { fr: 'une table → des tables', ar: 'طاولة → طاولات' },
          { fr: 'le livre → les livres', ar: 'الكتاب → الكتب' },
        ],
      },
      {
        title: 'استثناءات الجمع',
        body:
          'ما ينتهي بـ -s أو -x أو -z لا يتغير. وما ينتهي بـ -al يصبح -aux، وبـ -eau يصبح -eaux.',
        examples: [
          { fr: 'un cheval → des chevaux', ar: 'حصان → خيول' },
          { fr: 'un gâteau → des gâteaux', ar: 'كعكة → كعكات' },
          { fr: 'un pays → des pays', ar: 'بلد → بلدان' },
        ],
      },
    ],
  },
  {
    id: 'possessifs',
    category: 'grammar',
    level: 'A1',
    title: 'Les adjectifs possessifs',
    titleAr: 'صفات الملكية',
    description: 'mon, ma, mes… تتبع الشيء المملوك لا المالك.',
    xp: 20,
    quizId: 'quiz-a1-grammaire',
    intro:
      'في الفرنسية تتفق صفة الملكية مع الشيء المملوك (مذكر/مؤنث/جمع)، لا مع صاحبه.',
    vocab: [
      { fr: 'mon / ma / mes', ar: 'ـي (لي)' },
      { fr: 'ton / ta / tes', ar: 'ـك (لك)' },
      { fr: 'son / sa / ses', ar: 'ـه / ـها' },
      { fr: 'notre / nos', ar: 'ـنا' },
      { fr: 'votre / vos', ar: 'ـكم' },
      { fr: 'leur / leurs', ar: 'ـهم' },
    ],
    rules: [
      {
        title: 'القاعدة الأساسية',
        body:
          'نختار الصيغة حسب جنس وعدد الاسم بعدها: mon père (مذكر)، ma mère (مؤنث)، mes parents (جمع).',
        examples: [
          { fr: 'mon livre, ma maison, mes clés', ar: 'كتابي، بيتي، مفاتيحي' },
          { fr: 'Leur voiture est rouge.', ar: 'سيارتهم حمراء.' },
        ],
      },
      {
        title: 'son و sa للمالك الواحد',
        body:
          'son/sa/ses تعني «ـه» أو «ـها» معاً. السياق يحدد: son frère قد يكون أخاه أو أخاها.',
        examples: [{ fr: 'Marie aime son frère.', ar: 'ماري تحب أخاها.' }],
      },
      {
        title: 'مؤنث يبدأ بحرف علة',
        body: 'نستعمل mon/ton/son بدل ma/ta/sa قبل حرف العلة لتسهيل النطق.',
        examples: [
          { fr: 'mon amie', ar: 'صديقتي' },
          { fr: 'ton école', ar: 'مدرستك' },
        ],
      },
    ],
  },
  {
    id: 'interrogatifs',
    category: 'grammar',
    level: 'A1',
    title: 'Poser des questions',
    titleAr: 'أدوات الاستفهام',
    description: 'qui, où, quand, comment… وثلاث طرق لصياغة السؤال.',
    xp: 25,
    quizId: 'quiz-a1-grammaire',
    intro: 'السؤال مهارة أساسية للتواصل. تعلّم الأدوات ثم الطرق الثلاث.',
    vocab: [
      { fr: 'Qui ?', ar: 'من؟' },
      { fr: 'Que / Qu’est-ce que ?', ar: 'ماذا؟' },
      { fr: 'Où ?', ar: 'أين؟' },
      { fr: 'Quand ?', ar: 'متى؟' },
      { fr: 'Comment ?', ar: 'كيف؟' },
      { fr: 'Pourquoi ?', ar: 'لماذا؟' },
      { fr: 'Combien ?', ar: 'كم؟' },
      { fr: 'Quel / Quelle ?', ar: 'أي؟ / ما؟' },
    ],
    rules: [
      {
        title: 'ثلاث طرق للسؤال نعم/لا',
        body:
          '١) الصوت: ترفع نبرة آخر الجملة (محادثة). ٢) est-ce que قبل الجملة (معتاد). ٣) قلب الفاعل والفعل (رسمي).',
        examples: [
          { fr: 'Tu parles français ?', ar: 'هل تتكلم الفرنسية؟ (نبرة)' },
          { fr: 'Est-ce que tu parles français ?', ar: 'هل تتكلم الفرنسية؟ (معتاد)' },
          { fr: 'Parles-tu français ?', ar: 'هل تتكلم الفرنسية؟ (رسمي)' },
        ],
      },
      {
        title: 'أداة الاستفهام + السؤال',
        body: 'نضع الأداة في البداية ثم est-ce que، أو نقلب الفعل والفاعل.',
        examples: [
          { fr: 'Où habites-tu ?', ar: 'أين تسكن؟' },
          { fr: "Pourquoi est-ce que tu apprends le français ?", ar: 'لماذا تتعلم الفرنسية؟' },
          { fr: 'Combien ça coûte ?', ar: 'كم يكلّف هذا؟' },
        ],
      },
      {
        title: 'quel يتفق مع الاسم',
        body: 'quel (مذكر مفرد)، quelle (مؤنث مفرد)، quels، quelles (جمع).',
        examples: [
          { fr: 'Quelle heure est-il ?', ar: 'كم الساعة؟' },
          { fr: 'Quel âge as-tu ?', ar: 'كم عمرك؟' },
        ],
      },
    ],
  },
  {
    id: 'prepositions-lieu',
    category: 'vocabulary',
    level: 'A1',
    title: 'Les prépositions de lieu',
    titleAr: 'حروف الجر للمكان',
    description: 'sur, sous, devant… وكيف تقول «في» مع المدن والدول.',
    xp: 25,
    quizId: 'quiz-a1-pratique',
    intro: 'لوصف مكان شيء أو شخص، ولمعرفة الحرف الصحيح مع المدن والدول.',
    vocab: [
      { fr: 'dans', ar: 'داخل' },
      { fr: 'sur', ar: 'فوق / على' },
      { fr: 'sous', ar: 'تحت' },
      { fr: 'devant', ar: 'أمام' },
      { fr: 'derrière', ar: 'خلف' },
      { fr: 'entre', ar: 'بين' },
      { fr: 'à côté de', ar: 'بجانب' },
      { fr: 'en face de', ar: 'مقابل' },
      { fr: 'près de', ar: 'قرب' },
      { fr: 'loin de', ar: 'بعيد عن' },
    ],
    rules: [
      {
        title: 'المدن والدول',
        body:
          'مع المدن نقول à: à Paris. مع دولة مؤنثة (تنتهي غالباً بـ e) نقول en: en France. مع دولة مذكرة نقول au: au Maroc. مع دولة جمع نقول aux: aux États-Unis.',
        examples: [
          { fr: 'Je vis à Marseille.', ar: 'أعيش في مرسيليا.' },
          { fr: 'Elle habite en Espagne.', ar: 'هي تسكن في إسبانيا.' },
          { fr: 'Il travaille au Canada.', ar: 'هو يعمل في كندا.' },
        ],
      },
      {
        title: 'de يتحد مع الأداة',
        body: 'à côté de + le → à côté du، و de + les → des.',
        examples: [
          { fr: 'La banque est à côté du cinéma.', ar: 'المصرف بجانب السينما.' },
          { fr: 'Le chat est sous la table.', ar: 'القط تحت الطاولة.' },
        ],
      },
    ],
  },
  {
    id: 'heure',
    category: 'vocabulary',
    level: 'A1',
    title: "L'heure",
    titleAr: 'قراءة الساعة',
    description: 'كيف تسأل عن الوقت وتقوله بالنظامين العادي و24 ساعة.',
    xp: 25,
    quizId: 'quiz-a1-pratique',
    intro: 'الوقت ضروري للمواعيد والمواصلات. ابدأ بالساعة الكاملة ثم الربع والنصف.',
    vocab: [
      { fr: 'Quelle heure est-il ?', ar: 'كم الساعة؟' },
      { fr: 'Il est trois heures.', ar: 'الساعة الثالثة.' },
      { fr: 'et quart', ar: 'وربع' },
      { fr: 'et demie', ar: 'ونصف' },
      { fr: 'moins le quart', ar: 'إلا ربعاً' },
      { fr: 'midi', ar: 'الظهر (12:00)' },
      { fr: 'minuit', ar: 'منتصف الليل' },
      { fr: 'À quelle heure ?', ar: 'في أي ساعة؟' },
    ],
    rules: [
      {
        title: 'بعد الساعة وقبلها',
        body:
          'نضيف الدقائق مباشرة: trois heures dix (3:10). ونطرح بـ moins: quatre heures moins dix (3:50).',
        examples: [
          { fr: 'Il est huit heures et quart.', ar: 'الثامنة والربع.' },
          { fr: 'Il est neuf heures et demie.', ar: 'التاسعة والنصف.' },
          { fr: 'Il est six heures moins le quart.', ar: 'السادسة إلا ربعاً.' },
        ],
      },
      {
        title: 'نظام 24 ساعة',
        body:
          'في القطارات والإعلانات الرسمية يُقال الوقت بنظام 24 ساعة: 15h30 = quinze heures trente.',
        examples: [
          { fr: 'Le train part à 18 h 45.', ar: 'يغادر القطار الساعة 18:45.' },
          { fr: 'Le magasin ouvre à neuf heures.', ar: 'يفتح المتجر في التاسعة.' },
        ],
      },
    ],
  },
  {
    id: 'partitifs',
    category: 'grammar',
    level: 'A1',
    title: 'Les articles partitifs',
    titleAr: 'أدوات التبعيض',
    description: 'du, de la, de l\', des عند الحديث عن كمية غير محددة.',
    xp: 25,
    quizId: 'quiz-a1-pratique',
    intro:
      'نستعمل أداة التبعيض لما نريد «شيئاً من» مادة أو كمية غير محددة، مثل شرب ماء أو أكل خبز.',
    vocab: [
      { fr: 'du pain', ar: 'شيء من الخبز' },
      { fr: 'de la viande', ar: 'شيء من اللحم' },
      { fr: "de l'eau", ar: 'شيء من الماء' },
      { fr: 'des légumes', ar: 'بعض الخضار' },
      { fr: 'beaucoup de', ar: 'كثير من' },
      { fr: 'un peu de', ar: 'قليل من' },
    ],
    rules: [
      {
        title: 'اختر الأداة حسب الاسم',
        body:
          'du للمذكر، de la للمؤنث، de l\' قبل حرف علة، des للجمع.',
        examples: [
          { fr: 'Je mange du fromage.', ar: 'آكل جبناً.' },
          { fr: 'Elle boit de la limonade.', ar: 'هي تشرب ليموناضة.' },
          { fr: "Nous buvons de l'eau.", ar: 'نشرب ماءً.' },
        ],
      },
      {
        title: 'مع النفي ومع الكمية: de فقط',
        body:
          'بعد النفي وبعد كلمات الكمية نستعمل de (أو d\') بلا أداة.',
        examples: [
          { fr: 'Je ne mange pas de viande.', ar: 'لا آكل لحماً.' },
          { fr: "Il y a beaucoup de monde.", ar: 'يوجد الكثير من الناس.' },
        ],
      },
    ],
  },

  /* ------------------------------ A2 ------------------------------ */
  {
    id: 'imperatif',
    category: 'conjugation',
    level: 'A2',
    title: "L'impératif",
    titleAr: 'صيغة الأمر',
    description: 'لإعطاء أمر أو نصيحة أو دعوة بصيغة tu وnous وvous.',
    xp: 30,
    quizId: 'quiz-a2-grammaire-2',
    intro: 'الأمر يستعمل بلا ضمير فاعل، ومن ثلاث صيغ فقط: tu وnous وvous.',
    conjugation: [
      {
        title: 'parler (أفعال -er)',
        meaning: 'تكلّم',
        rows: [
          ['(tu)', 'parle'],
          ['(nous)', 'parlons'],
          ['(vous)', 'parlez'],
        ],
      },
      {
        title: 'être',
        meaning: 'كن',
        rows: [
          ['(tu)', 'sois'],
          ['(nous)', 'soyons'],
          ['(vous)', 'soyez'],
        ],
      },
      {
        title: 'avoir',
        meaning: 'امتلك',
        rows: [
          ['(tu)', 'aie'],
          ['(nous)', 'ayons'],
          ['(vous)', 'ayez'],
        ],
      },
    ],
    rules: [
      {
        title: 'أفعال -er مع tu بلا s',
        body: 'نحذف s في صيغة tu لأفعال -er: Tu parles → Parle ! و Tu manges → Mange !',
        examples: [
          { fr: 'Écoute bien !', ar: 'اسمع جيداً!' },
          { fr: 'Parlez plus lentement, s\'il vous plaît.', ar: 'تكلموا ببطء من فضلكم.' },
        ],
      },
      {
        title: 'النفي والضمائر',
        body:
          'في النفي: Ne + فعل + pas. وفي الإثبات نضع الضمير بعد الفعل بشرطة: Donne-moi. وفي النفي يعود قبله: Ne me donne pas.',
        examples: [
          { fr: 'Ne parle pas si fort !', ar: 'لا تتكلم بصوت عالٍ!' },
          { fr: 'Dis-moi la vérité.', ar: 'قل لي الحقيقة.' },
        ],
      },
    ],
  },
  {
    id: 'y-en',
    category: 'grammar',
    level: 'A2',
    title: 'Les pronoms y et en',
    titleAr: 'الضميران y و en',
    description: 'ضميران يختصران الكلام ويحلان محل مكان أو كمية.',
    xp: 30,
    quizId: 'quiz-a2-grammaire-2',
    intro: 'نستعملهما لتجنب تكرار الكلمات. يأتيان قبل الفعل مباشرة.',
    rules: [
      {
        title: 'y = إلى/في هناك',
        body:
          'يحل محل à + مكان أو شيء (الـ y تعني «هناك»).',
        examples: [
          { fr: 'Tu vas à Paris ? Oui, j\'y vais.', ar: 'هل تذهب إلى باريس؟ نعم أذهب إليها.' },
          { fr: 'Il pense à son travail ? Il y pense.', ar: 'هل يفكر بعمله؟ نعم يفكر فيه.' },
        ],
      },
      {
        title: 'en = منه / منها',
        body:
          'يحل محل de + اسم، أو أداة تبعيض (du, de la, des)، أو كمية.',
        examples: [
          { fr: 'Tu veux du café ? Oui, j\'en veux.', ar: 'هل تريد قهوة؟ نعم أريد منها.' },
          { fr: 'Tu as des frères ? J\'en ai deux.', ar: 'هل لديك إخوة؟ لدي اثنان.' },
        ],
      },
      {
        title: 'موقعهما',
        body:
          'قبل الفعل المصرَّف. وفي الماضي المركب قبل المساعد: J\'y suis allé. وفي النفي: Je n\'y vais pas.',
        examples: [
          { fr: "Je n'y vais pas.", ar: 'لا أذهب إلى هناك.' },
          { fr: "J'en ai mangé.", ar: 'أكلت منه.' },
        ],
      },
    ],
  },
  {
    id: 'pronoms-coi',
    category: 'grammar',
    level: 'A2',
    title: 'Les pronoms COI',
    titleAr: 'ضمائر المفعول غير المباشر',
    description: 'me, te, lui, nous, vous, leur مع الأفعال التي تأخذ à.',
    xp: 30,
    quizId: 'quiz-a2-grammaire-2',
    intro: 'مع أفعال مثل parler à و donner à نستبدل الشخص بضمير قبل الفعل.',
    vocab: [
      { fr: 'me (m\')', ar: 'لي' },
      { fr: 'te (t\')', ar: 'لك' },
      { fr: 'lui', ar: 'له / لها' },
      { fr: 'nous', ar: 'لنا' },
      { fr: 'vous', ar: 'لكم' },
      { fr: 'leur', ar: 'لهم / لهنّ' },
    ],
    rules: [
      {
        title: 'lui و leur فقط جديدان',
        body:
          'Je parle à Marie → Je lui parle. Je parle à mes amis → Je leur parle. وlui للمذكر والمؤنث معاً.',
        examples: [
          { fr: 'Je lui téléphone demain.', ar: 'أتصل به غداً.' },
          { fr: 'Nous leur donnons un cadeau.', ar: 'نعطيهم هدية.' },
        ],
      },
      {
        title: 'الموقع',
        body: 'قبل الفعل، وفي النفي بين ne والفعل.',
        examples: [
          { fr: 'Il ne me répond pas.', ar: 'هو لا يرد علي.' },
          { fr: 'Elle vous écrit un mail.', ar: 'هي تكتب لكم بريداً.' },
        ],
      },
    ],
  },
  {
    id: 'depuis-pendant',
    category: 'grammar',
    level: 'A2',
    title: 'Depuis, pendant, il y a',
    titleAr: 'depuis وpendant وil y a',
    description: 'ثلاث كلمات للتعبير عن المدة، وكل واحدة تُستعمل بطريقة مختلفة.',
    xp: 30,
    quizId: 'quiz-a2-grammaire-2',
    intro: 'العربية تستعمل كلمة واحدة تقريباً (منذ/لمدة)، والفرنسية تفرّق بدقة.',
    rules: [
      {
        title: 'depuis + مضارع: بدأ ولا يزال',
        body: 'للأمر الذي بدأ في الماضي ويستمر الآن، ونستعمل المضارع.',
        examples: [
          { fr: "J'habite ici depuis 2020.", ar: 'أسكن هنا منذ 2020.' },
          { fr: "Elle apprend le français depuis six mois.", ar: 'تتعلم الفرنسية منذ ستة أشهر.' },
        ],
      },
      {
        title: 'pendant: مدة انتهت',
        body: 'لمدة محددة انتهت، ويأتي معها غالباً الماضي المركب.',
        examples: [
          { fr: "J'ai dormi pendant huit heures.", ar: 'نمت لمدة ثماني ساعات.' },
          { fr: 'Il a travaillé pendant deux ans.', ar: 'عمل لمدة سنتين.' },
        ],
      },
      {
        title: 'il y a: قبل (مضى)',
        body: 'لتحديد وقت حدث في الماضي: قبل كذا.',
        examples: [
          { fr: 'Il est parti il y a trois jours.', ar: 'غادر قبل ثلاثة أيام.' },
          { fr: "J'ai appelé il y a une heure.", ar: 'اتصلت قبل ساعة.' },
        ],
      },
    ],
  },
  {
    id: 'frequence',
    category: 'vocabulary',
    level: 'A2',
    title: 'Dire la fréquence',
    titleAr: 'ظروف التكرار',
    description: 'toujours, souvent, jamais… لوصف عاداتك اليومية.',
    xp: 25,
    quizId: 'quiz-a2-grammaire-2',
    intro: 'نصف بها عدد مرات فعل شيء، من «دائماً» إلى «أبداً».',
    vocab: [
      { fr: 'toujours', ar: 'دائماً' },
      { fr: 'souvent', ar: 'غالباً' },
      { fr: 'parfois / quelquefois', ar: 'أحياناً' },
      { fr: 'de temps en temps', ar: 'من وقت لآخر' },
      { fr: 'rarement', ar: 'نادراً' },
      { fr: 'ne… jamais', ar: 'أبداً (لا… أبداً)' },
      { fr: 'tous les jours', ar: 'كل يوم' },
      { fr: 'une fois par semaine', ar: 'مرة في الأسبوع' },
    ],
    rules: [
      {
        title: 'الموقع في الجملة',
        body:
          'تأتي عادةً بعد الفعل المصرَّف: Je vais souvent au cinéma. أما parfois فتأتي في بداية الجملة أيضاً.',
        examples: [
          { fr: 'Je mange toujours à midi.', ar: 'آكل دائماً عند الظهر.' },
          { fr: 'Parfois, je prends le bus.', ar: 'أحياناً أركب الحافلة.' },
        ],
      },
      {
        title: 'jamais يحتاج ne',
        body: 'للنفي نستعمل ne… jamais حول الفعل. ويمكن لـ jamais وحدها أن تجيب عن سؤال.',
        examples: [
          { fr: 'Je ne fume jamais.', ar: 'لا أدخن أبداً.' },
          { fr: 'Tu vas au théâtre ? Jamais !', ar: 'هل تذهب إلى المسرح؟ أبداً!' },
        ],
      },
    ],
  },
];

export const EXTRA_QUIZZES = [
  {
    id: 'quiz-a1-grammaire',
    title: 'Grammaire A1',
    titleAr: 'أساسيات القواعد (ضمائر، جمع، ملكية، استفهام)',
    level: 'A1',
    category: 'grammar',
    questions: [
      {
        id: 'na1',
        type: 'mcq',
        prompt: 'أي ضمير يُستعمل في المحادثة اليومية بمعنى «نحن»؟',
        options: ['on', 'ils', 'vous', 'elles'],
        answer: 0,
        explanation: 'on = نحن في الكلام اليومي، ويأخذ فعلاً بصيغة المفرد.',
      },
      {
        id: 'na2',
        type: 'fill',
        prompt: 'Marie et Sara sont amies. ___ sont ici.',
        answer: 'Elles',
        accept: ['elles'],
        hint: 'ضمير الفاعل لمجموعة مؤنثة.',
        explanation: 'مجموعة مؤنثة فقط تأخذ elles.',
      },
      {
        id: 'na3',
        type: 'mcq',
        prompt: 'ما جمع « un cheval » ؟',
        options: ['des chevals', 'des chevaux', 'des chevales', 'des chevauxs'],
        answer: 1,
        explanation: 'ما ينتهي بـ -al يصبح -aux في الجمع.',
      },
      {
        id: 'na4',
        type: 'mcq',
        prompt: 'ما مؤنث « un étudiant » ؟',
        options: ['une étudiant', 'une étudiante', 'un étudiante', 'une étudiants'],
        answer: 1,
        explanation: 'نضيف e للمؤنث، وتتغير الأداة إلى une.',
      },
      {
        id: 'na5',
        type: 'fill',
        prompt: 'Voici ___ sœur. (أختي)',
        answer: 'ma',
        accept: ['Ma'],
        hint: 'sœur مؤنث مفرد.',
        explanation: 'sœur مؤنثة مفردة فنقول ma sœur.',
      },
      {
        id: 'na6',
        type: 'mcq',
        prompt: "J'aime ___ amie. (صديقتي)",
        options: ['ma', 'mon', 'mes', 'me'],
        answer: 1,
        explanation: 'قبل مؤنث يبدأ بحرف علة نستعمل mon بدل ma: mon amie.',
      },
      {
        id: 'na7',
        type: 'mcq',
        prompt: '___ habites-tu ? (أين تسكن؟)',
        options: ['Où', 'Quand', 'Pourquoi', 'Combien'],
        answer: 0,
        explanation: 'Où = أين، وتُستعمل للسؤال عن المكان.',
      },
      {
        id: 'na8',
        type: 'mcq',
        prompt: 'أي جملة صحيحة بـ est-ce que؟',
        options: [
          'Est-ce que tu parles français ?',
          'Est-ce que parles-tu français ?',
          'Tu est-ce que parles français ?',
          'Parles est-ce que tu français ?',
        ],
        answer: 0,
        explanation: 'est-ce que + جملة عادية (فاعل ثم فعل) بلا قلب.',
      },
      {
        id: 'na9',
        type: 'mcq',
        prompt: 'Ils aiment ___ maison. (بيتهم)',
        options: ['leur', 'leurs', 'son', 'ma'],
        answer: 0,
        explanation: 'leur مع اسم مفرد، و leurs مع الجمع. maison مفرد فنقول leur maison.',
      },
    ],
  },
  {
    id: 'quiz-a1-pratique',
    title: 'Pratique A1',
    titleAr: 'المكان والساعة وأدوات التبعيض',
    level: 'A1',
    category: 'vocabulary',
    questions: [
      {
        id: 'nb1',
        type: 'mcq',
        prompt: 'Le chat est ___ la table. (تحت الطاولة)',
        options: ['sur', 'sous', 'devant', 'entre'],
        answer: 1,
        explanation: 'sous = تحت، و sur = فوق.',
      },
      {
        id: 'nb2',
        type: 'fill',
        prompt: "J'habite ___ France.",
        answer: 'en',
        accept: ['En'],
        hint: 'France دولة مؤنثة.',
        explanation: 'مع الدول المؤنثة نقول en: en France.',
      },
      {
        id: 'nb3',
        type: 'mcq',
        prompt: 'Il va ___ Maroc.',
        options: ['à', 'en', 'au', 'aux'],
        answer: 2,
        explanation: 'Maroc دولة مذكرة، فنقول au Maroc.',
      },
      {
        id: 'nb4',
        type: 'mcq',
        prompt: 'كيف تقول الساعة 3:15 ؟',
        options: [
          'trois heures et quart',
          'trois heures moins le quart',
          'trois heures et demie',
          'quinze heures moins quart',
        ],
        answer: 0,
        explanation: 'et quart = وربع، و moins le quart = إلا ربعاً.',
      },
      {
        id: 'nb5',
        type: 'mcq',
        prompt: 'ماذا تعني « minuit » ؟',
        options: ['منتصف الليل', 'الظهر', 'الفجر', 'المساء'],
        answer: 0,
        explanation: 'minuit = منتصف الليل، و midi = الظهر.',
      },
      {
        id: 'nb6',
        type: 'mcq',
        prompt: 'كيف تقول 7:30 ؟',
        options: [
          'sept heures et demie',
          'sept heures et quart',
          'sept heures moins le quart',
          'six heures et demie',
        ],
        answer: 0,
        explanation: 'et demie = ونصف.',
      },
      {
        id: 'nb7',
        type: 'fill',
        prompt: 'Je mange ___ pain.',
        answer: 'du',
        accept: ['Du'],
        hint: 'pain اسم مذكر.',
        explanation: 'مع المذكر نستعمل du للتبعيض.',
      },
      {
        id: 'nb8',
        type: 'mcq',
        prompt: 'Je ne mange pas ___ viande.',
        options: ['de', 'de la', 'la', 'des'],
        answer: 0,
        explanation: 'بعد النفي تصبح أداة التبعيض de.',
      },
      {
        id: 'nb9',
        type: 'mcq',
        prompt: "Elle boit ___ eau.",
        options: ['du', 'de la', "de l'", 'des'],
        answer: 2,
        explanation: "قبل حرف علة نستعمل de l': de l'eau.",
      },
    ],
  },
  {
    id: 'quiz-a2-grammaire-2',
    title: 'Grammaire A2',
    titleAr: 'الأمر وy/en وضمائر COI والمدة والتكرار',
    level: 'A2',
    category: 'grammar',
    questions: [
      {
        id: 'nc1',
        type: 'mcq',
        prompt: 'أمر الفعل parler مع tu :',
        options: ['Parle', 'Parles', 'Parler', 'Parlez'],
        answer: 0,
        explanation: 'أفعال -er تفقد s في الأمر مع tu.',
      },
      {
        id: 'nc2',
        type: 'mcq',
        prompt: 'أمر الفعل être مع vous :',
        options: ['Soyez', 'Êtes', 'Étez', 'Sois'],
        answer: 0,
        explanation: 'être شاذ في الأمر: sois, soyons, soyez.',
      },
      {
        id: 'nc3',
        type: 'fill',
        prompt: '___-moi ton nom ! (dire, tu)',
        answer: 'Dis',
        accept: ['dis'],
        hint: 'أمر الفعل dire مع tu.',
        explanation: 'dire → dis (tu)، dites (vous).',
      },
      {
        id: 'nc4',
        type: 'mcq',
        prompt: 'Tu vas à Paris ? Oui, j’___ vais.',
        options: ['y', 'en', 'le', 'lui'],
        answer: 0,
        explanation: 'y يحل محل à + مكان: j’y vais.',
      },
      {
        id: 'nc5',
        type: 'mcq',
        prompt: 'Tu veux du café ? Oui, j’___ veux.',
        options: ['y', 'en', 'le', 'lui'],
        answer: 1,
        explanation: 'en يحل محل du/de la/des + اسم: j’en veux.',
      },
      {
        id: 'nc6',
        type: 'mcq',
        prompt: 'Je parle à Marie → Je ___ parle.',
        options: ['la', 'lui', 'leur', 'le'],
        answer: 1,
        explanation: 'parler à شخص يأخذ ضمير COI: lui.',
      },
      {
        id: 'nc7',
        type: 'mcq',
        prompt: 'Nous téléphonons à nos parents → Nous ___ téléphonons.',
        options: ['leur', 'les', 'lui', 'y'],
        answer: 0,
        explanation: 'leur يحل محل à + أشخاص بصيغة الجمع.',
      },
      {
        id: 'nc8',
        type: 'mcq',
        prompt: "J'habite ici ___ 2020 (وما زلت).",
        options: ['depuis', 'pendant', 'il y a', 'dans'],
        answer: 0,
        explanation: 'depuis + مضارع للأمر المستمر حتى الآن.',
      },
      {
        id: 'nc9',
        type: 'fill',
        prompt: "J'ai dormi ___ huit heures.",
        answer: 'pendant',
        accept: ['Pendant'],
        hint: 'مدة انتهت.',
        explanation: 'pendant للمدة المنتهية، ومعها الماضي المركب.',
      },
      {
        id: 'nc10',
        type: 'mcq',
        prompt: 'Il est parti ___ trois jours. (قبل ثلاثة أيام)',
        options: ['depuis', 'pendant', 'il y a', 'en'],
        answer: 2,
        explanation: 'il y a + مدة = قبل كذا.',
      },
      {
        id: 'nc11',
        type: 'mcq',
        prompt: 'كيف تقول «لا أذهب إلى السينما أبداً»؟',
        options: [
          'Je ne vais jamais au cinéma.',
          'Je jamais ne vais au cinéma.',
          'Je ne jamais vais au cinéma.',
          'Je vais ne jamais au cinéma.',
        ],
        answer: 0,
        explanation: 'ne يسبق الفعل و jamais يليه.',
      },
      {
        id: 'nc12',
        type: 'mcq',
        prompt: 'ماذا تعني « parfois » ؟',
        options: ['أحياناً', 'دائماً', 'أبداً', 'غالباً'],
        answer: 0,
        explanation: 'parfois = أحياناً، و souvent = غالباً، و toujours = دائماً.',
      },
    ],
  },
];

export const EXTRA_LISTENING = [
  { id: 'l35', fr: 'On mange ensemble ce soir ?', ar: 'هل نأكل معاً هذا المساء؟' },
  { id: 'l36', fr: "Il est huit heures et quart.", ar: 'الثامنة والربع.' },
  { id: 'l37', fr: "Elle boit de l'eau tous les jours.", ar: 'هي تشرب الماء كل يوم.' },
  { id: 'l38', fr: 'Parle plus lentement, s’il te plaît.', ar: 'تكلّم ببطء من فضلك.' },
  { id: 'l39', fr: "J'habite ici depuis trois ans.", ar: 'أسكن هنا منذ ثلاث سنوات.' },
  { id: 'l40', fr: 'Je vais souvent au cinéma.', ar: 'أذهب غالباً إلى السينما.' },
];
