import {AiOutlineClose} from 'react-icons/ai'
import React from 'react'
import * as S from './Modal.styles'
import { ModalProps } from './Modal.types'

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <S.ModalWrapper width={props.styleProps.width} height={props.styleProps.height} id={props.id}>
      <S.ModalHeader>
        <S.ModalTitle>{props.title}</S.ModalTitle>
        <S.ModalCloseButton onClick={props.onCloseClick} id='closeButton'>
          <AiOutlineClose className={S.Icon}/>
        </S.ModalCloseButton>
      </S.ModalHeader>
      {props.children}
    </S.ModalWrapper>
  );
};

export default Modal;