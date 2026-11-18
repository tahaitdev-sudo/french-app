// Texte arabe (RTL) contenant du français (LTR) : un signe de ponctuation placé juste après
// un mot latin « saute » du mauvais côté (« .vieux » au lieu de « vieux. »).
// Une marque invisible LRM (U+200E) après la ponctuation la rattache au mot latin.

const LRM = '‎';

export const fixBidi = (text) =>
  typeof text === 'string'
    ? text.replace(/([A-Za-zÀ-ÿŒœ’')\]])([.,;:!?،؛])/gu, `$1$2${LRM}`)
    : text;
