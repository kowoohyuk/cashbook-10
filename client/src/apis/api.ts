export const RES_SUCCESS: number = 200;
export const RES_SUCCESS_REDIRECTION: number = 201;
export const RES_FAIL: number = 400;
export const RES_FAIL_REDIRECTION: number = 401;
export const RES_FAIL_ALERT: number = 402;

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const END_POINT = 'http://localhost:8000';

const useFetch = (
  url: string,
  callBack: Function,
  method: Method,
  body?: {},
) => {
  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  };

  const URL = END_POINT + url;
  let resStatus = RES_SUCCESS;

  fetch(URL, option as RequestInit)
    .then(res => {
      resStatus = res.status;
      return res.json();
    })
    .then((data: any) => {
      switch (resStatus) {
        case RES_FAIL:
          throw new Error(data.message);
        case RES_FAIL_REDIRECTION:
          //window.location.href = `#${Path.signIn}`;
          throw new Error(data.message);
        case RES_FAIL_ALERT:
          alert(data.message);
          throw new Error(data.message);
        case RES_SUCCESS:
          callBack(data);
          break;
      }
    })
    .catch(e => {
      console.error(e.message);
    });
};
export const GET = (url: string, callBack: Function) => {
  useFetch(url, callBack, Method.GET);
};

export const POST = (url: string, callBack: Function, body?: {}) => {
  useFetch(url, callBack, Method.POST, body);
};

export const PUT = (url: string, callBack: Function, body?: {}) => {
  useFetch(url, callBack, Method.PUT, body);
};

export const DELETE = (url: string, callBack: Function) => {
  useFetch(url, callBack, Method.DELETE);
};
