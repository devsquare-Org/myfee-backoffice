import { actionClient } from "@/lib/safe-action";
import { createChallengeParams } from "./schema";

export const challengeCreateAction = actionClient
  .inputSchema(createChallengeParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);

    return {
      message: "success",
    };
  });
