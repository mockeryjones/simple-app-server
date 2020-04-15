const isModelType = (modelName, testValue, options) => {
  if(modelName === testValue) {
    return options.fn(this);
  }
};

export default isModelType;