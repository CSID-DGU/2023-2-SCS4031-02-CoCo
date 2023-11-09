import React from "react";

import * as S from './UploadPlanModal.styles'
import Modal from "../../components/Modal";

interface ScretDropdownPorps {
  onclose: () => void;
}

export default function UploadPlanModal({ onclose }: ScretDropdownPorps) {

  return (
    <Modal title="일정 불러오기" styleProps={{ width: "47rem", height: "30rem" }} onCloseClick={onclose}>
      <S.UploadModalContainer>
        <S.VerticalFlexStartContainer>

          <div>
            <S.CheckBox type="radio" name="myCheckbox" id="checkbox1" />
            <S.CheckBoxLabel for="checkbox1">장소</S.CheckBoxLabel>
          </div>
          <div>
            <S.CheckBox type="radio" name="myCheckbox" id="checkbox2" />
            <S.CheckBoxLabel for="checkbox2">일정명</S.CheckBoxLabel>
          </div>

        </S.VerticalFlexStartContainer>
      </S.UploadModalContainer>
    </Modal>
  );
}