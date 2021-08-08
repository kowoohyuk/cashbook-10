import './alert.scss';

const DEFAULT_LIFETIME = 1000;

export const alertModal = (
  message: string,
  lifeTime: number = DEFAULT_LIFETIME,
): void => {
  const $alert = document.createElement('div');

  $alert.className = 'alert';
  $alert.innerHTML = `<div class="alert__message">${message}</div>`;

  const $app = document.querySelector('body');

  $app && $app.appendChild($alert);

  setTimeout(() => hideAlert($alert), lifeTime);
};

const hideAlert = ($alert: HTMLElement) => {
  $alert.classList.add('hide');
  $alert.addEventListener('animationstart', () => {
    $alert.remove();
  });
};
