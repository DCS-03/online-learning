export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`card-3d bg-white rounded-3xl border border-gray-100/50 ${className}`} {...props}>
      {children}
    </div>
  );
}
