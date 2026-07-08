export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={`mb-14 ${alignClass}`}>
      {eyebrow ? (
        <span className="badge-soft px-4 py-1.5 rounded-full text-sm font-semibold">{eyebrow}</span>
      ) : null}
      <h2 className="section-title mt-4">{title}</h2>
      {subtitle ? <p className="section-subtitle mt-3">{subtitle}</p> : null}
    </div>
  );
}
