import { PageItem } from "@/components/UI/page/elements";
import { PlaceHolderPageItems } from "@/lib/constants";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

export default function BlogParametersList({ blogParametersList }) {
  console.log(`Fetched ${blogParametersList.length} blog parameters:`);

  return (
    <>
      <div className="tiles-grid">
        {blogParametersList.map((params, i) => (
          <div key={i} >
            <Link href={`/blog/parameters/${params._id}`}>
              <PageItem>
                <BlogParametersTile blogParameters={params} />
              </PageItem>
            </Link>
          </div>
        ))}
        <PlaceHolderPageItems count={5} />

        <Link href="/blog/parameters/new">
          <div className="text-5xl h-full flex justify-start items-center w-fit">
            <MdAdd />
          </div>
        </Link>
      </div>
    </>
  );
}

export function BlogParametersTile({ blogParameters }) {
  return (
    <>
      <div>
        <div className="font-semibold text-lg mb-2">{blogParameters.theme}</div>
        <div className="mb-2">{blogParameters.description}</div>
        <div className="text-sm text-gray-600">
          {new Date(blogParameters.createdAt).toLocaleString("hr-HR")}
        </div>
      </div>
    </>
  );
}
