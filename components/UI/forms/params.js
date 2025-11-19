import { Input, TextArea, Select } from "./elements";
import { toneOptions, lengthOptions } from "./constants";
import { MdAddCircle, MdDelete } from "react-icons/md";

export const BlogParametersForm = ({
  blogParams,
  onChange,
  onChangeChapter,
  addNewChapter,
  onChangeSubChapter,
  onAddSubChapter,
}) => {
  return (
    <div className="w-full">
      {/* Form for blog parameters */}
      <div className="flex flex-col gap-4">
        <Input
          label="Theme"
          type="text"
          name="theme"
          value={blogParams.theme}
          onChange={onChange}
        />
        <TextArea
          label="Description"
          name="description"
          value={blogParams.description}
          onChange={onChange}
        />
        <Input
          label="Audience"
          type="text"
          name="audience"
          value={blogParams.audience}
          onChange={onChange}
        />
        <Select
          label="Tone"
          name="tone"
          value={blogParams.tone}
          onChange={onChange}
          options={toneOptions}
        />
        <Select
          label="Length"
          name="length"
          value={blogParams.length}
          onChange={onChange}
          options={lengthOptions}
        />
        <div onClick={addNewChapter} className="fsc gap-6 pt-8 pb-4 text-2xl">
          <h3 className="font-semibold  px-2">Chapters</h3>
          <div className="text-2xl cursor-pointer hover:text-gray-800">
            <MdAddCircle />
          </div>
        </div>
        {/* Chapter parameters form will go here */}
        {blogParams.chaptersParameters.map((chapter, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="font-semibold  px-2">Chapter {i + 1}</h3>
            <ChaptersParametersForm
              i={i + 1}
              key={i}
              chapterParams={chapter}
              onChange={(e) => onChangeChapter(i, e)}
            />
            <div className="fst gap-4">
              <div className="flex flex-col gap-2 w-8/12 self-end">
                {chapter.subChapters.map((subChapter, j) => (
                  <div className="flex items-center">
                    <Input
                      key={j}
                      type="text"
                      label={`Subchapter ${j + 1}`}
                      name={`subChapter-${j + 1}`}
                      value={subChapter}
                      onChange={(e) => onChangeSubChapter(i, j, e)}
                    />
                    <div className="-ml-7">
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <div
                  onClick={() => onAddSubChapter(i)}
                  className="fcc text-2xl cursor-pointer hover:text-gray-800"
                >
                  <MdAddCircle />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChaptersParametersForm = ({ chapterParams, onChange, i }) => {
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
