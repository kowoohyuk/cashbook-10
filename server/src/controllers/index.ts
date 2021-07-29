import express from 'express';

export const STATUS = {
  SUCCESS: 200,
  SUCCESS_REDIRECTION: 201,
  FAIL: 400,
  FAIL_REDIRECTION: 401,
  FAIL_ALERT: 402,
} as const;

type TResponseStatus = typeof STATUS[keyof typeof STATUS];

type TResponseData = {
  data?: object;
  message?: string;
};

export const HttpResponse = (
  res: express.Response,
  status: TResponseStatus,
  data: TResponseData,
) => {
  if (status >= STATUS.FAIL && !data.message)
    console.error('메세지를 설정해주세요');
  res.status(status).json(data);
};
