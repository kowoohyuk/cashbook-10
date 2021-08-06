import App from './App';

const token = new URL(location.href).searchParams.get('token');
token && localStorage.setItem('token', token);
history.replaceState({}, '', '/');

new App();
