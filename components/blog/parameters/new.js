"use client";

// page component for new blog parameters page

import BlogParametersForm, {
  AIGenerateParametersForm,
} from "@/components/UI/forms/parameters";
import { MdArrowDownward, MdArrowForward, MdOpenInNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewParameters = () => {
  const [generate, setGenerate] = useState(false);
  return (
    <div className="flex flex-col justify-center gap-2 pt-4   ">
      <NewParametersHeader generate={generate} setGenerate={setGenerate} />
      {generate ? <AIGenerateParametersForm /> : <BlogParametersForm />}
    </div>
  );
};

export function NewParametersHeader({ generate, setGenerate }) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-end mb-2">
      <div
        onClick={() => setGenerate(!generate)}
        className="btn  flex items-center justify-end gap-2"
      >
        Manual{" "}
        {generate ? (
          <div className="mt-1">
            <MdArrowForward />
          </div>
        ) : (
          <div className="mt-1">
            <MdArrowDownward />
          </div>
        )}
      </div>
      <div
        onClick={() => setGenerate(!generate)}
        className="btn  flex items-center justify-end gap-2"
      >
        <div> AI generate</div>
        {generate ? (
          <div className="mt-1">
            <MdArrowDownward />
          </div>
        ) : (
          <div className="mt-1">
            <MdArrowForward />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewParameters;
