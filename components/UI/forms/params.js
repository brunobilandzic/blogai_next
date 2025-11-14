import { Input, TextArea, Select } from "./elements";
import { toneOptions, lengthOptions } from "./constants";

export const BlogParametersForm = ({
  blogParams,
  onChange,
  onChangeChapter,
  addNewChapter,
  onChangeSubChapter,
  onAddSubChapter,
}) => {
  return (
    <div>
      {JSON.stringify(blogParams)}

      {/* Form for blog parameters */}
      <div className="form">
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
        <div>
          <h3>Chapter Parameters</h3>
          {/* Chapter parameters form will go here */}
          {blogParams.chaptersParameters.map((chapter, i) => (
            <div key={i} className="chapter-form">
              <ChaptersParametersForm
                i={i + 1}
                key={i}
                chapterParams={chapter}
                onChange={(e) => onChangeChapter(i, e)}
              />
              <div>
                {chapter.subChapters.map((subChapter, j) => (
                  <Input
                    key={j}
                    type="text"
                    label={`Subchapter ${j + 1}`}
                    name={`subChapter-${j}`}
                    value={subChapter}
                    onChange={(e) => onChangeSubChapter(i, j, e)}
                  />
                ))}
                <button type="button" onClick={() => onAddSubChapter(i)}>
                  Add Subchapter
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addNewChapter}>
            Add New Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChaptersParametersForm = ({ chapterParams, onChange, i }) => {
  return (
    <div className="form">
      {/* Form for chapter parameters */}
      <Select
        label={`Length - Chapter ${i}`}
        name="length"
        value={chapterParams.length}
        onChange={onChange}
        options={lengthOptions}
      />
      <Input
        type="text"
        label={`Title - Chapter ${i}`}
        name="title"
        value={chapterParams.title}
        onChange={onChange}
      />
    </div>
  );
};
