const getBrowserTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getUserTheme = () => localStorage.getItem('theme');

export const getTheme = () => getUserTheme() || getBrowserTheme();
