import "../identity/hosts/auth.idfkit.com/lockup.css";

/**
 * The property lockup (FR-012), as the standard generates it for this host: the geometry and the
 * property name are in the vendored lockup.svg, and the vendored lockup.css paints it.
 */

interface Props {
  /** The property name the lockup carries, for its accessible name. */
  property: string;
  href?: string;
}

export function Lockup({ property, href = "/" }: Props) {
  return (
    <a
      className="idfkit-lockup"
      href={href}
      aria-label={`idfkit ${property}`}
    />
  );
}
