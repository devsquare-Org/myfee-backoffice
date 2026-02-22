export class AppError extends Error {
  public from;
  public code;
  public status;

  constructor({
    from,
    code,
    status,
    message,
  }: {
    from: "myfee" | "next";
    code: string;
    status?: number;
    message?: string;
  }) {
    super(message);
    this.name = "AppError";
    this.from = from;
    this.code = code;
    this.status = status;
  }
}

export function errorParser(error: AppError) {
  console.error({
    name: error.name || "",
    from: error.from,
    code: error.code,
    status: error.status,
    message: error.message,
  });

  switch (error.from) {
    case "myfee":
      return MyFeeErrorMessages[error.code] || defaultErrorMessage;

    case "next":
      return NextErrorMessages[error.code] || defaultErrorMessage;

    default:
      return defaultErrorMessage;
  }
}

const NextErrorMessages: Record<string, string> = {};

const MyFeeErrorMessages: Record<string, string> = {
  1009: "이메일 또는 비밀번호가 일치하지 않습니다.",
  5007: "챌린지 포인트가 부족합니다.",
};

const defaultErrorMessage =
  "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
