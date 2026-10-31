/**
 * The property lockup (FR-012): the mark, the wordmark, a divider and the property name in the
 * label face. The mark and the wordmark are the masters of idfkit-brand/marks, in currentColor,
 * defined once as symbols in index.html (the sprite) and referenced here; the placement is the
 * standard's lockup (mark.py: the mark at twice its 48-unit grid, the wordmark at x 104 on the
 * baseline at 80). The sizes and the faces are in src/styles/app.css.
 */

interface Props {
  /** The property name set after the divider, for example "Sign in". */
  property: string;
  href?: string;
}

export function Lockup({ property, href = '/' }: Props) {
  return (
    <a className="idfkit-lockup" href={href} aria-label={`idfkit ${property}`}>
      <svg className="idfkit-mark" viewBox="0 0 338.36 80.78" aria-hidden="true" focusable="false">
        <use href="#idfkit-mark" x="-8" y="-8" width="96" height="96" />
        <use href="#idfkit-wordmark" x="104" y="2.61" width="234.36" height="78.17" />
      </svg>
      <span className="idfkit-lockup-divider" aria-hidden="true" />
      <span className="idfkit-lockup-name">{property}</span>
    </a>
  );
}
