export const Divider = ({ label }: { label?: string }) => (
  <div className="divider">{label && <span>{label}</span>}</div>
);