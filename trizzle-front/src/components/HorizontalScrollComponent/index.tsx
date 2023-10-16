import React, { useRef, useEffect, useState } from 'react';
import * as S from './style';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

const HorizontalScrollContainer: React.FC<{ children: React.ReactNode, moveDistance: number }> = ({ children, moveDistance }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= moveDistance; // 스크롤 왼쪽으로 이동할 거리
      
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
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
    <div style={{display:"flex", alignItems:"flex-start"}}>
      <button onClick={handleScrollLeft} style={{ display: isScrollable ? 'block' : 'none' }} type='button'>
        <AiOutlineLeft size="2rem" color="#EBB700"/>
      </button>
      <S.HorizontalScrollContainer ref={containerRef}>
        {children}
      </S.HorizontalScrollContainer>
      <button onClick={handleScrollRight} style={{ display: isScrollable ? 'block' : 'none' }} type='button'>
        <AiOutlineRight size="2rem" color="#EBB700"/>
      </button>
    </div>
  );
};

export default HorizontalScrollContainer;
