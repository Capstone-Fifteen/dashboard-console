import React, { ReactComponentElement } from 'react';
import { ModalProps, Modal as RsuiteModal } from 'rsuite';

interface Props extends ModalProps {
  title?: string;
  actionArea?: ReactComponentElement<any>;
}

const Modal: React.FunctionComponent<Props> = ({ show, onHide, title, actionArea, children }) => (
  <RsuiteModal show={show} onHide={onHide}>
    {title && (
      <RsuiteModal.Header>
        <RsuiteModal.Title>{title}</RsuiteModal.Title>
      </RsuiteModal.Header>
    )}
    <RsuiteModal.Body>{children}</RsuiteModal.Body>
    {actionArea && <RsuiteModal.Footer>{actionArea}</RsuiteModal.Footer>}
  </RsuiteModal>
);

export default Modal;
