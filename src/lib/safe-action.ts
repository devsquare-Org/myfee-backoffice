import { createSafeActionClient } from "next-safe-action";
import { AppError, errorParser } from "@/lib/errors";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    const appError = error as AppError;

    console.log(">>>>>>>>> ERROR <<<<<<<< ", appError);

    return {
      message: errorParser(appError),
      code: appError.code,
    };
  },
});
