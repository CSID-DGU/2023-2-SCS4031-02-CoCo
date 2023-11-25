import React, { useEffect, useState } from "react";

import * as S from './ConnectPlaceModal.styles';
import Modal from "../../components/Modal";
import { useAsync } from "../../utils/API/useAsync";
import Paging from "../../components/Paging";

type ConnectPlaceModalPorps = {
  placeInfor: any;
  onclose: () => void;
  onClickedPlace: (value: any) => void;
}

const ConnectPlaceModal: React.FC<ConnectPlaceModalPorps> = (props: ConnectPlaceModalPorps) => {
  const [placeData, setPlanData] = useState<any>([]);
  const [state, _] = useAsync({ url: `/api/reviews/place/${props.placeInfor.id}` });

  useEffect(() => {
    if (state.error) {
      console.log(state.error);
      setPlanData([]);
    } else if (state.data) {
      setPlanData(state.data);
    }
  }, [state]);

  const clickedPlace = (data: any) => {
    props.onClickedPlace(data);
    props.onclose();
  }

  return (
    <Modal title="일정 불러오기" styleProps={{ width: "45rem", height: "28rem" }} onCloseClick={props.onclose}>
      <S.UploadModalContainer>
        {placeData.length === 0 ? (
          <div>불러올 리뷰가 없습니다</div>
        ) : (
          <Paging items={placeData} perPage={6} type="modalCommentPlace" onClickedData={(data: any) => clickedPlace(data)} />
        )}
      </S.UploadModalContainer>
    </Modal>
  );
}

export default ConnectPlaceModal;