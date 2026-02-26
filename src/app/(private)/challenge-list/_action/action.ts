import { createChallengeParams } from "@/app/(private)/challenge-list/_action/schema";
import { actionClient } from "@/lib/safe-action";

export const challengeCreateAction = actionClient
  .inputSchema(createChallengeParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);

    return {
      message: "success",
    };
  });
