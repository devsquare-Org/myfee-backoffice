import { compareAsc } from "date-fns";
import * as z from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const createChallengeParams = z.array(
  z
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
          z.object({ name: z.string().min(1, "해시태그를 입력해주세요.") })
        )
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

      // 참여 포인트
      participationPoint: z.number().min(1, "참여 포인트를 입력해주세요."),

      // 중간포인트 지급 여부
      isMidPoint: z.boolean({
        message: "중간포인트 지급 여부를 선택해주세요.",
      }),

      // 중간 포인트
      midPoint: z.number().min(1, "중간 포인트를 입력해주세요.").optional(),

      // 완주 포인트
      completionPoint: z.number().min(1, "완료 포인트를 입력해주세요."),

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
      warnings: z.array(
        z.object({
          paragraph: z.number().min(1, "주의사항을 입력해주세요."),
          title: z.string().min(1, "주의사항 제목을 입력해주세요."),
          subTitle: z.string().min(1, "주의사항 부제목을 입력해주세요."),
          contents: z.array(
            z.object({
              order: z.number().min(1, "주의사항 순서를 입력해주세요."),
              content: z.string().min(1, "주의사항 내용을 입력해주세요."),
            })
          ),
        })
      ),

      // -------- 기간 타입(TERM) 필드 --------
      // 챌린지 기간(일)
      termChallengePeriod: z.number().optional(),

      // 인증 횟수(기간 동안 필요한 인증 횟수)
      termNumOfCert: z.number().optional(),

      // 하루 인증 횟수 제한
      limitsPerDay: z.number().optional(),

      // 중간 포인트 지급 조건(며칠 동안)
      termsOfPayment: z.number().optional(),

      // 중간 포인트 지급 조건(성공 횟수)
      termsNumOfSuccess: z.number().optional(),

      // -------- 주간 타입(WEEKLY) 필드 --------
      // 챌린지 기간(주)
      weeklyChallengePeriod: z.number().optional(),

      // 인증 일수(주간 동안 필요한 인증 일수)
      weeklyNumOfDays: z.number().optional(),

      // 필요 인증 횟수(하루 동안 필요한 인증 횟수)
      dailyNumOfCert: z.number().optional(),

      // 중간 포인트 지급 조건(완료 주)
      weeklyNumOfCompleted: z.number().optional(),
    })

    // multilple field validation 체크
    .superRefine((data, context) => {
      const { addIssue } = context;
      const {
        startDate,
        endDate,
        type,
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
      if (diffInMs < 0) {
        addIssue({
          code: "custom",
          message: "종료일은 시작일보다 빠를 수 없습니다.",
          path: ["endDate"],
        });
      }

      // 최대 10년 제한 검증
      if (diffInMs > TEN_YEARS_MS) {
        addIssue({
          code: "custom",
          message: "챌린지 기간은 최대 10년을 초과할 수 없습니다.",
          path: ["endDate"],
        });
      }

      // 2. 챌린지 타입에 따른 조건부 검증
      if (type === "TERM") {
        // [TERM] 관련 필드 필수 및 범위 체크
        if (!termChallengePeriod) {
          addIssue({
            code: "custom",
            message: "챌린지 기간(일)을 입력해주세요.",
            path: ["terrmChallengePeriod"],
          });
        } // 최대치 체크 (값이 있을 때만 실행)
        else if (termChallengePeriod > 90) {
          addIssue({
            code: "custom",
            message: "챌린지 기간(일)은 최대 90일입니다.",
            path: ["terrmChallengePeriod"],
          });
        }

        if (!data.termNumOfCert) {
          addIssue({
            code: "custom",
            message: "총 인증 횟수를 입력해주세요.",
            path: ["termNumOfCert"],
          });
        } else if (
          termChallengePeriod &&
          limitsPerDay &&
          termNumOfCert &&
          termChallengePeriod * limitsPerDay < termNumOfCert
        ) {
          addIssue({
            code: "custom",
            message: "총 인증 횟수를 달성할 수 없습니다.",
            path: ["termNumOfCert", "termChallengePeriod", "limitsPerDay"],
          });
        }

        if (!limitsPerDay) {
          addIssue({
            code: "custom",
            message: "하루 인증 제한 횟수를 입력해주세요.",
            path: ["limitsPerDay"],
          });
        } else if (limitsPerDay > 5) {
          addIssue({
            code: "custom",
            message: "최대 5회까지 설정 가능합니다.",
            path: ["limitsPerDay"],
          });
        }
      } else if (type === "WEEKLY") {
        // [WEEKLY] 관련 필드 필수 및 범위 체크
        if (!weeklyChallengePeriod) {
          addIssue({
            code: "custom",
            message: "챌린지 기간(주)을 입력해주세요.",
            path: ["weeklyChallengePeriod"],
          });
        } else if (weeklyChallengePeriod > 12) {
          addIssue({
            code: "custom",
            message: "챌린지 기간(주)는 최대 12주입니다.",
            path: ["weeklyChallengePeriod"],
          });
        }

        if (!weeklyNumOfDays) {
          addIssue({
            code: "custom",
            message: "주간 인증 일수를 입력해주세요.",
            path: ["weeklyNumOfDays"],
          });
        } else if (weeklyNumOfDays < 7) {
          addIssue({
            code: "custom",
            message: "주간 인증 일수는 최대 7일 이하여야 합니다.",
            path: ["weeklyNumOfDays"],
          });
        }
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

      // 3. 기간 타입에 따른 중간 포인트 조건 검증 (midPoint가 있을 때만 체크)
      if (type === "TERM" && midPoint !== undefined && midPoint > 0) {
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
            path: ["termsOfSuccess"],
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

      if (type === "WEEKLY" && midPoint !== undefined && midPoint > 0) {
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
    })
);
