"use client";

import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { Input, TextArea, Select } from "./elements";
import {
  testBlogParameters,
  testChapterParameters,
  toneOptions,
  lengthOptions,
  testBlogParamsDesc,
  defaultBlogParamsDesc,
} from "./constants";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { arrayHasEmptyObjects } from "@/lib/validators";
import { Prompt } from "@/components/blog/parameters";
import { useDispatch, useSelector } from "react-redux";
import { LoadingContext } from "@/lib/store/context/loadingContext";
import {
  offLoading,
  setLoading,
  setEarlyRequest,
  testLoadingState,
} from "@/lib/store/features/loadingSlice";
import {
  GENERATE_PARAMS_AI_NOBLOG_TIME,
  GENERATE_PARAMS_MANUAL_BLOG_TIME,
} from "@/lib/constants";
import axios from "axios";
import { waitForLoading } from "../loading";

export default function BlogParametersForm({ _blogParameters }) {
  const [blogParameters, setBlogParams] = useState(
    _blogParameters || testBlogParameters
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const abortRef = useRef(null);
  const { setOnStop } = useContext(LoadingContext);
  const { percentage } = useSelector((state) => state.loading);
  const percentageRef = useRef(percentage);

  const testLoading = () => {
    abortRef.current = new AbortController();

    setOnStop(() => () => {
      dispatch(offLoading());
    });

    dispatch(setLoading(testLoadingState));
    setTimeout(async () => {
      dispatch(setEarlyRequest(true));
      await waitForLoading();
      dispatch(offLoading());
    }, 3000);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    abortRef.current = new AbortController();

    setOnStop(() => () => {
      abortRef.current.abort();
    });
    dispatch(
      setLoading({
        isLoading: true,
        message: "Creating blog parameters...",
        generationTime: GENERATE_PARAMS_MANUAL_BLOG_TIME,
        earlyRequest: false,
        percentage: 0,
      })
    );
    try {
      const response = await axios.post(
        `/api/blog/parameters`,
        {
          ...blogParameters,
        },
        { signal: abortRef.current.signal }
      );

      const {
        message,
        blogParametersId,
        blogPostId,
        remainingCredits,
        generationTime,
      } = response.data;

      dispatch(setEarlyRequest(true));
      await waitForLoading();

      alert(
        `${message}
    Remaining credits: ${
      typeof remainingCredits !== "undefined" ? remainingCredits : "N/A"
    }${blogPostId ? "\nA blog post was generated." : ""}\nGeneration time: ${
          generationTime ? generationTime / 1000 : "N/A"
        } s`
      );
      dispatch(offLoading());
      setOnStop(() => () => {});

      router.push(`/blog/parameters/${blogParametersId}`);
    } catch (error) {
      if (error.name === "CanceledError" || error.message === "canceled") {
        alert("Blog generation was cancelled.");
        dispatch(offLoading());
        setOnStop(() => () => {});
        return;
      } else {
        alert("An error occurred during blog generation.");
      }
    }
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
      (_, i) => i !== chapterIndex
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
      <div className="btn" onClick={testLoading}>
        Test Loading State
      </div>
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
        <div className="p-4  rounded-lg mt-4 ">
          <Prompt
            edit={true}
            promptComment={blogParameters.promptComment}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

const ChaptersParametersForm = ({ chapterParams, onChange }) => {
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
  const [paramsDescs, setParamsDescs] = useState([testBlogParamsDesc]);
  const abortRef = useRef(null);
  const { setOnStop } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    abortRef.current = new AbortController();

    setOnStop(() => () => {
      abortRef.current.abort();
    });
    dispatch(
      setLoading({
        isLoading: true,
        message: "Generating blog parameters...",
        generationTime: GENERATE_PARAMS_AI_NOBLOG_TIME,
      })
    );
    if (arrayHasEmptyObjects(paramsDescs))
      return alert("Please fill in all fields before generating.");

    try {
      const response = await axios.post(
        `/api/blog/parameters/generate`,
        {
          paramsDescs: paramsDescs,
        },
        { signal: abortRef.current.signal }
      );
      const { message, blogParametersThemes, generationTime } = response.data;
      dispatch(setEarlyRequest(true));
      await waitForLoading();
      alert(
        `${message}
    Generated Blog Parameters themes: ${blogParametersThemes.join(
      ", "
    )}, Generation time: ${generationTime ? generationTime : "N/A"} s`
      );
      dispatch(offLoading());
    } catch (error) {
      if (error.name === "CanceledError" || error.message === "canceled") {
        alert("Blog parameters generation was cancelled.");
        dispatch(offLoading());
      }
    }
  };

  const onChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParamsDescs = paramsDescs.map((paramsDesc, i) =>
      i === index ? { ...paramsDesc, [name]: value } : paramsDesc
    );
    setParamsDescs(updatedParamsDescs);
  };

  const onAddParametersDesc = () => {
    setParamsDescs((prev) => [...prev, testBlogParamsDesc]);
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold pb-2  text-3xl pt-4">AI Prompt Builder</h4>

      {paramsDescs.map((paramsDesc, index) => {
        return (
          <div key={index} className="mb-4 flex flex-col gap-2">
            <div className="text-gray-700">
              Parameters description {index + 1}
            </div>
            <div key={index} className="flex flex-col gap-4">
              <Input
                label="Theme"
                type="text"
                name="theme"
                value={paramsDesc.theme}
                onChange={(e) => onChange(index, e)}
              />

              <TextArea
                label="Description"
                name="description"
                value={paramsDesc.description}
                onChange={(e) => onChange(index, e)}
              />

              <Input
                label="Audience"
                type="text"
                name="audience"
                value={paramsDesc.audience}
                onChange={(e) => onChange(index, e)}
              />

              <TextArea
                label="Prompt Comment"
                name="promptComment"
                value={paramsDesc.promptComment}
                onChange={(e) => onChange(index, e)}
              />
            </div>
          </div>
        );
      })}
      <div
        onClick={onAddParametersDesc}
        className="btn flex items-center gap-2"
      >
        <div>Add New Blog Parameters Description</div>
        <MdAddCircle className="text-3xl" />
      </div>

      <div className="pt-3 fcc gap-2">
        <div className="btn btn-action" onClick={onSubmit}>
          Create Blog Parameters with AI
        </div>
      </div>
    </div>
  );
};
