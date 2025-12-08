"use client";

// page component for new blog parameters page

import BlogParametersForm from "@/components/UI/forms/parameters";
import { MdArrowDownward, MdOpenInNew } from "react-icons/md";
import { useRouter } from "next/navigation";

const NewParameters = () => (
  <div className="flex flex-col justify-center gap-2 pt-4   ">
    <NewParametersHeader />
    <BlogParametersForm />
  </div>
);

function NewParametersHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-end mb-2">
      <div className="font-bold flex items-center gap-2 text-xl">
        Manual{" "}
        <div className="mt-1">
          <MdArrowDownward />
        </div>
      </div>
      <div
        onClick={() => router.push("/blog/parameters/new/generate")}
        className="btn  flex items-center justify-end gap-2"
      >
        <div> AI generate</div>
        <div>
          {" "}
          <MdOpenInNew />
        </div>
      </div>
    </div>
  );
}


export default NewParameters;