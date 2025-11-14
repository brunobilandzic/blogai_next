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

  const onChangeSubChapter = (chapterIndex, subChapterIndex, e) => {
    const { value } = e.target;

    const updatedChapters = blogParams.chapterParameters.map((chapter, i) => {
      if (i === chapterIndex) {
        const updatedSubChapters = chapter.subChapters.map((subChapter, j) =>
          j === subChapterIndex ? value : subChapter
        );
        return { ...chapter, subChapters: updatedSubChapters };
      }
      return chapter;
    });
    setBlogParams((prev) => ({
      ...prev,
      chapterParameters: updatedChapters,
    }));
  };

  const onAddSubChapter = (chapterIndex) => {
    const updatedChapters = blogParams.chapterParameters.map((chapter, i) => {
      if (i === chapterIndex) {
        return {
          ...chapter,
          subChapters: [...chapter.subChapters, ""],
        };
      }
      return chapter;
    });
    setBlogParams((prev) => ({
      ...prev,
      chapterParameters: updatedChapters,
    }));
  };

  return (
    <>
      <BlogParametersForm
        blogParams={blogParams}
        onChange={onChange}
        onChangeChapter={onChangeChapter}
        addNewChapter={addNewChapter}
        onChangeSubChapter={onChangeSubChapter}
        onAddSubChapter={onAddSubChapter}
      />
    </>
  );
}
