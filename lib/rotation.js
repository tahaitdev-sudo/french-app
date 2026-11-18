// Tirage « sans répétition tant que possible » : mémorise (localStorage) les sujets déjà vus
// pour qu'une nouvelle tentative propose d'abord des sujets inédits.

const KEY = (name) => `fr-seen-${name}`;

const read = (name) => {
  try {
    return JSON.parse(localStorage.getItem(KEY(name)) || '[]');
  } catch {
    return [];
  }
};

const write = (name, ids) => {
  try {
    localStorage.setItem(KEY(name), JSON.stringify(ids));
  } catch {
    /* stockage indisponible : on tire simplement au hasard */
  }
};

const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// items : objets avec un `id`. Retourne `count` éléments, en privilégiant ceux non vus.
export function pickFresh(items, count, name) {
  let seen = read(name).filter((id) => items.some((it) => it.id === id));
  let fresh = shuffle(items.filter((it) => !seen.includes(it.id)));

  let picked = fresh.slice(0, count);
  if (picked.length < count) {
    // banque épuisée : on recommence un cycle en complétant avec des sujets déjà vus
    const others = shuffle(items.filter((it) => !picked.includes(it)));
    picked = [...picked, ...others.slice(0, count - picked.length)];
    seen = [];
  }
  write(name, [...seen, ...picked.map((p) => p.id)]);
  return picked;
}
