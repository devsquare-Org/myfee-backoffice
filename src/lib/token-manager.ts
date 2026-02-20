import { AppError } from "@/lib/errors";

type TokenResult = {
  accessToken: string;
  refreshToken: string;
};

class TokenManager {
  async refreshMyfeeAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<TokenResult> {
    const response = await fetch(
      `${process.env.MYFEE_BASE_URL}/api/admin/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new AppError({
        from: "myfee",
        code: data.code,
        message: data.message,
        status: data.status,
      });
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}

export const tokenManager = new TokenManager();
