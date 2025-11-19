"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defaultBlogParams,
  defaultChapterParams,
  testBlogParams,
} from "@/components/UI/forms/constants";
import { BlogParametersForm } from "@/components/UI/forms/params";
import { BLOG_POST_PRICE } from "@/lib/constants";
import {
  getRemainingCredits,
  updateCredits,
} from "@/lib/store/features/appUserSlice";

export default function NewParameters() {
  const [blogParams, setBlogParams] = useState(testBlogParams);
  const dispatch = useDispatch();
  const remainingCredits = useSelector((state) => {
    const credits = getRemainingCredits(state);
    console.log("Initial remaining credits from store:", credits);
    return credits;
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (remainingCredits < BLOG_POST_PRICE) {
      alert("Insufficient credits to create a blog post.");
      return;
    }

    console.log("Submitting blog parameters:", blogParams);
    const response = await fetch("/api/blog/parameters", {
      method: "POST",
      body: JSON.stringify(blogParams),
    });
    const data = await response.json();
    console.log("Response daccta1:", data);
    if (response.status != 201) {
      alert(`Error: ${data.message}`);
      return;
    }

    /* alert("Blog parameters created successfully!"); */

    console.log("Response datatt2:", data);
    console.log("Updating credits in store:", data.remainingCredits);
    dispatch(updateCredits({ remainingCredits: data.remainingCredits }));

    setBlogParams(testBlogParams);
  };

  const onChange = (e) => {
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
      <div className="pt-2 pb-4 text-xl gap-4 grid grid-rows-1 relative">
        <div className="btn btn-action mx-auto" onClick={onSubmit}>
          Submit
        </div>
        <div className="self-center italic  absolute justify-self-end">
          {remainingCredits} <span className="text-sm">credits available</span>
        </div>
      </div>
    </>
  );
}
