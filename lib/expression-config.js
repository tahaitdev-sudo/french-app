// Valeurs du TCF IRN d'après la fiche France Compétences RS6643 :
//  - expression écrite : 30 minutes, 3 tâches
//    (1: message décrivant un objet, 2: récit d'activités sociales/professionnelles, 3: donner son avis)
//  - expression orale : 10 minutes, 3 questions posées par un examinateur (entretien individuel)
// Les répartitions internes (préparation, durée par tâche) ne figurent pas sur la fiche : valeurs provisoires.

export const EE_CONFIG = {
  minutes: 30,
};

export const EO_CONFIG = {
  tasks: 3,
  prepSeconds: 15, // PROVISOIRE : simple temps de mise en route avant l'enregistrement
  speakSeconds: [120, 180, 300], // PROVISOIRE : total 10 minutes, répartition indicative
};
