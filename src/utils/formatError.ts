export const formatError = (error: any): string | null => {
  try {
    const errors =
      error?.response?.data?.errors ?? error?.response?.data?.error;

    if (errors == null) {
      return null;
    }

    if (Array.isArray(errors)) {
      return errors[0].msg;
    } else {
      return errors;
    }
  } catch (err) {
    return "Unknown error";
  }
};
