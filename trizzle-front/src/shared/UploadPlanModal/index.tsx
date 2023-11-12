import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

import * as S from './UploadPlanModal.styles'
import Modal from "../../components/Modal";

interface ScretDropdownPorps {
  data: any[{}];
  onclose: () => void;
}

const SampleData = [
  { region: "경기도", planTitle: "난 내가 좋아1", planDate: "2020-12-13 - 2020-12-30" },
  { region: "서울특별시", planTitle: "난 내가 좋아2", planDate: "2020-12-13 - 2020-12-30" },
  { region: "부산광역시", planTitle: "난 내가 좋아3", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상북도", planTitle: "난 내가 좋아4", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아5", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아6", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아7", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아8", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아9", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아10", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아11", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경기도", planTitle: "난 내가 좋아1", planDate: "2020-12-13 - 2020-12-30" },
  { region: "서울특별시", planTitle: "난 내가 좋아2", planDate: "2020-12-13 - 2020-12-30" },
  { region: "부산광역시", planTitle: "난 내가 좋아3", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상북도", planTitle: "난 내가 좋아4", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아5", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아6", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아7", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아8", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아9", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아10", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아11", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경기도", planTitle: "난 내가 좋아1", planDate: "2020-12-13 - 2020-12-30" },
  { region: "서울특별시", planTitle: "난 내가 좋아2", planDate: "2020-12-13 - 2020-12-30" },
  { region: "부산광역시", planTitle: "난 내가 좋아3", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상북도", planTitle: "난 내가 좋아4", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아5", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아6", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아7", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아8", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아9", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아10", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아11", planDate: "2020-12-13 - 2020-12-30" },
  { region: "서울특별시", planTitle: "난 내가 좋아2", planDate: "2020-12-13 - 2020-12-30" },
  { region: "부산광역시", planTitle: "난 내가 좋아3", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상북도", planTitle: "난 내가 좋아4", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아5", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아6", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아7", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아8", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아9", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아10", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아11", planDate: "2020-12-13 - 2020-12-30" },
  { region: "서울특별시", planTitle: "난 내가 좋아2", planDate: "2020-12-13 - 2020-12-30" },
  { region: "부산광역시", planTitle: "난 내가 좋아3", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상북도", planTitle: "난 내가 좋아4", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아5", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아6", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아7", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아8", planDate: "2020-12-13 - 2020-12-30" },
  { region: "경상남도", planTitle: "난 내가 좋아9", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아10", planDate: "2020-12-13 - 2020-12-30" },
  { region: "강원도", planTitle: "난 내가 좋아11", planDate: "2020-12-13 - 2020-12-30" },
]

const sliceArrayByLimit = (totalPage: number[], limit: number) => {
  const totalPageArray = Array.from(totalPage);
  return Array(Math.ceil(totalPageArray.length / limit))
    .fill()
    .map(() => totalPageArray.splice(0, limit));
};

export default function UploadPlanModal({ data, onclose }: ScretDropdownPorps) {
  const [planData, setPlanData] = useState<any>(SampleData);
  const [showData, setShowData] = useState<[]>([]);
  const showNumber = 6;
  const [page, setPage] = useState(1);
  const [pageNext, setPageNext] = useState(0);
  const totalPages = planData.length % showNumber !== 0 ? planData.length / showNumber + 1 : planData.length / showNumber;
  const [totalPageList, setTotalPageList] = useState<[]>(Array.from({ length: totalPages }, (_, index) => index + 1));
  const [totalPageListDividedCurrent, setTotalPageListDividedCurrent] = useState([]);

  useEffect(() => {
    const pageData = SampleData.slice(0, showNumber);
    setShowData(pageData);
    console.log(totalPageList);
    const slicedPageArray = sliceArrayByLimit(totalPageList, 5);
    setTotalPageList(slicedPageArray);
    setTotalPageListDividedCurrent(slicedPageArray[0])
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
    <Modal title="일정 불러오기" styleProps={{ width: "45rem", height: "28rem" }} onCloseClick={onclose}>
      <S.UploadModalContainer>
        {
          planData.length === 0 ? (
            <div>불러올 일정이 없습니다</div>
          ) : (
            <>
              <S.GridContainer>
                {showData.map((value, index) => (
                  <S.PlanListContainer key={index}>
                    <S.RegionText>{value.region}</S.RegionText>
                    <S.VerticalCenterContainer>
                      <S.PlanTitleText>{value.planTitle}</S.PlanTitleText>
                      <S.PlanDateText>{value.planDate}</S.PlanDateText>
                    </S.VerticalCenterContainer>
                  </S.PlanListContainer>
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