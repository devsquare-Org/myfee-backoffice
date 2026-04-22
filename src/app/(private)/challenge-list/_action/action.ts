"use server";

import {
  createChallengeParams,
  updateChallengeParams,
} from "@/app/(private)/challenge-list/_action/schema";
import { actionClient } from "@/lib/safe-action";
import { myfeeFormData, myfeePut } from "@/lib/myfee-client";
import type { z } from "zod";
import { returnSchema } from "@/app/signin/_action/schema";
import { revalidatePath } from "next/cache";

type CreateChallengeInput = z.infer<typeof createChallengeParams>;

function mapFormToApiRequest(input: CreateChallengeInput) {
  const isTerm = input.type === "TERM";

  const request: Record<string, unknown> = {
    title: input.title,
    content: input.description,
    startDate: input.startDate,
    endDate: input.endDate,
    hashtags: input.hashtags,
    type: input.type,
    rejoinAllowYn: input.rejoinable ? "Y" : "N",
    participationPoint: input.participationPoint ?? 0,
    completionPoint: input.completionPoint,
    midPointYn: input.isMidPoint ? "Y" : "N",
    participantLimitYn: input.maxParticipants != null ? "Y" : "N",
    maxParticipantCount: input.maxParticipants ?? 0,
    linkUrl: "https://myfee.kr",
    notices: input.warnings ?? [],
  };

  if (input.isMidPoint && input.midPoint != null) {
    request.midPoint = input.midPoint;
  } else {
    request.midPoint = 0;
  }

  if (isTerm) {
    request.term = input.termChallengePeriod ?? 0;
    request.dailyCertificationCount = input.limitsPerDay ?? 1;
    request.requiredCertificationCount = input.termNumOfCert ?? 0;
    if (input.isMidPoint) {
      request.midPointPeriodDuration = input.termsOfPayment ?? 0;
      request.midPointRequiredSatisfactionCount = input.termsNumOfSuccess ?? 0;
    } else {
      request.midPointPeriodDuration = 0;
      request.midPointRequiredSatisfactionCount = 0;
    }
  } else {
    request.term = input.weeklyChallengePeriod ?? 0;
    request.requiredCertificationCount = input.weeklyNumOfDays ?? 0;
    request.dailyCertificationCount = input.dailyNumOfCert ?? 1;
    if (input.isMidPoint && input.weeklyNumOfCompleted != null) {
      request.midPointPeriodDuration = input.weeklyNumOfCompleted;
      request.midPointRequiredSatisfactionCount = input.weeklyNumOfCompleted;
    } else {
      request.midPointPeriodDuration = 0;
      request.midPointRequiredSatisfactionCount = 0;
    }
  }

  return request;
}

export const challengeCreateAction = actionClient
  .inputSchema(createChallengeParams)
  .outputSchema(returnSchema)
  .action(async ({ parsedInput }) => {
    const request = mapFormToApiRequest(parsedInput);

    console.log("request", request);

    const formData = new FormData();

    const requestBlob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });

    formData.append("request", requestBlob);
    formData.append("thumbnailFile", parsedInput.thumbnail);
    formData.append("certificationGuideFile", parsedInput.certImage);

    await myfeeFormData({
      endpoint: "/api/admin/challenges",
      body: formData,
      requiresAuth: true,
    });

    revalidatePath("/challenge-list");

    return {
      status: "SUCCESS",
      message: "챌린지를 등록했습니다.",
    };
  });

export const challengeUpdateAction = actionClient
  .inputSchema(updateChallengeParams)
  .action(async ({ parsedInput }) => {
    let thumbnailUrl = parsedInput.thumbnailUrl;

    // 새 썸네일이 있으면 먼저 미디어 업로드 후 URL을 교체
    if (parsedInput.thumbnailFile) {
      const mediaFormData = new FormData();
      mediaFormData.append("file", parsedInput.thumbnailFile);

      const mediaRes = (await myfeeFormData({
        endpoint: "/api/admin/challenges/media",
        body: mediaFormData,
        requiresAuth: true,
      })) as { newFileUrl: string };

      thumbnailUrl = mediaRes.newFileUrl;
    }

    await myfeePut({
      endpoint: `/api/admin/challenges/${parsedInput.id}`,
      requiresAuth: true,
      body: {
        title: parsedInput.title,
        content: parsedInput.content,
        linkUrl: parsedInput.linkUrl,
        thumbnailUrl,
        certificationGuideUrl: parsedInput.certificationGuideUrl,
        hashtags: parsedInput.hashtags,
      },
    });

    revalidatePath("/challenge-list");
    revalidatePath(`/challenge-list/${parsedInput.id}`);

    return {
      thumbnailUrl,
      message: "챌린지를 수정했습니다.",
    };
  });
