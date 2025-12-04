"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  defaultBlogParameters,
  defaultChapterParams,
  testBlogParameters,
  testChapterParameters,
} from "./constants";
import { PromptText } from "@/components/blog/parameters";
import { Input, TextArea, Select } from "./elements";
import { defaultBlogParamsDesc, testBlogParamsDesc } from "./constants";
import { MdAddCircle, MdDelete } from "react-icons/md";

export default function BlogParametersForm({ _blogParameters }) {
  const [blogParameters, setBlogParams] = useState(
    _blogParameters || testBlogParameters
  );
  const [editPromptText, setEditPromptText] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/blog/parameters", {
      method: "POST",
      body: JSON.stringify(blogParameters),
    });
    const { message, blogParametersId, blogPostId, remainingCredits } =
      await res.json();

    alert(
      `${message}
    Remaining credits: ${
      typeof remainingCredits !== "undefined" ? remainingCredits : "N/A"
    }${blogPostId ? "\nA blog post was generated." : ""}`
    );

    router.push(`/blog/parameters/${blogParametersId}`);
  };

  const onPut = async (e) => {
    e.preventDefault();

    if (!blogParameters?._id) {
      alert("No blog parameters ID found for update.");
      return;
    }
    const res = await fetch(
      `/api/blog/parameters`,
      {
        method: "PUT",
        body: JSON.stringify(blogParameters),
      },
      { cache: "no-store" }
    );
    if (res.status !== 200) {
      const { errors } = await res.json();
      return alert(
        `Failed to update blog parameters: ${errors
          ?.map((e) => e.message)
          .join(", ")}`
      );
    }

    const { message, blogParametersId, remainingCredits, blogPostId } =
      await res.json();

    alert(`${message}
    Remaining credits: ${
      typeof remainingCredits !== "undefined" ? remainingCredits : "N/A"
    }\nBlog Post ID: ${blogPostId ? blogPostId : "No blog post generated."}`);
    router.push(`/blog/parameters/${blogParametersId}`);
    router.refresh();
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
    const updatedChapters = blogParameters.chaptersParameters.map(
      (chapter, i) => (i === index ? { ...chapter, [name]: value } : chapter)
    );
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: updatedChapters,
    }));
  };

  const addNewChapter = () => {
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: [...prev.chaptersParameters, testChapterParameters],
    }));
  };

  const onChangeSubChapter = (chapterIndex, subChapterIndex, e) => {
    const { value } = e.target;

    const updatedChapters = blogParameters.chaptersParameters.map(
      (chapter, i) => {
        if (i === chapterIndex) {
          const updatedSubChapters = chapter.subChapters.map((subChapter, j) =>
            j === subChapterIndex ? value : subChapter
          );
          return { ...chapter, subChapters: updatedSubChapters };
        }
        return chapter;
      }
    );
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: updatedChapters,
    }));
  };

  const onAddSubChapter = (chapterIndex) => {
    const updatedChapters = blogParameters.chaptersParameters.map(
      (chapter, i) => {
        if (i === chapterIndex) {
          return {
            ...chapter,
            subChapters: [...chapter.subChapters, ""],
          };
        }
        return chapter;
      }
    );
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: updatedChapters,
    }));
  };

  const onRemoveChapter = (chapterIndex) => {
    const updatedChapters = blogParameters.chaptersParameters.filter(
      (chapter, i) => i !== chapterIndex
    );
    setBlogParams((prev) => ({
      ...prev,
      chaptersParameters: updatedChapters,
    }));
  };

  const onRemoveSubChapter = (chapterIndex, subChapterIndex) => {
    setBlogParams((prev) => {
      const updatedChapters = prev.chaptersParameters.map((chapter, i) => {
        if (i !== chapterIndex) return chapter;
        const updatedSubChapters = chapter.subChapters.filter(
          (_, j) => j !== subChapterIndex
        );
        return { ...chapter, subChapters: updatedSubChapters };
      });
      return { ...prev, chaptersParameters: updatedChapters };
    });
  };

  return (
    <div className="w-full">
      {/* Form for blog parameters */}
      <div className="flex flex-col gap-4">
        <Input
          label="Theme"
          type="text"
          name="theme"
          value={blogParameters.theme}
          onChange={onChange}
        />
        <TextArea
          label="Description"
          name="description"
          value={blogParameters.description}
          onChange={onChange}
        />
        <Input
          label="Audience"
          type="text"
          name="audience"
          value={blogParameters.audience}
          onChange={onChange}
        />
        <Select
          label="Tone"
          name="tone"
          value={blogParameters.tone}
          onChange={onChange}
          options={toneOptions}
        />
        <Select
          label="Length"
          name="length"
          value={blogParameters.length}
          onChange={onChange}
          options={lengthOptions}
        />
        <div onClick={addNewChapter} className="fsc gap-6 pt-2 pb-3 text-2xl">
          <h3 className="font-semibold">Chapters</h3>
          <div className="text-2xl cursor-pointer hover:text-gray-800">
            <MdAddCircle />
          </div>
        </div>
        {/* Chapter parameters form will go here */}
        {blogParameters.chaptersParameters.map((chapter, i) => (
          <div key={i} className="">
            {" "}
            <div className="flex flex-col gap-4">
              <div className="flex justify-start items-center gap-4 ">
                <h3 className="font-semibold ">
                  Chapter {i + 1} - {chapter.title}
                </h3>
                <div
                  className="cursor-pointer hover:text-red-800"
                  onClick={() => onRemoveChapter(i)}
                >
                  <MdDelete className="text-2xl" />
                </div>
              </div>
              <div key={i} className="flex flex-col gap-4">
                <ChaptersParametersForm
                  i={i + 1}
                  key={i}
                  chapterParams={chapter}
                  onChange={(e) => onChangeChapter(i, e)}
                  onRemove={() => onRemoveChapter(i)}
                />
                <div className="flex  gap-4">
                  <div className="flex flex-col gap-2 w-8/12 self-end">
                    {chapter.subChapters.map((subChapter, j) => (
                      <div key={j} className="flex items-center">
                        <Input
                          type="text"
                          label={`Subchapter ${j + 1}`}
                          name={`subChapter-${j + 1}`}
                          value={subChapter}
                          onChange={(e) => onChangeSubChapter(i, j, e)}
                        />
                        <div
                          className="-ml-7 cursor-pointer hover:text-red-800"
                          onClick={() => onRemoveSubChapter(i, j)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <div
                      onClick={() => onAddSubChapter(i)}
                      className="fcc text-2xl cursor-pointer hover:text-green-800"
                    >
                      <MdAddCircle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <div
            className={`btn ${editPromptText ? "btn-active" : "btn-inactive"}`}
            onClick={() => setEditPromptText(!editPromptText)}
          >
            {editPromptText ? "Hide Prompt Text Editor" : "Edit Prompt Text"}
          </div>
          {editPromptText && (
            <PromptText
              promptText={blogParameters.promptText}
              onChange={onChange}
              edit={true}
            />
          )}
        </div>
      </div>

      <div className="pt-4 pb-4 text-xl gap-4 fcc">
        <div
          className="btn btn-action mx-auto"
          onClick={_blogParameters?._id ? onPut : onSubmit}
        >
          {_blogParameters?._id
            ? "Update Blog Parameters"
            : "Create Blog Parameters"}
        </div>
      </div>
    </div>
  );
}

export const ChaptersParametersForm = ({
  chapterParams,
  onChange,
  i,
  onRemoveChapter,
}) => {
  return (
    <div className="form">
      {/* Form for chapter parameters */}

      <Input
        type="text"
        label={`Title`}
        name="title"
        value={chapterParams.title}
        onChange={onChange}
      />

      <Select
        label={`Length`}
        name="length"
        value={chapterParams.length}
        onChange={onChange}
        options={lengthOptions}
      />
    </div>
  );
};

export const AIGenerateParametersForm = ({ onGenerate } = {}) => {
  const [paramsDesc, setParamsDesc] = useState(testBlogParamsDesc);

  const handleGenerate = async () => {};

  return (
    <div className="form">
      <h4 className="font-semibold pb-2">AI Prompt Builder</h4>

      <Input
        label="Theme"
        type="text"
        name="ai-theme"
        value={paramsDesc.theme}
        onChange={(e) =>
          setParamsDesc({ ...paramsDesc, theme: e.target.value })
        }
      />

      <Input
        label="Audience"
        type="text"
        name="ai-audience"
        value={paramsDesc.audience}
        onChange={(e) =>
          setParamsDesc({ ...paramsDesc, audience: e.target.value })
        }
      />

      <TextArea
        label="Description"
        name="ai-description"
        value={paramsDesc.description}
        onChange={(e) =>
          setParamsDesc({ ...paramsDesc, description: e.target.value })
        }
      />

      <div className="pt-3 fcc gap-2">
        <div className="btn btn-action" onClick={handleGenerate}>
          Create Blog Parameters with AI
        </div>
      </div>
    </div>
  );
};
