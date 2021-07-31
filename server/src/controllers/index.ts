import express from 'express';

export const STATUS = {
  SUCCESS: 200,
  SUCCESS_REDIRECTION: 201,
  FAIL: 400,
  FAIL_REDIRECTION: 401,
  FAIL_ALERT: 402,
} as const;

export const DEFAULT_MESSAGE = {
  [STATUS.SUCCESS]: 'request success',
  [STATUS.SUCCESS_REDIRECTION]: 'request success. please change your href',
  [STATUS.FAIL]: 'request failed',
  [STATUS.FAIL_REDIRECTION]: 'request failed. please change your href',
  [STATUS.FAIL_ALERT]: 'request failed. please alert this message to user.',
};

type TResponseStatus = typeof STATUS[keyof typeof STATUS];

type TResponseData = {
  data?: object;
  message?: string;
};

export const HttpResponse = (
  res: express.Response,
  status: TResponseStatus,
  data?: TResponseData,
) => {
  const isFailed = status >= STATUS.FAIL;
  if (isFailed && !data?.message) console.error('메세지를 설정해주세요');

  if (!data) {
    data = {
      message: DEFAULT_MESSAGE[status],
      data: {
        result: isFailed ? false : true,
      },
    };
  }
  res.status(status).json(data);
};
