import BlogParametersForm from "@/components/UI/forms/parameters";
import { MdArrowDownward, MdOpenInNew } from "react-icons/md";

const New = () => (
  <div className="flex flex-col justify-center gap-2 pt-4   ">
    <NewParametersHeader />
    <BlogParametersForm />
  </div>
);

export default New;

export function NewParametersHeader(params) {
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold flex items-center gap-2 text-xl">
        New Parameters Manual{" "}
        <div className="mt-1">
          <MdArrowDownward />
        </div>
      </div>
      <div className="btn  flex items-center justify-end gap-2">
        <div> AI generate</div>
        <div>
          {" "}
          <MdOpenInNew />
        </div>
      </div>
    </div>
  );
}
