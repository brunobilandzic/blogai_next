import React from "react";
import BlogParametersForm from "./New";

function EditParameters({ blogParams }) {
  return (
    <div>
      <BlogParametersForm _blogParams={blogParams} />
    </div>
  );
}

export default EditParameters;
