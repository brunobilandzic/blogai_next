import { defaultBlogParams, lengthOptions, toneOptions } from "./constants";

export const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export const TextArea = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea id={name} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option key="zero" value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const BlogParametersForm = ({
  blogParams,
  onChange,
  onChangeChapter,
  addNewChapter,
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
          {blogParams.chapterParameters.map((chapter, i) => (
            <ChapterParametersForm
              key={i}
              chapterParams={chapter}
              onChange={(e) => onChangeChapter(i, e)}
            />
          ))}
          <button type="button" onClick={addNewChapter}>
            Add New Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChapterParametersForm = ({ chapterParams, onChange }) => {
  return (
    <div className="form">
      {/* Form for chapter parameters */}
      <Input
        type="text"
        label="Title"
        name="title"
        value={chapterParams.title}
        onChange={onChange}
      />
    </div>
  );
};
