import React, { useEffect, useState } from "react";
import { PagingProps } from "./Paging.type";
import PlanCard from "../PlanCard";
import Comments from "../Comments";
import * as S from "./Paging.style";

const Paging: React.FC<PagingProps> = (props: PagingProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState(props.items.slice(0, props.perPage));
  const totalPages = Math.ceil(props.items.length / props.perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages === 1) return;
    for (let i = 1; i <= totalPages; i++) {
      if (props.type === "verticalComment" || props.type.includes("modalComment")) {
        pageNumbers.push(
          <S.NumberButton key={i} onClick={() => handlePageChange(i)} isCurrent={i === currentPage}>
            {i}
          </S.NumberButton>
        );
      } else if (props.type === "horizontalPlan") {
        pageNumbers.push(
          <S.DotButton key={i} onClick={() => handlePageChange(i)} isCurrent={i === currentPage} />
        );
      }
    }
    return pageNumbers;
  };
  useEffect(() => {
    const indexOfLastItem = currentPage * props.perPage;
    const indexOfFirstItem = indexOfLastItem - props.perPage;
    setCurrentItems(props.items.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const onClicked = (data: any) => {
    props.onClickedData? props.onClickedData(data) : console.log(data);
  }

  if (props.type === "horizontalPlan") {
    return (
      <S.VerticalContainer>
        <S.HorizontalContainer>
          {/* 현재 페이지의 컴포넌트들을 표시 */}
          {currentItems.map((item, index) => (
            <div key={index}>
              <PlanCard {...item} />
            </div>
          ))}
        </S.HorizontalContainer>
        {/* 페이지 숫자 버튼 */}
        <S.PageButtonContainer>
          {renderPageNumbers()}
        </S.PageButtonContainer>
      </S.VerticalContainer>
    );
  } else if (props.type === "verticalComment") {
    return (
      <S.VerticalContainer>
        {/* 현재 페이지의 컴포넌트들을 표시 */}
        {currentItems.map((item) => (
          <Comments {...item} />
        ))}
        <S.PageButtonContainer>
          {renderPageNumbers()}
        </S.PageButtonContainer>
      </S.VerticalContainer>
    );
  } else if (props.type === "modalCommentPlan") {
    return (
      <>
        <S.GridContainer>
          {currentItems.map((value, index) => (
            <S.ListContainer key={index} onClick={() => onClicked(value)}>
              <S.RegionPlaceText>{value.planLocation}</S.RegionPlaceText>
              <S.VerticalCenterContainer>
                <S.TitleText>{value.planName}</S.TitleText>
                <S.DateText>{value.planStartDate}~{value.planEndDate}</S.DateText>
              </S.VerticalCenterContainer>
            </S.ListContainer>
          ))}
        </S.GridContainer>
        <S.PageButtonContainer>
          {renderPageNumbers()}
        </S.PageButtonContainer>
      </>
    );
  } else if (props.type === "modalCommentPlace") {
    return (
      <>
        <S.GridContainer>
          {currentItems.map((value, index) => (
            <S.ListContainer key={index} onClick={() => onClicked(value)}>
              <S.RegionPlaceText>{value.placeName}</S.RegionPlaceText>
              <S.VerticalCenterContainer>
                <S.TitleText>{value.placeTitle}</S.TitleText>
                <S.DateText>{value.visitedDate}</S.DateText>
              </S.VerticalCenterContainer>
            </S.ListContainer>
          ))}
        </S.GridContainer>
        <S.PageButtonContainer>
          {renderPageNumbers()}
        </S.PageButtonContainer>
      </>
    );
  }
};

export default Paging;