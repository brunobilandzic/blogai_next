import { PageItem } from "@/components/UI/page/elements";

export function BlogParametersList({ blogParametersList }) {
  console.log(`Fetched ${blogParametersList.length} blog parameters:`);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        {blogParametersList.map((params, i) => (
          <div key={i}>
            <PageItem>
              <BlogParameters blogParameters={params} />
            </PageItem>
          </div>
        ))}
      </div>{" "}
    </>
  );
}

export function BlogParameters({ blogParameters }) {
  return (
    <>
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="font-semibold text-lg mb-2">{blogParameters.theme}</div>
        <div className="mb-2">{blogParameters.description}</div>
        <div className="text-sm text-gray-600">
          {new Date(blogParameters.createdAt).toLocaleString("hr-HR")}
        </div>
      </div>
    </>
  );
}
