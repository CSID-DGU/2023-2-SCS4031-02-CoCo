import React,{useState} from "react";
import { DropdownMenuProps } from "./Dropdown.type";
import * as S from "./Dropdown.style";
import {AiOutlineDown} from "react-icons/ai";

const DropdownMenu: React.FC<DropdownMenuProps> = (props: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <S.DropdownContainer>
      <S.DropdownButton type="button" onClick={toggleDropdown}>
        {props.name}
        <AiOutlineDown size="1.1rem"/>
      </S.DropdownButton>
      {isDropdownOpen && (
        <S.DropdownMenuContainer>
          {props.items.map((menu, index) => (
            <S.DropdownMenuItem key={index} onClick={() => props.onClick(menu)}>{menu.name}</S.DropdownMenuItem>
          ))}
        </S.DropdownMenuContainer>
      )}
    </S.DropdownContainer>
  )
}

export default DropdownMenu;