import { PageItem } from "@/components/UI/page/elements";
import Link from "next/link";

export default function BlogParametersList({ blogParametersList }) {
  console.log(`Fetched ${blogParametersList.length} blog parameters:`);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        {blogParametersList.map((params, i) => (
          <div key={i}>
            <Link href={`/blog/parameters/${params._id}`}>
              <PageItem>
                <BlogParametersTile blogParameters={params} />
              </PageItem>
            </Link>
          </div>
        ))}
      </div>{" "}
    </>
  );
}

export function BlogParametersTile({ blogParameters }) {
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
