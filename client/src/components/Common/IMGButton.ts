import { eventHandler } from '../../lib/woowact/core/EventHandler';
import { Component } from '../../lib/woowact/index';

export type IMGButtonProps = {
  src: string;
  className?: string;
  onclick: () => void;
};

export default class IMGButton extends Component<IMGButtonProps> {
  constructor(props: IMGButtonProps) {
    super(props);

    this.init();
  }

  componentDidMount = () => {
    eventHandler.addEvent(this.$element, 'click', this.props.onclick);
  };

  render() {
    const { src, className } = this.props;

    return `
    <button ${className ? `class="${className}"` : ''}>
      <img src=${src} alt="img-button"/>
    </button>
    `;
  }
}
