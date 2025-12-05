export function ShowText({ label, text }) {
  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold mb-1">{label}</label>
      <div className="border rounded-sm p-2 whitespace-pre-wrap">{text}</div>
    </div>
  );
}
