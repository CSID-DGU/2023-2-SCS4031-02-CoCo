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

const SampleData = [
  { placeName: "과천과학관", placeTitle: "난 내가 좋아1", visitedDate: "2020-12-13" },
  { placeName: "천문대", placeTitle: "난 내가 좋아2", visitedDate: "2020-12-13" },
  { placeName: "무령왕릉", placeTitle: "난 내가 좋아3", visitedDate: "2020-12-13" },
  { placeName: "철도박물관", placeTitle: "난 내가 좋아4", visitedDate: "2020-12-13" },
  { placeName: "조폐박물관", placeTitle: "난 내가 좋아5", visitedDate: "2020-12-13" },
  { placeName: "보광사", placeTitle: "난 내가 좋아6", visitedDate: "2020-12-13" },
  { placeName: "흥국사", placeTitle: "난 내가 좋아7", visitedDate: "2020-12-13" },
  { placeName: "삼성리움미술관", placeTitle: "난 내가 좋아8", visitedDate: "2020-12-13" },
  { placeName: "마곡사", placeTitle: "난 내가 좋아9", visitedDate: "2020-12-13" },
]

const ConnectPlaceModal: React.FC<ConnectPlaceModalPorps> = (props: ConnectPlaceModalPorps) => {
  const [placeData, setPlanData] = useState<any>([]);
  const [state, fetchData] = useAsync({ url: '/api/post/myplans' });

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