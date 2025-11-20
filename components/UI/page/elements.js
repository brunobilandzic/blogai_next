import { PlaceHolderPageItems } from "@/lib/constants";

export function PageItem({ children }) {
  return (
    <div className="p-4  rounded-lg shadow-sm hover:shadow-lg transition-shadow hover:cursor-pointer h-full">
      {children}
    </div>
  );
}
