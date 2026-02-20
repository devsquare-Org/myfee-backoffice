import { AppError } from "@/lib/errors";
import { getMyfeeAccessToken } from "@/lib/token-utils";

type MyfeeFetchParams = {
  endpoint: string;
  requiresAuth?: boolean;
};

export async function myfeeFetch({ endpoint, requiresAuth }: MyfeeFetchParams) {
  const response = await fetch(`${process.env.MYFEE_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(requiresAuth && {
        Authorization: `Bearer ${await getMyfeeAccessToken()}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError({
      from: "myfee",
      code: data.code,
      message: data.message,
      status: data.status,
    });
  }

  return data;
}

type MyfeePostParams = {
  endpoint: string;
  requiresAuth?: boolean;
  body?: Record<string, unknown> | Record<string, unknown>[];
};

export async function myfeePost({
  endpoint,
  body,
  requiresAuth,
}: MyfeePostParams) {
  const response = await fetch(`${process.env.MYFEE_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(requiresAuth && {
        Authorization: `Bearer ${await getMyfeeAccessToken()}`,
      }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // 204 No Content 응답 처리
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new AppError({
      from: "myfee",
      code: data.code,
      message: data.message,
      status: data.status,
    });
  }

  return data;
}

type MyfeeDeleteParams = {
  endpoint: string;
  requiresAuth?: boolean;
};

export async function myfeeDelete({
  endpoint,
  requiresAuth,
}: MyfeeDeleteParams) {
  const response = await fetch(`${process.env.MYFEE_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(requiresAuth && {
        Authorization: `Bearer ${await getMyfeeAccessToken()}`,
      }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError({
      from: "myfee",
      code: data.code,
      message: data.message,
      status: data.status,
    });
  }

  return data;
}

type MyfeePutParams = {
  endpoint: string;
  requiresAuth?: boolean;
  body?: Record<string, unknown> | Record<string, unknown>[];
};

export async function myfeePut({
  endpoint,
  body,
  requiresAuth,
}: MyfeePutParams) {
  const response = await fetch(`${process.env.MYFEE_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(requiresAuth && {
        Authorization: `Bearer ${await getMyfeeAccessToken()}`,
      }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // 204 No Content 응답 처리
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new AppError({
      from: "myfee",
      code: data.code,
      message: data.message,
      status: data.status,
    });
  }

  return data;
}

type MyfeePutFileParams = {
  endpoint: string;
  requiresAuth?: boolean;
  file: File | null;
  fieldName?: string;
};

export async function myfeePutFile({
  endpoint,
  file,
  requiresAuth,
  fieldName = "file",
}: MyfeePutFileParams) {
  const formData = new FormData();

  // file이 있을 때만 추가 (null이면 빈 FormData)
  if (file !== null) {
    formData.append(fieldName, file);
  }

  const response = await fetch(`${process.env.MYFEE_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      ...(requiresAuth && {
        Authorization: `Bearer ${await getMyfeeAccessToken()}`,
      }),
    },
    body: formData,
  });

  // 204 No Content 응답 처리
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new AppError({
      from: "myfee",
      code: data.code,
      message: data.message,
      status: data.status,
    });
  }

  return data;
}
