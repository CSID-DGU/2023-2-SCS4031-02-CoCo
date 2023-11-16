import React, {useState, useEffect, useRef} from "react";
import * as S from "./HomePlanSlider.style";
import { HomePlanSliderProps } from "./HomePlanSlider.type";
import { Link } from "react-router-dom";



const HomePlanSlider: React.FC<HomePlanSliderProps> = (props: HomePlanSliderProps) => {
  const [currentPlan, setCurrentPlan] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPlan((prev) =>(prev+1)%4);
    }, 5000);

    return () => {
      clearInterval(timer);
    };


  }, [currentPlan]);

  return (
      <S.Wrapper >
      {props.planList.map((plan, index) => {
        const planRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (planRef.current) {
            planRef.current.style.transition = "all 0.5s ease-in-out";
            planRef.current.style.transform = `translateX(-${currentPlan * 100}%)`;
          }
        }, [currentPlan]);

        return (
          <S.Container key={index} ref={planRef}>
            <S.Tumbnail src={plan.image}/>
            <S.ContentContainer>
              <S.Title>{plan.title}</S.Title>
              <S.TagContainer>
                {plan.tags.map((tag, index) => {
                  return (
                    <S.Tag key={index}>#{tag}</S.Tag>
                  )
                })}
              </S.TagContainer>
              <Link to={`/plans/${plan.id}`}>
                <S.DetailLink>자세히</S.DetailLink>
              </Link>
            </S.ContentContainer>
          </S.Container>
        )
      })}
    </S.Wrapper>
  )

};

export default HomePlanSlider;