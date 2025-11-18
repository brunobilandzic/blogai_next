export function PageItem({ children }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow hover:cursor-pointer">
      {children}
    </div>
  );
}
