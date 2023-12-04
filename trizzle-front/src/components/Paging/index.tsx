import React, { useEffect, useState } from "react";
import { PagingProps } from "./Paging.type";
import PlanCard from "../PlanCard";
import PlaceCard from "../PlaceCard";
import Comments from "../Comments";
import * as S from "./Paging.style";
import HorizontalScrollContainer from "../HorizontalScrollComponent";


const PageButtonContainer:React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <S.PageButtonContainer>
      <HorizontalScrollContainer type="page" moveDistance={690}>
        {children}
      </HorizontalScrollContainer>
    </S.PageButtonContainer>
  )
}

const Paging: React.FC<PagingProps> = (props: PagingProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [, setItems] = useState<any[]>([]);
  const [currentItems, setCurrentItems] = useState(props.items.slice(0, props.perPage));
  const totalPages = Math.ceil(props.items.length / props.perPage);

  useEffect(() => {
    setItems(props.items);
    setCurrentItems(props.items.slice(0, props.perPage));
  }, [props]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages === 1) return;
    for (let i = 1; i <= totalPages; i++) {
      if (props.type === "horizontalPlan") {
        pageNumbers.push(
          <S.DotButton key={i} onClick={() => handlePageChange(i)} isCurrent={i === currentPage} />
        );
      } else {
        pageNumbers.push(
          <S.NumberButton key={i} onClick={() => handlePageChange(i)} isCurrent={i === currentPage}>
            {i}
          </S.NumberButton>
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
    props.onClickedData? props.onClickedData(data) : null;
  }

  if (props.type === "horizontalPlan") {
    return (
      <S.VerticalContainer>
        <S.HorizontalContainer>
          {/* 현재 페이지의 컴포넌트들을 표시 */}
          {currentItems.map((item, index) => (
            <div key={index}>
              <PlanCard 
              planId={item.id} 
              userId={item.accountId} 
              title={item.postTitle} 
              likeCount={item.likeCount}
              commentCount={item.commentCount?item.commentCount:0}
              startDate={item.plan.planStartDate}
              endDate={item.plan.planEndDate}
              region={item.plan.planLocation}
              placeCenter={item.plan.content[0].placeList.length !== 0 && item.plan.content[0].placeList[0].keyword === null ? [item.plan.content[0].placeList[0].x, item.plan.content[0].placeList[0].y] : item.plan.planLocation}
              thema={item.plan.planThema}
              thumbnail={item.thumnail?item.thumnail:""}
              postSecret={item.postSecret}
              />
            </div>
          ))}
        </S.HorizontalContainer>
        {/* 페이지 숫자 버튼 */}
        <PageButtonContainer>
          {renderPageNumbers()}
        </PageButtonContainer>
      </S.VerticalContainer>
    );
  } else if (props.type === "verticalComment") {
    return (
      <S.VerticalContainer>
        {/* 현재 페이지의 컴포넌트들을 표시 */}
        {currentItems.map((item) => (
          <Comments {...item} />
        ))}
        <PageButtonContainer>
          {renderPageNumbers()}
        </PageButtonContainer>
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
        <PageButtonContainer>
          {renderPageNumbers()}
        </PageButtonContainer>
      </>
    );
  } else if (props.type === "modalCommentPlace") {
    return (
      <>
        <S.GridContainer>
          {currentItems.map((value, index) => (
            <S.ListContainer key={index} onClick={() => onClicked(value)}>
              <S.RegionPlaceText>{value.place.placeName}</S.RegionPlaceText>
              <S.VerticalCenterContainer>
                <S.TitleText>{value.reviewTitle}</S.TitleText>
                <S.DateText>{value.visitDate}</S.DateText>
              </S.VerticalCenterContainer>
            </S.ListContainer>
          ))}
        </S.GridContainer>
        <PageButtonContainer>
          {renderPageNumbers()}
        </PageButtonContainer>
      </>
    );
  } else if(props.type === "verticalReview") {
    return (
      <S.VerticalContainer style={{marginTop:"2rem"}}>
        <S.VerticalCenterContainer style={{gap:"2rem"}}>
        {currentItems.map((item) => 
          <PlaceCard key={item.id} placeName={item.place.placeName} userName={item.accountId} postDate={item.reviewRegistrationDate.slice(0,10)} postTitle={item.reviewTitle} postContent={item.reviewContentText? item.reviewContentText : ""} src={item.thumbnail} postId={item.id} reviewSecret={item.reviewSecret}/>
        )}
        <PageButtonContainer>
          {renderPageNumbers()}
        </PageButtonContainer>
        </S.VerticalCenterContainer>
      </S.VerticalContainer>
    )
  }
};



export default Paging;