import { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={s.overlay} data-overlay>
        <div className={s.modal}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>
    );
  }
}
