export const saveModel = async (model) => {
  // Placeholder function to save model parameters

  console.log("Saving model parameters:", model);

  // Implement actual saving logic here (e.g., to a database or file)
  try {
    await model.save();
  } catch (error) {
    console.error("Error saving model parameters:", error);
    return {
      message: "Error saving model parameters",
      error,
    };
  }

  return {
    message: "Model parameters saved successfully",
    model: model,
  };
};

export const promiseSaveModel = (model) => {
  return new Promise(async (resolve, reject) => {
    try {
      await model.save();
      resolve(model);
    } catch (error) {
      reject(error);
    }
  });
};
