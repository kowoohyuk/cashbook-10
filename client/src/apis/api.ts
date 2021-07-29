export const RES_SUCCESS: number = 200;
export const RES_SUCCESS_REDIRECTION: number = 201;
export const RES_FAIL: number = 400;
export const RES_FAIL_REDIRECTION: number = 401;
export const RES_FAIL_ALERT: number = 402;

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type Method = typeof Method[keyof typeof Method];

const END_POINT = 'http://localhost:8000';

const useFetch = async (url: string, method: Method, body?: {}) => {
  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  };

  const URL = END_POINT + url;

  try {
    let statusCode = RES_SUCCESS;

    const res = await fetch(URL, option as RequestInit);

    statusCode = res.status;

    const data = await res.json();

    switch (statusCode) {
      case RES_FAIL:
        throw new Error(data.message);
      case RES_FAIL_REDIRECTION:
        //window.location.href = `#${Path.signIn}`;
        throw new Error(data.message);
      case RES_FAIL_ALERT:
        alert(data.message);
        throw new Error(data.message);
      case RES_SUCCESS:
        return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};
export const GET = async (url: string) => {
  return await useFetch(url, Method.GET);
};

export const POST = async (url: string, body?: {}) => {
  return await useFetch(url, Method.POST, body);
};

export const PUT = async (url: string, body?: {}) => {
  return await useFetch(url, Method.PUT, body);
};

export const DELETE = async (url: string) => {
  return await useFetch(url, Method.DELETE);
};
