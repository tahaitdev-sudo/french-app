// Simulation de type TCF IRN — questions ORIGINALES d'entraînement (pas des sujets officiels).
// Format : q(niveau, texte, question, bonneRéponse, ...troisMauvaises). Les options sont mélangées à chaque essai.

import { CE_EXTRA, CO_EXTRA } from './exam-bank-extra';

const q = (level, text, question, correct, ...wrong) => ({
  level,
  text,
  question,
  options: [correct, ...wrong],
  answer: 0,
});

// Compréhension écrite : 25 questions — 5 A1, 6 A2, 7 B1, 7 B2
const CE = [
  // A1
  q('A1', "Bonjour, je m'appelle Julie. J'ai vingt-cinq ans. J'habite à Lyon et je travaille dans une banque.", 'Où travaille Julie ?', 'Dans une banque', 'Dans une école', 'Dans un hôpital', 'Dans un magasin'),
  q('A1', 'BOULANGERIE DU COIN — Ouvert du mardi au samedi, de 7 h à 19 h. Fermé le dimanche et le lundi.', 'Quand la boulangerie est-elle fermée ?', 'Le dimanche et le lundi', 'Le samedi et le dimanche', 'Seulement le lundi', 'Tous les jours à 19 h'),
  q('A1', "Salut Marc ! Je suis en retard. Je serai là à 18 h 30 devant le cinéma. À tout à l'heure !", 'Où est le rendez-vous ?', 'Devant le cinéma', 'Au restaurant', 'À la gare', 'Chez Marc'),
  q('A1', 'Menu du jour : soupe de légumes, poulet avec du riz, une pomme. Prix : 12 euros.', 'Combien coûte le menu ?', '12 euros', '8 euros', '10 euros', '15 euros'),
  q('A1', "Attention ! La piscine est fermée aujourd'hui à cause de travaux. Elle rouvrira demain à 9 h.", 'Pourquoi la piscine est-elle fermée ?', 'Il y a des travaux', 'Il pleut', "C'est un jour férié", 'Elle est trop chère'),
  // A2
  q('A2', "Objet : Réunion de jeudi. Bonjour à tous, la réunion de jeudi est déplacée au vendredi à 10 h, salle 204, car la directrice sera absente jeudi. Merci de confirmer votre présence.", 'Pourquoi la réunion est-elle déplacée ?', 'La directrice est absente jeudi', 'La salle est occupée', 'Il y a une grève', 'Les employés sont en vacances'),
  q('A2', 'Pour aller à la gare, prenez la première rue à droite, puis continuez tout droit pendant 300 mètres. La gare est en face de la pharmacie.', 'Où est la gare ?', 'En face de la pharmacie', 'À côté de la banque', 'Au bout de la première rue à gauche', "Derrière l'école"),
  q('A2', 'Appartement à louer : 2 pièces, 45 m², 3e étage sans ascenseur, proche du métro. Loyer : 650 euros par mois, charges comprises.', 'Que comprend le loyer de 650 euros ?', 'Les charges', 'Les meubles', 'Le parking', "L'électricité seulement"),
  q('A2', "L'été dernier, nous sommes allés en Bretagne. Il a plu presque tous les jours, mais nous avons quand même visité de beaux villages et mangé de délicieuses crêpes.", 'Comment était le temps pendant les vacances ?', 'Souvent pluvieux', 'Très ensoleillé', 'Très froid', 'Orageux seulement la nuit'),
  q('A2', "Chers clients, à partir du 1er mars, notre magasin ouvrira à 8 h 30 au lieu de 9 h. Les horaires de fermeture restent inchangés.", "Qu'est-ce qui change ?", "L'heure d'ouverture", "L'heure de fermeture", 'Le jour de fermeture', "L'adresse du magasin"),
  q('A2', "Je cherche un cadeau pour ma sœur qui adore lire et cuisiner. Je pense lui offrir un livre de recettes, mais elle en a déjà beaucoup.", 'Quel est le problème du narrateur ?', 'Sa sœur a déjà beaucoup de livres de recettes', "Sa sœur n'aime pas lire", "Il n'a pas assez d'argent", 'Il ne sait pas cuisiner'),
  // B1
  q('B1', "Depuis la mise en place des pistes cyclables, de plus en plus de Parisiens se déplacent à vélo. Selon la mairie, le nombre de cyclistes a doublé en cinq ans, ce qui réduit la circulation automobile dans le centre-ville.", 'Que constate la mairie ?', 'Le nombre de cyclistes a doublé', 'Il y a moins de cyclistes', 'Les voitures sont interdites', 'Les pistes cyclables sont supprimées'),
  q('B1', "Mon patron m'a proposé un poste à Marseille avec un meilleur salaire. J'hésite : je devrais quitter mes amis et mon appartement, mais cette opportunité ne se représentera peut-être pas.", 'Pourquoi le narrateur hésite-t-il ?', 'Il devrait déménager', 'Le salaire est trop bas', "Il n'aime pas son patron", "Il n'a pas le diplôme"),
  q('B1', "La bibliothèque municipale propose désormais des cours d'informatique gratuits pour les seniors, tous les mardis après-midi. L'inscription est obligatoire et le nombre de places est limité à douze.", "À qui s'adressent ces cours ?", 'Aux seniors', 'Aux enfants', 'Aux étudiants', 'Aux employés de la bibliothèque'),
  q('B1', "Bien que le film ait reçu de nombreux prix, je l'ai trouvé trop long et l'histoire manquait de rythme. Les acteurs étaient excellents, en revanche.", "Quelle est l'opinion de l'auteur sur les acteurs ?", 'Ils étaient excellents', 'Ils étaient décevants', 'Ils étaient trop nombreux', 'Ils manquaient de rythme'),
  q('B1', "Si vous souhaitez annuler votre réservation, vous devez le faire au moins 48 heures avant la date prévue. Passé ce délai, la première nuit sera facturée.", "Que se passe-t-il si on annule la veille ?", 'La première nuit est facturée', 'On est remboursé', 'La réservation est prolongée', "On reçoit un bon d'achat"),
  q('B1', "Les jeunes lisent moins de livres qu'avant, mais ils lisent davantage sur écran : articles, réseaux sociaux, forums. Pour les enseignants, l'enjeu est désormais d'apprendre à distinguer les informations fiables des autres.", "Quel est l'enjeu pour les enseignants ?", 'Apprendre à trier les informations fiables', 'Interdire les écrans', 'Faire lire plus de livres papier', 'Supprimer les réseaux sociaux'),
  q('B1', "Le restaurant a fermé définitivement en juin. Le propriétaire, qui souhaitait prendre sa retraite, n'a pas trouvé de repreneur malgré plusieurs mois de recherches.", "Pourquoi le restaurant a-t-il fermé ?", "Le propriétaire part à la retraite sans repreneur", "Il y a eu un incendie", "Il n'avait plus de clients", 'Les prix étaient trop élevés'),
  // B2
  q('B2', "Contrairement à ce que l'on pense souvent, le télétravail ne favorise pas systématiquement la productivité. Une étude récente montre que les employés qui travaillent chez eux plus de trois jours par semaine ressentent davantage d'isolement, ce qui peut nuire à leur motivation à long terme.", "Que montre l'étude ?", "Le télétravail intensif peut générer de l'isolement et nuire à la motivation", 'Le télétravail augmente toujours la productivité', 'Le télétravail est interdit après trois jours', 'Les employés préfèrent travailler au bureau'),
  q('B2', "Le maire a annoncé que la construction du nouveau stade serait reportée à l'an prochain, faute de financement suffisant. L'opposition y voit un signe d'impréparation, tandis que la majorité invoque la hausse du coût des matériaux.", 'Comment la majorité justifie-t-elle le report ?', 'Par l\'augmentation du coût des matériaux', 'Par un manque de terrain', 'Par l\'opposition des habitants', 'Par un changement de maire'),
  q('B2', "Il est indéniable que les réseaux sociaux facilitent les échanges entre les individus. Néanmoins, certains psychologues redoutent qu'ils n'appauvrissent la qualité des relations réelles en substituant des interactions superficielles aux conversations approfondies.", 'Quelle crainte expriment les psychologues ?', 'Les relations réelles pourraient perdre en profondeur', 'Les réseaux sociaux coûtent trop cher', 'Les gens ne communiquent plus du tout', 'Les réseaux sociaux sont inaccessibles'),
  q('B2', "Alors que le prix de l'énergie ne cesse d'augmenter, les ménages les plus modestes sont les premiers touchés. Le gouvernement envisage d'étendre l'aide à la rénovation des logements, dont l'efficacité est jugée supérieure aux chèques ponctuels.", "Pourquoi le gouvernement envisage-t-il d'étendre l'aide à la rénovation ?", 'Elle est jugée plus efficace que des aides ponctuelles', 'Elle est moins chère à gérer', 'Elle est demandée par les propriétaires uniquement', "Elle remplace le prix de l'énergie"),
  q('B2', "L'auteure ne cache pas son scepticisme : selon elle, la réforme, présentée comme une simplification, risque au contraire d'alourdir les démarches administratives pour les petites entreprises.", "Quelle est la position de l'auteure ?", 'Elle craint que la réforme complique les démarches', 'Elle soutient pleinement la réforme', 'Elle pense que la réforme est déjà appliquée', "Elle ne s'intéresse pas aux entreprises"),
  q('B2', "Si les musées gratuits attirent davantage de visiteurs, cela ne signifie pas pour autant que le public se diversifie : les visiteurs restent majoritairement issus des milieux déjà familiers de la culture.", "Que veut démontrer l'auteur ?", 'La gratuité ne suffit pas à diversifier le public', "Les musées gratuits n'attirent personne", 'Tous les milieux visitent les musées', 'La culture est trop chère'),
  q('B2', "Quoique ce projet de loi ait été largement débattu, plusieurs associations déplorent l'absence de concertation avec les premiers concernés, qui n'ont, selon elles, été consultés qu'une fois le texte rédigé.", 'Que reprochent les associations ?', "Que les personnes concernées n'aient pas été consultées en amont", 'Que le texte soit trop court', "Que le projet n'ait pas été débattu", 'Que la loi soit déjà adoptée'),
];

// Compréhension orale : 25 questions — texte lu à voix haute (SpeechSynthesis)
const CO = [
  // A1
  q('A1', "Bonjour madame, je voudrais deux baguettes et un croissant, s'il vous plaît. — Voilà, ça fait trois euros cinquante.", 'Combien le client paie-t-il ?', '3,50 euros', '3 euros', '2,50 euros', '5 euros'),
  q('A1', "Allô ? C'est Sophie. Je ne peux pas venir ce soir, je suis malade. On se voit demain ?", 'Pourquoi Sophie ne peut-elle pas venir ?', 'Elle est malade', 'Elle travaille', 'Elle est en voyage', 'Elle est fatiguée'),
  q('A1', 'Le train pour Lyon part à quatorze heures quinze, quai numéro trois.', 'De quel quai part le train ?', 'Quai 3', 'Quai 2', 'Quai 13', 'Quai 5'),
  q('A1', 'Demain, il fera beau le matin, mais il pleuvra dans l\'après-midi. Les températures seront de dix-huit degrés.', "Quel temps fera-t-il l'après-midi ?", 'Il pleuvra', 'Il fera beau', 'Il y aura du vent', 'Il neigera'),
  q('A1', "Excusez-moi, où est la poste, s'il vous plaît ? — Tournez à gauche, c'est à cent mètres, à côté de la banque.", 'Où est la poste ?', 'À côté de la banque', 'En face de la gare', "À droite de l'école", 'Derrière la mairie'),
  // A2
  q('A2', "Bonjour, je vous appelle pour réserver une table pour quatre personnes, samedi soir, vers vingt heures. — Désolé, nous sommes complets à vingt heures, mais j'ai de la place à vingt et une heures.", 'À quelle heure une table est-elle disponible ?', '21 h', '20 h', '19 h', '22 h'),
  q('A2', "Ce week-end, j'ai fait du vélo avec mes amis, puis nous avons dîné chez ma sœur. Dimanche, je suis resté à la maison pour me reposer.", 'Que fait le narrateur dimanche ?', 'Il se repose à la maison', 'Il fait du vélo', 'Il dîne chez sa sœur', 'Il travaille'),
  q('A2', "Votre attention, s'il vous plaît. Le vol à destination de Madrid est retardé d'une heure en raison du brouillard. Nous vous remercions de votre patience.", 'Pourquoi le vol est-il retardé ?', 'À cause du brouillard', 'À cause d\'une grève', "À cause d'un problème technique", "À cause d'un orage"),
  q('A2', "Tu as vu mon nouveau téléphone ? Je l'ai acheté hier. Il est plus léger que l'ancien, mais il coûte beaucoup plus cher.", 'Quel est le défaut du nouveau téléphone ?', 'Il est cher', 'Il est trop lourd', 'Il est lent', 'Il est trop grand'),
  q('A2', "Le cours de yoga a lieu le mercredi à dix-huit heures. Pensez à apporter un tapis et une bouteille d'eau.", 'Que faut-il apporter ?', "Un tapis et une bouteille d'eau", 'Un maillot et une serviette', 'Des chaussures de sport', 'Un livre'),
  q('A2', "J'ai pris rendez-vous chez le médecin pour jeudi, mais j'ai un examen ce jour-là. Est-ce que je peux le déplacer à vendredi ? — Oui, vendredi à dix heures, c'est possible.", 'Quand aura lieu le rendez-vous ?', 'Vendredi à 10 h', 'Jeudi à 10 h', 'Vendredi à 18 h', 'Jeudi à 18 h'),
  // B1
  q('B1', "Je voulais vous dire que j'ai beaucoup apprécié le séjour, mais la chambre était bruyante à cause de la rue. Heureusement, le personnel a été très aimable et nous a proposé de changer de chambre.", "Qu'est-ce que la cliente a regretté ?", 'Le bruit', 'Le prix', 'Le personnel', 'La nourriture'),
  q('B1', "Si j'avais su que le musée fermait à dix-sept heures, je serais arrivé plus tôt. Maintenant, il faudra revenir demain.", 'Que va faire la personne ?', 'Elle reviendra demain', 'Elle va attendre', 'Elle ira dans un autre musée', 'Elle achètera un billet en ligne'),
  q('B1', "Depuis que j'ai changé d'alimentation, je me sens beaucoup mieux. Je mange moins de sucre et plus de légumes, et j'ai plus d'énergie le matin.", "Quel est le résultat du changement d'alimentation ?", "Il a plus d'énergie le matin", 'Il a perdu du poids', 'Il dort moins', 'Il mange moins souvent'),
  q('B1', "Le directeur nous a demandé de lui envoyer le rapport avant mercredi midi. Mais comme je n'ai pas toutes les données, je vais lui demander un délai supplémentaire.", 'Pourquoi la personne veut-elle un délai ?', 'Il lui manque des données', 'Elle est malade', 'Elle part en vacances', 'Le directeur est absent'),
  q('B1', "Mon quartier a beaucoup changé : on a construit une nouvelle ligne de tramway, ce qui est pratique, mais les loyers ont augmenté et certains voisins ont dû partir.", 'Quel effet négatif est mentionné ?', 'La hausse des loyers', 'Le bruit du tramway', 'La fermeture des commerces', 'La pollution'),
  q('B1', "Je pense que tu devrais postuler à cette offre. Ton profil correspond parfaitement, et même si tu n'as pas toute l'expérience demandée, ils apprécieront ta motivation.", 'Quel conseil est donné ?', 'Postuler à cette offre', 'Chercher une autre offre', 'Attendre un an', 'Refaire son CV'),
  q('B1', "Les inscriptions au concours sont ouvertes jusqu'au quinze mars. Il faut envoyer le dossier complet par courrier, aucun envoi par courriel ne sera accepté.", 'Comment faut-il envoyer le dossier ?', 'Par courrier', 'Par courriel', 'En personne', 'Par téléphone'),
  // B2
  q('B2', "Les experts estiment que la baisse du chômage, certes encourageante, masque une réalité plus nuancée : de nombreux emplois créés sont précaires, à temps partiel ou de courte durée.", 'Que nuancent les experts ?', 'La qualité des emplois créés', 'La hausse des salaires', 'Le nombre de chômeurs', 'Le coût de la vie'),
  q('B2', "Je ne suis pas contre l'idée de limiter la vitesse en ville, mais je doute que cette mesure, à elle seule, suffise à réduire la pollution. Il faudrait aussi développer les transports en commun.", "Quelle est l'opinion du locuteur ?", 'Il pense que la mesure seule est insuffisante', 'Il refuse toute limitation', 'Il veut supprimer les transports en commun', "Il n'a pas d'opinion"),
  q('B2', "La conférence, qui devait porter sur l'intelligence artificielle, s'est finalement concentrée sur ses enjeux éthiques, ce qui a suscité un débat très animé dans la salle.", "Que s'est-il passé pendant la conférence ?", 'Elle a été centrée sur les enjeux éthiques', 'Elle a été annulée', "Elle a porté sur l'économie", "Personne n'a posé de questions"),
  q('B2', "Quoi qu'on en dise, ce n'est pas la technologie qui pose problème, mais l'usage que l'on en fait. Un outil n'est ni bon ni mauvais en soi.", 'Que défend le locuteur ?', "Le problème vient de l'usage de la technologie", 'La technologie est dangereuse par nature', 'Il faut interdire certains outils', 'La technologie est toujours bénéfique'),
  q('B2', "Malgré les promesses du gouvernement, la réforme des retraites reste très controversée : les syndicats dénoncent un recul des droits acquis, tandis que les économistes estiment qu'elle est indispensable pour équilibrer les comptes.", 'Que pensent les économistes ?', 'La réforme est indispensable', 'La réforme est inutile', 'La réforme est trop généreuse', 'La réforme doit être abandonnée'),
  q('B2', "J'avoue que j'ai longtemps hésité avant de me lancer dans cette reconversion, mais avec le recul, c'est la meilleure décision que j'aie prise : je me sens enfin épanoui dans mon travail.", 'Comment le locuteur juge-t-il sa reconversion ?', 'Il la juge très positive', 'Il la regrette', 'Il hésite toujours', 'Il la trouve trop difficile'),
  q('B2', "Il serait souhaitable que les entreprises soient davantage sensibilisées aux enjeux environnementaux, faute de quoi les objectifs fixés à l'échelle nationale resteront hors d'atteinte.", 'Que se passera-t-il si les entreprises ne sont pas sensibilisées ?', 'Les objectifs ne seront pas atteints', 'Les entreprises paieront moins d\'impôts', 'La loi sera abandonnée', 'Le gouvernement changera'),
];

const withIds = (prefix, list) => list.map((item, i) => ({ id: `${prefix}${i + 1}`, ...item }));

export const EXAM_SECTIONS = {
  co: {
    key: 'co',
    label: 'فهم المسموع',
    labelFr: 'Compréhension orale',
    minutes: 15, // TCF IRN officiel (France Compétences RS6643)
    questions: withIds('eco', [...CO, ...CO_EXTRA]),
  },
  ce: {
    key: 'ce',
    label: 'فهم المقروء',
    labelFr: 'Compréhension écrite',
    minutes: 20, // TCF IRN officiel (France Compétences RS6643)
    questions: withIds('ece', [...CE, ...CE_EXTRA]),
  },
};

// Officiel : 20 questions par épreuve. La banque en contient 50 : on en tire 20 à chaque essai
// (répartition par niveau ci-dessous), ce qui varie aussi les sujets d'une tentative à l'autre.
export const EXAM_PICK = { A1: 3, A2: 5, B1: 6, B2: 6 };
export const EXAM_COUNT = Object.values(EXAM_PICK).reduce((a, b) => a + b, 0);

export const EXAM_LEVELS = ['A1', 'A2', 'B1', 'B2'];

// Estimation approximative (PAS un barème officiel) : on monte tant que ≥ 60 % du palier est réussi.
export const ESTIMATE_RATIO = 0.6;
