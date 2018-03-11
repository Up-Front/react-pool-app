import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper,
  ModalRemoveButton,
  ModalHeader,
  ModalBody,
  ModalFooter
} from './styles';

const Modal = props => {
  const handleRemoveModal = () => {
    console.log('remove modal');
    props.closeModal();
  };
  return (
    <ModalWrapper open={props.open}>
      <ModalHeader>
        <ModalRemoveButton onClick={handleRemoveModal}>x</ModalRemoveButton>
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>{props.footer}</ModalFooter>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  footer: PropTypes.object
};

export default Modal;
