const response = (type, msg, data) => {
  if (type == "SUCCESS") {
    if (Array.isArray(data)) {
      return {
        results: {
          message: msg,
          dataItems: data,
        },
      };
    } else {
      return {
        results: {
          message: msg,
          data: data,
        },
      };
    }
  } else if (type == "ERROR") {
    return {
      errors: [
        {
          message: msg,
          details: data,
        },
      ],
    };
  } else if (type == "UNAUTHORIZED") {
    return {
      errors: [
        {
          message: "Not authorized",
        },
      ],
    };
  }
};

module.exports = response;
