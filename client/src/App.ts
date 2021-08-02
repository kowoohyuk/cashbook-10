import MainPage from './pages/MainPage';
import { $ } from './utils/selector';
import Component, { ComponentId } from './lib/woowact/core/Component';
import { Route, Router } from './lib/woowact/core/Router';
import { Header } from './components/Header/Header';
import './styles/index.scss';
import { Modal } from './components/Common/Modal';

export default class App extends Component {
  $app: HTMLElement;
  $modal: Component;
  $header: Component;

  constructor() {
    super({});
    this.$header = this.addComponent(Header);
    this.$modal = this.addComponent(Modal);

    this.$app = this.getRootApp();
    this.init();
  }

  getRootApp(): HTMLElement {
    const $app = document.getElementById('App');

    if (!$app) {
      console.error(`html doesn't have #app element`);
    }

    return $app ?? document.createElement('error');
  }

  componentDidMount() {
    this.setEvents();
    this.$app.append(this.$element);
    this.setRouter();
  }

  setEvents() {
    this.$element.addEventListener('click', (e: Event) => {
      const aTarget = (e.target as HTMLElement).closest('.route-btn');
      if (!aTarget) return;

      window.history.pushState({}, '', '2');
    });
  }

  setRouter() {
    const $content = $('.content', this.$element);

    if ($content) {
      const route: Route = {
        '/': new MainPage(),
      };
      new Router(route, $content);
    }
  }

  render(): string {
    return `<div class="app-body">
      ${this.$header.html}
      <div class='content'></div>
      ${this.$modal.html}
    </div>`;
  }
}
