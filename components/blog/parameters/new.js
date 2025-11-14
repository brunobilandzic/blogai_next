"use client";

import { useState } from "react";
import {
  defaultBlogParams,
  defaultChapterParams,
  testBlogParams,
} from "@/components/UI/forms/constants";
import { BlogParametersForm } from "@/components/UI/forms";

export default function NewParameters() {
  const [blogParams, setBlogParams] = useState(defaultBlogParams);

  const testPost = async () => {
    const response = await fetch("/api/blogs/parameters", {
        method: "POST",
        body: JSON.stringify(testBlogParams),
      });

      console.log("Response:", await response.json());
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
    const testPost = () => {
      fetch("/api/blogs/parameters", {
        method: "POST",
        body: JSON.stringify(blogParams),
      });
    };
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
    <button onClick={testPost}>Test Post</button>
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
