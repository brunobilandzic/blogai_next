"use client";

import { useState } from "react";
import {
  defaultBlogParams,
  defaultChapterParams,
  testBlogParams,
} from "@/components/UI/forms/constants";
import { BlogParametersForm } from "@/components/UI/forms/params";

export default function NewParameters() {
  const [blogParams, setBlogParams] = useState(testBlogParams);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/blogs/parameters", {
      method: "POST",
      body: JSON.stringify(blogParams),
    });

    console.log("Response:", response.status);    
  };

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
    const updatedChapters = blogParams.chaptersParameters.map((chapter, i) =>
      i === index ? { ...chapter, [name]: value } : chapter
    );
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: updatedChapters,
    }));
  };

  const addNewChapter = () => {
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: [...prev.chaptersParameters, defaultChapterParams],
    }));
  };

  const onChangeSubChapter = (chapterIndex, subChapterIndex, e) => {
    const { value } = e.target;

    const updatedChapters = blogParams.chaptersParameters.map((chapter, i) => {
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
      chaptersParameters: updatedChapters,
    }));
  };

  const onAddSubChapter = (chapterIndex) => {
    const updatedChapters = blogParams.chaptersParameters.map((chapter, i) => {
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
      chaptersParameters: updatedChapters,
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
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
