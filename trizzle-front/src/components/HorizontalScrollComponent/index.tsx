import React, { useRef, useEffect, useState } from 'react';
import * as S from './style';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

const HorizontalScrollContainer: React.FC<{ children: React.ReactNode, moveDistance: number, type?:string; }> = ({ children, moveDistance, type }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "all 1s ease-in-out";
      containerRef.current.scrollLeft -= moveDistance; // 스크롤 왼쪽으로 이동할 거리
      
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "all 1s ease-in-out";
      containerRef.current.scrollLeft += moveDistance; // 스크롤 오른쪽으로 이동할 거리
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      // 컨테이너의 scrollWidth와 clientWidth를 비교하여 스크롤 가능 여부 확인
      setIsScrollable(containerRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [children]);

  return (
    <S.Wrapper type={type? type : "normal"}>
      <button onClick={handleScrollLeft} style={{ display: isScrollable ? 'block' : 'none' }} type='button'>
        <AiOutlineLeft size={type && type==="page"? "1rem":"2rem"} color={type? "#D6D6D6" :"#EBB700"}/>
      </button>
      <S.HorizontalScrollContainer ref={containerRef} type={type? type : "normal"}>
        {children}
      </S.HorizontalScrollContainer>
      <button onClick={handleScrollRight} style={{ display: isScrollable ? 'block' : 'none' }} type='button'>
        <AiOutlineRight size={type && type==="page"? "1rem":"2rem"} color={type? "#D6D6D6" :"#EBB700"}/>
      </button>
    </S.Wrapper>
  );
};

export default HorizontalScrollContainer;
