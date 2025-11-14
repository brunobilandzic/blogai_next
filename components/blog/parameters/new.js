"use client";

import { useState } from "react";
import {
  defaultBlogParams,
  defaultChapterParams,
} from "@/components/UI/forms/constants";
import { BlogParametersForm } from "@/components/UI/forms";

export default function NewParameters() {
  const [blogParams, setBlogParams] = useState(defaultBlogParams);

  const onChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setBlogParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeChapter = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = blogParams.chapterParameters.map((chapter, i) =>
      i === index ? { ...chapter, [name]: value } : chapter
    );
    setBlogParams((prev) => ({
      ...prev,
      chapterParameters: updatedChapters,
    }));
  };

  const addNewChapter = () => {
    setBlogParams((prev) => ({
      ...prev,
      chapterParameters: [...prev.chapterParameters, defaultChapterParams],
    }));
  };

  return (
    <BlogParametersForm
      blogParams={blogParams}
      onChange={onChange}
      onChangeChapter={onChangeChapter}
        addNewChapter={addNewChapter}
    />
  );
}
