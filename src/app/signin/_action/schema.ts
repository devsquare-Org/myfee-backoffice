import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const returnSchema = z.object({
  status: z.enum(["SUCCESS", "ERROR"]),
  message: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
  // data?: Record<string, unknown>
});
