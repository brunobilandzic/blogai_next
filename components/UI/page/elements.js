export function PageItem({ children }) {
  return (
    <div className="p-4  rounded-lg shadow-sm hover:shadow-lg transition-shadow hover:cursor-pointer h-full">
      {children}
    </div>
  );
}


export const PlaceHolderPageItems = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PageItem key={index}>
          <div className="">Placeholder</div>
        </PageItem>
      ))}
    </>
  );
};