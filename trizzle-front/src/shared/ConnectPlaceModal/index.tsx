import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import * as S from './ConnectPlaceModal.styles'
import Modal from "../../components/Modal";

interface ScretDropdownPorps {
  data: string;
  onclose: () => void;
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

const sliceArrayByLimit = (totalPage: number[], limit: number) => {
  const totalPageArray = Array.from(totalPage);
  return Array(Math.ceil(totalPageArray.length / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

export default function CoonectPlaceModal({ data, onclose }: ScretDropdownPorps) {
  const [planData, setPlanData] = useState<any>(SampleData);
  const [showData, setShowData] = useState<[]>([]);
  const showNumber = 6;
  const [page, setPage] = useState(1);
  const [pageNext, setPageNext] = useState(0);
  const totalPages = planData.length % showNumber !== 0 ? planData.length / showNumber + 1 : planData.length / showNumber;
  const [totalPageList, setTotalPageList] = useState<[]>(Array.from({ length: totalPages }, (_, index) => index + 1));
  const [totalPageListDividedCurrent, setTotalPageListDividedCurrent] = useState([]);
  // const searchResult =  SampleData.filter((place) => place.placeName === data).length === 0;

  useEffect(() => {
    const pageData = SampleData.slice(0, showNumber);
    setShowData(pageData);
    console.log(totalPageList);
    const slicedPageArray = sliceArrayByLimit(totalPageList, 5);
    setTotalPageList(slicedPageArray);
    setTotalPageListDividedCurrent(slicedPageArray[0]);
  }, []);
;

  const handlePageChange = (pages: number) => {
    console.log(pages);
    let pageData: any;
    if (pages === 1) {
      pageData = SampleData.slice(0, showNumber);
    } else {
      pageData = SampleData.slice((pages - 1) * showNumber, pages * showNumber);
    }
    setShowData(pageData);
    setPage(pages);

  };

  const handlePrevClick = () => {
    const currentIndex = totalPageList.findIndex(chunk => chunk.includes(page));
    if (currentIndex > 0) {
      setTotalPageListDividedCurrent(totalPageList[currentIndex - 1]);
      handlePageChange(totalPageList[currentIndex - 1][4]);
    }
  };

  const handleNextClick = () => {
    const currentIndex = totalPageList.findIndex(chunk => chunk.includes(page));
    if (currentIndex < totalPageList.length - 1) {
      setTotalPageListDividedCurrent(totalPageList[currentIndex + 1]);
      handlePageChange(totalPageList[currentIndex + 1][0]);
    }
  };

  const pageList = totalPageListDividedCurrent.map((value, index) => (
    <S.PageNation
      key={index}
      isActive={value === page}
      onClick={() => handlePageChange(value)}
    >
      {value}
    </S.PageNation>
  ));

  return (
    <Modal title="게시글 불러오기" styleProps={{ width: "45rem", height: "28rem" }} onCloseClick={onclose}>
      <S.UploadModalContainer>
        {
          planData.length === 0 ? (
            <div>불러올 장소 게시글이 없습니다</div>
          ) : (
            <>
              <S.GridContainer>
                {showData.map((value, index) => (
                  <S.PlaceListContainer key={index}>
                    <S.PlaceText>{value.placeName}</S.PlaceText>
                    <S.VerticalCenterContainer>
                      <S.PlaceTitleText>{value.placeTitle}</S.PlaceTitleText>
                      <S.PlaceDateText>{value.visitedDate}</S.PlaceDateText>
                    </S.VerticalCenterContainer>
                  </S.PlaceListContainer>
                ))}
              </S.GridContainer>

              <S.HorizontalCenterContainer>
                <button onClick={handlePrevClick}>&lt;</button>
                {pageList}
                <button onClick={handleNextClick}>&gt;</button>
              </S.HorizontalCenterContainer>
            </>
          )}

      </S.UploadModalContainer>
    </Modal>
  );
}