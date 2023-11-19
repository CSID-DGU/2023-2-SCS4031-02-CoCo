import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import * as S from './UploadPlanModal.styles'
import Modal from "../../components/Modal";
import { useAsync } from "../../utils/API/useAsync";
import Paging from "../../components/Paging";

type ScretDropdownPorps = {
  onclose: () => void;
  onClickedPlan: (value: any) => void;
}

const UploadPlanModal: React.FC<ScretDropdownPorps> = (props: ScretDropdownPorps) => {
  const [planData, setPlanData] = useState<any>([]);
  const [state, fetchData] = useAsync({ url: '/api/plans/myplans' });

  useEffect(() => {
    console.log(state);
    if (state.error) {
      console.log(state.error);
      setPlanData([]);
    } else if (state.data) {
      console.log(state.data);
      setPlanData(state.data);
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
          <div>불러올 일정이 없습니다</div>
        ) : (
          <Paging items={planData} perPage={6} type="modalCommentPlan" onClickedData={(data: any) => clickedPlace(data)} />
        )}
      </S.UploadModalContainer>
    </Modal>
  );
}

export default UploadPlanModal;