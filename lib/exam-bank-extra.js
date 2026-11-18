// Questions supplémentaires (originales) pour la simulation TCF IRN : 25 CO + 25 CE.
// Format : q(niveau, texte, question, bonneRéponse, ...troisMauvaises).

const q = (level, text, question, correct, ...wrong) => ({
  level,
  text,
  question,
  options: [correct, ...wrong],
  answer: 0,
});

// Compréhension orale (texte lu à voix haute)
export const CO_EXTRA = [
  // A1 (5)
  q('A1', "Bonjour, je voudrais un café et un verre d'eau, s'il vous plaît. — Bien sûr, ça fait quatre euros.", 'Combien coûte la commande ?', '4 euros', '3 euros', '14 euros', '2 euros'),
  q('A1', "Allô Marie ? C'est Tom. Je suis à la gare. Le train arrive dans dix minutes. Tu peux venir me chercher ?", 'Où est Tom ?', 'À la gare', "À l'aéroport", 'Chez Marie', 'Au travail'),
  q('A1', "Mesdames et messieurs, le magasin ferme dans dix minutes. Merci de vous diriger vers les caisses.", "Que doivent faire les clients ?", 'Aller aux caisses', 'Quitter le parking', 'Acheter des fruits', 'Attendre dehors'),
  q('A1', "Je m'appelle Karim, j'ai trois enfants : deux filles et un garçon. Ma femme travaille à l'hôpital.", 'Combien Karim a-t-il de filles ?', 'Deux', 'Trois', 'Une', 'Quatre'),
  q('A1', "Le cours de français commence à neuf heures et se termine à onze heures. Il y a une pause à dix heures.", 'À quelle heure commence le cours ?', 'À 9 heures', 'À 10 heures', 'À 11 heures', 'À 8 heures'),
  // A2 (6)
  q('A2', "Bonjour, j'ai un rendez-vous chez le docteur Martin à quinze heures trente. — Vous avez un peu de retard, il vous attend dans le bureau numéro cinq.", 'Où doit aller le patient ?', 'Au bureau 5', 'Au bureau 15', 'À la pharmacie', "À l'accueil"),
  q('A2', "Pour la fête de samedi, j'apporte un gâteau au chocolat. Peux-tu acheter les boissons ? Moi, je m'occupe de la musique.", "Qu'est-ce que la personne apporte ?", 'Un gâteau', 'Des boissons', 'Des fleurs', 'Des jeux'),
  q('A2', "Attention, en raison d'un incident, le métro ligne 4 est interrompu. Les voyageurs peuvent prendre le bus numéro 38.", 'Que peuvent faire les voyageurs ?', 'Prendre le bus 38', 'Attendre le métro', 'Prendre le tramway', 'Aller à pied'),
  q('A2', "J'ai cherché un appartement pendant trois mois. Finalement, j'en ai trouvé un près de mon travail, mais il est plus petit que l'ancien.", "Quel est l'inconvénient du nouvel appartement ?", 'Il est plus petit', 'Il est loin du travail', 'Il est trop cher', 'Il est bruyant'),
  q('A2', "Notre agence est ouverte du lundi au vendredi, de neuf heures à dix-huit heures, et le samedi matin uniquement.", "Quand l'agence est-elle ouverte le samedi ?", 'Le matin seulement', "Toute la journée", "L'après-midi seulement", "Elle est fermée"),
  q('A2', "Hier, je suis allé au marché. J'ai acheté des légumes et du fromage, mais les fruits étaient trop chers alors je n'en ai pas pris.", "Qu'est-ce que la personne n'a pas acheté ?", 'Des fruits', 'Des légumes', 'Du fromage', 'Du pain'),
  // B1 (7)
  q('B1', "Si vous souhaitez vous inscrire au cours de natation, il faut remplir le formulaire et fournir un certificat médical avant le premier septembre.", "Que faut-il fournir pour s'inscrire ?", 'Un certificat médical', 'Une photo', 'Un maillot', "Une pièce d'identité"),
  q('B1', "Je voulais changer de travail depuis longtemps, mais j'avais peur de perdre ma sécurité. Finalement, un ami m'a convaincu de passer l'entretien.", 'Qui a convaincu le locuteur ?', 'Un ami', 'Son patron', 'Sa femme', 'Un collègue'),
  q('B1', "Le festival de musique aura lieu du douze au quatorze juillet. Les billets sont en vente en ligne, et les enfants de moins de dix ans entrent gratuitement.", 'Qui peut entrer gratuitement ?', 'Les enfants de moins de dix ans', 'Les étudiants', 'Les personnes âgées', 'Les habitants de la ville'),
  q('B1', "Depuis que la mairie a ouvert un nouveau parc, les habitants du quartier s'y retrouvent chaque week-end pour faire du sport ou pique-niquer.", 'Que font les habitants au parc ?', 'Du sport ou un pique-nique', 'Des courses', 'Des réunions', 'Du jardinage'),
  q('B1', "Mon médecin m'a conseillé de dormir davantage et de marcher trente minutes par jour. Je n'ai pas encore commencé, mais je vais essayer dès demain.", 'Que va faire la personne ?', 'Essayer de suivre le conseil dès demain', 'Changer de médecin', 'Prendre des médicaments', 'Arrêter de travailler'),
  q('B1', "Je regrette que vous ne puissiez pas venir à la réunion, mais je comprends tout à fait. Je vous enverrai le compte rendu demain matin.", 'Que fera la personne demain matin ?', 'Envoyer le compte rendu', 'Organiser une réunion', 'Téléphoner au directeur', 'Annuler la réunion'),
  q('B1', "Le bus numéro vingt est souvent en retard parce que la circulation est dense aux heures de pointe. Il vaut mieux partir un peu plus tôt.", 'Pourquoi le bus est-il souvent en retard ?', 'À cause de la circulation', 'À cause des grèves', 'À cause du mauvais temps', 'À cause des travaux'),
  // B2 (7)
  q('B2', "Les chercheurs affirment que le télétravail améliore la satisfaction des salariés, à condition que l'entreprise fournisse un équipement adapté et maintienne le lien avec l'équipe.", 'À quelle condition le télétravail est-il bénéfique ?', "Si l'entreprise soutient les salariés", 'Si les salaires augmentent', 'Si les horaires sont fixes', 'Si le travail est facile'),
  q('B2', "Contrairement à ce que l'on croit souvent, ce n'est pas le manque de temps qui empêche les gens de lire, mais la multiplication des écrans qui capte leur attention.", "Qu'est-ce qui empêche les gens de lire selon le locuteur ?", 'La multiplication des écrans', 'Le manque de temps', 'Le prix des livres', "Le manque d'intérêt"),
  q('B2', "Le projet de loi prévoit de renforcer les contrôles, mais plusieurs associations craignent qu'il ne porte atteinte aux libertés individuelles.", 'Que craignent les associations ?', 'Une atteinte aux libertés', 'Une hausse des impôts', 'Un manque de contrôles', 'Une baisse des salaires'),
  q('B2', "Si l'on avait investi davantage dans les transports collectifs il y a dix ans, les villes seraient aujourd'hui moins polluées.", 'Que regrette le locuteur ?', "Le manque d'investissement passé", 'La hausse du prix du carburant', 'Le nombre de voitures neuves', 'La fermeture des gares'),
  q('B2', "Bien que la rénovation du quartier ait amélioré le cadre de vie, elle a aussi entraîné une hausse des loyers, obligeant certains habitants à déménager.", 'Quelle conséquence négative est évoquée ?', 'Des habitants ont dû partir', 'Le quartier est devenu dangereux', 'Les commerces ont fermé', 'La rénovation a été annulée'),
  q('B2', "Je suis plutôt favorable à cette réforme, même si je reconnais qu'elle ne résoudra pas tous les problèmes. C'est au moins un premier pas.", 'Quelle est la position du locuteur ?', 'Plutôt favorable, avec des réserves', 'Totalement opposé', 'Indifférent', 'Totalement convaincu'),
  q('B2', "Les chiffres du chômage, publiés ce matin, montrent une légère baisse, mais les économistes restent prudents car cette tendance pourrait ne pas durer.", 'Pourquoi les économistes sont-ils prudents ?', 'La tendance pourrait ne pas durer', 'Le chômage augmente', 'Les chiffres sont faux', 'Les salaires baissent'),
];

// Compréhension écrite
export const CE_EXTRA = [
  // A1 (5)
  q('A1', 'PHARMACIE CENTRALE — Ouverte de 9 h à 20 h, du lundi au samedi. Dimanche : pharmacie de garde.', 'Quand la pharmacie est-elle fermée ?', 'Le dimanche', 'Le samedi', 'Le lundi', 'Après 18 h'),
  q('A1', "Bonjour Léa, je suis au café en face de la bibliothèque. J'ai commandé un thé pour toi. Tu arrives quand ?", 'Où est la personne ?', 'Au café', 'À la bibliothèque', 'Au restaurant', 'Chez Léa'),
  q('A1', 'Piscine municipale : entrée adulte 4 euros, entrée enfant 2 euros. Gratuit pour les moins de 5 ans.', "Combien coûte l'entrée pour un adulte ?", '4 euros', '2 euros', 'Gratuit', '5 euros'),
  q('A1', 'Je cherche un colocataire pour mon appartement. Chambre libre dès le 1er mars. Loyer : 400 euros.', 'Que cherche la personne ?', 'Un colocataire', 'Un travail', 'Un appartement', 'Une voiture'),
  q('A1', "Message : « Je suis en retard, le bus est bloqué. J'arrive dans vingt minutes. Désolé ! »", 'Pourquoi la personne est-elle en retard ?', 'Le bus est bloqué', 'Elle est malade', 'Elle a oublié', 'Elle travaille'),
  // A2 (6)
  q('A2', "Cher client, votre colis sera livré mardi entre 14 h et 18 h. Si vous êtes absent, il sera déposé au bureau de poste le plus proche.", "Que se passe-t-il si le client est absent ?", 'Le colis est déposé à la poste', 'Le colis est renvoyé', 'Le livreur revient mercredi', 'Le colis est perdu'),
  q('A2', "La médiathèque propose cet été des ateliers gratuits pour les enfants de six à douze ans, chaque mercredi après-midi. Inscription sur place.", 'Quand ont lieu les ateliers ?', "Le mercredi après-midi", 'Le samedi matin', 'Chaque jour', "Le vendredi soir"),
  q('A2', "Pour renouveler votre carte d'identité, apportez deux photos récentes, un justificatif de domicile et votre ancienne carte.", "Quel document faut-il apporter en plus des photos ?", 'Un justificatif de domicile', "Un acte de naissance", 'Un passeport', 'Un certificat médical'),
  q('A2', "J'ai passé un très bon week-end à Nice. Nous avons visité la vieille ville et mangé dans un petit restaurant. Dommage, il a plu dimanche.", "Qu'est-ce qui a été désagréable ?", 'La pluie du dimanche', 'Le restaurant', 'Le voyage', 'La vieille ville'),
  q('A2', "Annonce : vends table de cuisine en bois, très bon état, 80 euros. À venir chercher chez moi, je ne peux pas la livrer.", "Que doit faire l'acheteur ?", 'Venir la chercher', 'Attendre la livraison', 'Payer en ligne', 'Négocier le prix'),
  q('A2', "Le cinéma Rex propose un tarif réduit le mardi : 5 euros la place au lieu de 9 euros. Ce tarif ne s'applique pas pendant les vacances.", 'Combien coûte la place le mardi (hors vacances) ?', '5 euros', '9 euros', '7 euros', 'Gratuit'),
  // B1 (7)
  q('B1', "Nous vous informons que, suite à des travaux, la piscine sera fermée du 3 au 17 juin. Les abonnements seront prolongés de la même durée.", 'Que deviennent les abonnements ?', 'Ils sont prolongés', 'Ils sont remboursés', 'Ils sont annulés', 'Ils sont suspendus sans compensation'),
  q('B1', "Je me suis inscrit à un cours du soir pour améliorer mon français. C'est fatigant après le travail, mais je progresse vite et j'ai déjà rencontré des gens sympathiques.", 'Quel est le bilan du locuteur ?', 'Fatiguant mais positif', 'Trop difficile', 'Inutile', 'Très cher'),
  q('B1', "La mairie lance une campagne pour encourager le tri des déchets : des poubelles de couleur seront distribuées aux habitants avant la fin du mois.", 'Quel est le but de la campagne ?', 'Encourager le tri des déchets', 'Réduire les impôts', 'Nettoyer les rues', 'Fermer des décharges'),
  q('B1', "Je vous écris pour vous signaler que l'ascenseur de notre immeuble est en panne depuis une semaine. Pourriez-vous faire intervenir un technicien rapidement ?", "Pourquoi la personne écrit-elle ?", 'Pour signaler une panne', 'Pour demander un loyer', 'Pour déménager', 'Pour se plaindre du bruit'),
  q('B1', "Le directeur a annoncé que les horaires de travail seront assouplis à partir de septembre : chacun pourra choisir son heure d'arrivée entre sept et dix heures.", "Qu'est-ce qui change en septembre ?", "L'heure d'arrivée est libre", 'La durée de travail diminue', 'Les salaires augmentent', 'Le lieu de travail change'),
  q('B1', "Quand j'étais enfant, nous passions toutes nos vacances chez mes grands-parents à la campagne. Aujourd'hui, je regrette de ne plus avoir le temps d'y retourner.", 'Que regrette le locuteur ?', "De manquer de temps pour y retourner", 'Son enfance difficile', 'Le départ de ses grands-parents', 'Le bruit de la ville'),
  q('B1', "Pour obtenir une réduction sur votre abonnement de transport, vous devez justifier de votre statut d'étudiant ou de demandeur d'emploi.", 'Qui peut obtenir la réduction ?', "Les étudiants et les demandeurs d'emploi", 'Tous les habitants', 'Les retraités seulement', 'Les salariés'),
  // B2 (7)
  q('B2', "Si le télétravail séduit de nombreux salariés, certains managers redoutent une perte de cohésion d'équipe et peinent à évaluer le travail à distance.", 'Que redoutent certains managers ?', "Une perte de cohésion d'équipe", 'Une hausse des salaires', 'Un manque de matériel', 'Des départs en masse'),
  q('B2', "À en croire les sondages, une majorité de Français souhaiterait une réforme de l'école, sans toutefois s'accorder sur les mesures à adopter.", 'Sur quoi les Français ne sont-ils pas d\'accord ?', 'Sur les mesures à adopter', "Sur l'utilité de l'école", 'Sur le coût de la réforme', 'Sur la date de la réforme'),
  q('B2', "Loin de constituer un obstacle, la diversité linguistique est considérée par de nombreux chercheurs comme une richesse susceptible de stimuler la créativité.", 'Comment les chercheurs voient-ils la diversité linguistique ?', 'Comme une richesse', 'Comme un obstacle', 'Comme un risque', 'Comme une charge'),
  q('B2', "Faute de moyens suffisants, la bibliothèque a dû réduire ses horaires d'ouverture, ce qui a suscité l'indignation de nombreux usagers.", "Pourquoi la bibliothèque a-t-elle réduit ses horaires ?", 'Elle manque de moyens', 'Elle manque de lecteurs', 'Elle est en travaux', 'Elle a déménagé'),
  q('B2', "Il est vrai que cette méthode donne de bons résultats ; néanmoins, elle exige une organisation rigoureuse que tout le monde ne peut pas assumer.", "Quelle réserve l'auteur formule-t-il ?", 'Elle exige une organisation rigoureuse', 'Elle donne de mauvais résultats', 'Elle est trop chère', 'Elle est dangereuse'),
  q('B2', "Aussi surprenant que cela puisse paraître, les jeunes lisent davantage qu'on ne le pense, mais sur des supports numériques plutôt que sur papier.", 'Que constate le texte ?', 'Les jeunes lisent sur des supports numériques', "Les jeunes ne lisent plus", 'Les livres papier se vendent mieux', 'Les jeunes détestent lire'),
  q('B2', "Alors que le gouvernement se félicite d'une croissance supérieure aux prévisions, l'opposition juge que cette amélioration profite surtout aux plus aisés.", "Que reproche l'opposition ?", 'Que la croissance profite surtout aux plus aisés', "Que la croissance soit trop faible", 'Que le gouvernement ne fasse rien', 'Que les prévisions soient fausses'),
];
