// Texte français dans une page RTL : on force la direction LTR et la langue.
export default function Fr({ children, className = '' }) {
  return (
    <span lang="fr" dir="ltr" className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
