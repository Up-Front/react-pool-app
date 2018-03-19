import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalWrapper,
  ModalRemoveButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styles';

const Modal = props => {
  const handleRemoveModal = () => {
    props.closeModal();
  };

  return (
    <ModalWrapper open={props.open}>
      <ModalHeader>
        <ModalRemoveButton className="removeButton" onClick={handleRemoveModal}>
          x
        </ModalRemoveButton>
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter className="footer">{props.footer}</ModalFooter>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  footer: PropTypes.object,
};

export default Modal;
