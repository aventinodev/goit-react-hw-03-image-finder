import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClickByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClickByEscape);
  }

  handleClickByEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickByOverlay = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleClickByOverlay}>
        <div className={css.modal}>
          {/* {this.props.children} */}
          <img alt="" src={this.props.largeImageURL} className={css.image} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
