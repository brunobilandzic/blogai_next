export const findById = async (Model, id) => {
  try {
    const document = await Model.findById(id);
    return document;
  } catch (error) {
    console.error("Model:", Model.modelName);
    console.error("Error finding document by ID:", error);
    throw error;
  }
};
