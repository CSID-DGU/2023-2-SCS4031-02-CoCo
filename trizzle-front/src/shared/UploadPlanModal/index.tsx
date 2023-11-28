import React, { useEffect, useState } from "react";

import * as S from './UploadPlanModal.styles'
import Modal from "../../components/Modal";
import { useAsync } from "../../utils/API/useAsync";
import Paging from "../../components/Paging";
import NullList from "../../components/NullList";

type ScretDropdownPorps = {
  onclose: () => void;
  onClickedPlan: (value: any) => void;
}

const UploadPlanModal: React.FC<ScretDropdownPorps> = (props: ScretDropdownPorps) => {
  const [planData, setPlanData] = useState<any>([]);
  const [state, _] = useAsync({ url: '/api/plans/myplans/nonpost' });

  useEffect(() => {
    if (state.error) {
      console.log(state.error);
      setPlanData([]);
    } else if (state.data) {
      const past = state.data.filter((value: any) => {return new Date(value.planEndDate) < new Date()});
      setPlanData(past);
    }
  }, [state]);

  const clickedPlace = (data: any) => {
    props.onClickedPlan(data);
    props.onclose();
  }

  return (
    <Modal title="일정 불러오기" styleProps={{ width: "45rem", height: "28rem" }} onCloseClick={props.onclose}>
      <S.UploadModalContainer>
        {planData.length === 0 ? (
          <NullList content="불러올 일정이 없습니다" />
        ) : (
          <Paging items={planData} perPage={6} type="modalCommentPlan" onClickedData={(data: any) => clickedPlace(data)} />
        )}
      </S.UploadModalContainer>
    </Modal>
  );
}

export default UploadPlanModal;