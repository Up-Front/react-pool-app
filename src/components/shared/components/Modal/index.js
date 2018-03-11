import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper,
  ModalRemoveButton,
  ModalHeader,
  ModalBody,
  ModalFooter
} from './styles';

class Modal extends Component {
  handleRemoveModal() {
    this.props.closeModal();
  }

  render() {
    return (
      <ModalWrapper open={this.props.open}>
        <ModalHeader>
          <ModalRemoveButton
            className="removeButton"
            onClick={this.handleRemoveModal}
          >
            x
          </ModalRemoveButton>
        </ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        <ModalFooter className="footer">{this.props.footer}</ModalFooter>
      </ModalWrapper>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  footer: PropTypes.object
};

export default Modal;
