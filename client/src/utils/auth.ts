export const getToken = () => {
  const token = new URL(location.href).searchParams.get('token');
  token && localStorage.setItem('token', token);
  history.replaceState({}, '', '/');

  return token;
};
