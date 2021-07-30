type TURIParameter = {
  [key: string]: any;
};

export const enCodeParameters = (params: TURIParameter): string => {
  const encoded = [];
  for (const param in params)
    if (params.hasOwnProperty(param)) {
      encoded.push(
        encodeURIComponent(param) + '=' + encodeURIComponent(params[param]),
      );
    }
  return encoded.join('&');
};
