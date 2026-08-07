/**
 * Reusable button. `as="a"` renders an anchor (for external/WhatsApp links),
 * otherwise renders a <button>. variant maps to the shared .btn-* classes
 * defined in src/styles/buttons.css.
 */
export default function Button({
  as = 'button',
  variant = 'primary', // primary | ghost | outline | outline-dark
  size, // 'small' | undefined
  href,
  target,
  onClick,
  disabled,
  children,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn-${variant}`, size === 'small' ? 'btn-small' : '', className]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
