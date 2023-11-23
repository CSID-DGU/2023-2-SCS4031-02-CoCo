import React from 'react';
import * as S from './NullList.style';
import { FaBoxArchive } from "react-icons/fa6";

const NullList:React.FC<{content:string}> = ({content}) => {
  return (
    <S.Empty>
      <FaBoxArchive size="2rem" color="#8b8b8b" style={{marginBottom: "1rem"}}/>
      {content}
    </S.Empty>
  )
}

export default NullList;

