import { compareAsc } from "date-fns";
import * as z from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const createChallengeParams = z
  .object({
    // 썸네일
    thumbnail: z
      .instanceof(File, { message: "썸네일을 첨부해주세요." })
      // 썸네일 size validation
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "썸네일 크기는 10MB 이하여야 합니다.",
      })
      // 썸네일 type validation
      .refine((file) => file.type.startsWith("image/"), {
        message: "썸네일은 이미지 파일만 업로드 가능합니다.",
      }),

    // 제목
    title: z
      .string()
      .min(1, "제목을 1글자 이상 입력해주세요.")
      .max(20, "제목을 20글자 이하로 입력해주세요."),

    // 시작일
    startDate: z.string().min(1, "시작일을 입력해주세요."),

    // 종료일
    endDate: z.string().min(1, "종료일을 입력해주세요."),

    // 설명
    description: z
      .string()
      .min(1, "설명을 입력해주세요.")
      .max(200, "설명은 200자 이하로 입력해주세요."),

    // 해시태그
    hashtags: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, "해시태그를 입력해주세요.")
            .max(20, "해시태그는 20자 이하로 입력해주세요."),
        })
      )
      .min(1, "해시태그를 입력해주세요.")
      .max(5, "해시태그는 최대 5개까지만 등록 가능합니다."),

    // 챌린지 타입
    type: z.enum(["TERM", "WEEKLY"], {
      message: "챌린지 타입을 선택해주세요.",
    }),

    // 최대 참여자 수
    maxParticipants: z
      .number()
      .max(1000, "최대 참여자 수는 1000명을 초과할 수 없습니다.")
      .optional(),

    // 재참여 가능 여부
    rejoinable: z.boolean({ message: "재참여 가능 여부를 선택해주세요." }),

    // 참여 포인트 (1 이상)
    participationPoint: z.number().min(1, "참여 포인트는 1 이상이어야 합니다."),

    // 중간포인트 지급 여부
    isMidPoint: z.boolean({
      message: "중간포인트 지급 여부를 선택해주세요.",
    }),

    // 중간 포인트 - isMidPoint ON일 때 필수 (superRefine)
    midPoint: z.number().min(1, "중간 포인트를 입력해주세요.").optional(),

    // 완주 포인트 (1 이상)
    completionPoint: z.number().min(1, "완료 포인트는 1 이상이어야 합니다."),

    // 인증 방법 이미지
    certImage: z
      .instanceof(File, {
        message: "인증 방법 이미지를 첨부해주세요.",
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "인증 방법 이미지 크기는 10MB 이하여야 합니다.",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "인증 방법 이미지는 이미지 파일만 업로드 가능합니다.",
      }),

    // 주의사항
    warnings: z
      .array(
        z.object({
          paragraph: z.number().min(1, "주의사항을 입력해주세요."),
          title: z.string().min(1, "제목을 입력해주세요."),
          subTitle: z.string().min(1, "부제목을 입력해주세요.").optional(),
          contents: z
            .array(
              z.object({
                order: z.number().min(1, "순서를 입력해주세요."),
                content: z.string().min(1, "내용을 입력해주세요."),
              })
            )
            .min(1, "내용을 입력해주세요."),
        })
      )
      .optional(),

    // -------- 기간 타입(TERM) 필드 --------
    // 폼에서 빈 값 시 0을 보내므로 min(1)이 검증 (condition-setting-section onChange)
    // optional: type이 WEEKLY일 때 검증 스킵
    termChallengePeriod: z
      .number()
      .min(1, "챌린지 기간은 최소 1일입니다.")
      .max(90, "챌린지 기간(일)은 최대 90일입니다.")
      .optional(),

    termNumOfCert: z
      .number()
      .min(1, "총 인증 횟수는 최소 1회입니다.")
      .optional(),

    limitsPerDay: z
      .number()
      .min(1, "하루 인증 제한 횟수를 입력해주세요.")
      .max(5, "최대 5회까지 설정 가능합니다.")
      .optional(),

    // 중간 포인트 지급 조건(며칠 동안) - isMidPoint ON일 때 필수 (superRefine)
    termsOfPayment: z.number().optional(),

    // 중간 포인트 지급 조건(성공 횟수) - isMidPoint ON일 때 필수 (superRefine)
    termsNumOfSuccess: z.number().optional(),

    // -------- 주간 타입(WEEKLY) 필드 --------
    // 폼에서 빈 값 시 0을 보내므로 min 검증 (condition-setting-section onChange)
    weeklyChallengePeriod: z
      .number()
      .min(2, "챌린지 기간(주)은 최소 2주입니다.")
      .max(12, "챌린지 기간(주)는 최대 12주입니다.")
      .optional(),

    weeklyNumOfDays: z
      .number()
      .min(1, "주간 인증 일수를 입력해주세요.")
      .max(7, "주간 인증 일수는 최대 7일 이하여야 합니다.")
      .optional(),

    // 필요 인증 횟수(하루 동안 필요한 인증 횟수)
    dailyNumOfCert: z.number().optional(),

    // 중간 포인트 지급 조건(완료 주)
    weeklyNumOfCompleted: z.number().optional(),
  })
  .superRefine((data, context) => {
    const { addIssue } = context;
    const {
      startDate,
      endDate,
      type,
      isMidPoint,
      termChallengePeriod,
      termNumOfCert,
      limitsPerDay,
      weeklyChallengePeriod,
      weeklyNumOfDays,
      dailyNumOfCert,
      midPoint,
      termsOfPayment,
      termsNumOfSuccess,
      weeklyNumOfCompleted,
    } = data;

    // 1. 날짜 유효성 검증
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 두 날짜의 차이를 밀리초(ms) 단위로 계산
    const diffInMs = end.getTime() - start.getTime();

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const TEN_YEARS_MS = 10 * 365.25 * ONE_DAY_MS; // 윤년 고려한 10년

    // 종료일이 시작일보다 앞서는 경우만 에러 (당일은 diffInMs가 0이므로 통과)
    // path는 단일 필드만 - ["endDate","startDate"]는 중첩 경로로 해석되어 error.message가 안 나옴
    if (diffInMs < 0) {
      addIssue({
        code: "custom",
        message: "종료일은 시작일보다 빠를 수 없습니다.",
        path: ["endDate"],
      });
      addIssue({
        code: "custom",
        message: "시작일은 종료일보다 늦을 수 없습니다.",
        path: ["startDate"],
      });
    }

    // 최대 10년 제한 검증
    if (diffInMs > TEN_YEARS_MS) {
      addIssue({
        code: "custom",
        message: "챌린지 기간은 최대 10년을 초과할 수 없습니다.",
        path: ["endDate"],
      });
      addIssue({
        code: "custom",
        message: "챌린지 기간은 최대 10년을 초과할 수 없습니다.",
        path: ["startDate"],
      });
    }

    // 2. 챌린지 타입에 따른 조건부 검증 (필수 체크 + 교차 필드 검증)
    if (type === "TERM") {
      // [TERM] 필수 체크 (범위는 기본 스키마에서 검증)
      if (!termChallengePeriod) {
        addIssue({
          code: "custom",
          message: "챌린지 기간(일)을 입력해주세요.",
          path: ["termChallengePeriod"],
        });
      }
      if (!termNumOfCert) {
        addIssue({
          code: "custom",
          message: "총 인증 횟수를 입력해주세요.",
          path: ["termNumOfCert"],
        });
      }
      if (!limitsPerDay) {
        addIssue({
          code: "custom",
          message: "하루 인증 제한 횟수를 입력해주세요.",
          path: ["limitsPerDay"],
        });
      }
      // [TERM] 교차 필드 검증 (path는 단일 필드만 - 중첩 경로면 error.message가 안 나옴)
      if (
        termChallengePeriod &&
        limitsPerDay &&
        termNumOfCert &&
        termChallengePeriod * limitsPerDay < termNumOfCert
      ) {
        addIssue({
          code: "custom",
          message: "총 인증 횟수를 달성할 수 없습니다.",
          path: ["termNumOfCert"],
        });
      }
    } else if (type === "WEEKLY") {
      // [WEEKLY] 챌린지 기간/인증 일수는 기본 스키마에서 검증, dailyNumOfCert만 체크
      if (!dailyNumOfCert) {
        addIssue({
          code: "custom",
          message: "하루 필요 인증 횟수를 입력해주세요.",
          path: ["dailyNumOfCert"],
        });
      } else if (dailyNumOfCert > 5) {
        addIssue({
          code: "custom",
          message: "하루 인증 횟수는 최대 5회입니다.",
          path: ["dailyNumOfCert"],
        });
      }
    }

    // 3. 중간 포인트 설정 시 필수 (isMidPoint ON이면 termsOfPayment, termsNumOfSuccess, midPoint 필수)
    if (isMidPoint) {
      if (!midPoint || midPoint < 1) {
        addIssue({
          code: "custom",
          message: "중간 지급 포인트를 입력해주세요.",
          path: ["midPoint"],
        });
      }
    }

    if (isMidPoint && type === "TERM") {
      if (!termsOfPayment) {
        addIssue({
          code: "custom",
          message: "지급 기간 조건을 입력해주세요.",
          path: ["termsOfPayment"],
        });
      }
      if (
        termsOfPayment &&
        termChallengePeriod &&
        termsOfPayment > termChallengePeriod
      ) {
        addIssue({
          code: "custom",
          message: "중간 지급 기간 챌린지 기간보다 클 수 없습니다.",
          path: ["termsOfPayment"],
        });
      }
      if (!termsNumOfSuccess) {
        addIssue({
          code: "custom",
          message: "성공 횟수 조건을 입력해주세요.",
          path: ["termsNumOfSuccess"],
        });
      }
      if (
        termsNumOfSuccess &&
        termNumOfCert &&
        termsNumOfSuccess > termNumOfCert
      ) {
        addIssue({
          code: "custom",
          message: "성공 횟수 조건은 총 인증 횟수보다 클 수 없습니다.",
          path: ["termsNumOfSuccess"],
        });
      }
    }

    if (isMidPoint && type === "WEEKLY") {
      if (!weeklyNumOfCompleted) {
        addIssue({
          code: "custom",
          message: "완료 주 조건을 입력해주세요.",
          path: ["weeklyNumOfCompleted"],
        });
      }
      if (
        weeklyNumOfCompleted &&
        weeklyChallengePeriod &&
        weeklyNumOfCompleted > weeklyChallengePeriod
      ) {
        addIssue({
          code: "custom",
          message: "완료 주 조건은 챌린지 기간보다 클 수 없습니다.",
          path: ["weeklyNumOfCompleted"],
        });
      }
    }
  });
