import React,{useState} from "react";
import { DropdownMenuProps } from "./Dropdown.type";
import * as S from "./Dropdown.style";
import {AiOutlineDown} from "react-icons/ai";

const DropdownMenu: React.FC<DropdownMenuProps> = (props: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownType = props.type? props.type : "default";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }
  if(dropdownType === "default") {
    return (
      <S.DropdownContainer>
        <S.DropdownButton type="button" onClick={toggleDropdown}>
          {props.selectedItem? props.selectedItem.name : props.name}
          <AiOutlineDown size="1.1rem"/>
        </S.DropdownButton>
        {isDropdownOpen && (
          <S.DropdownMenuContainer>
            {props.items.map((menu, index) => (
              <S.DropdownMenuItem key={index} onClick={() => {props.onClick(menu); toggleDropdown()}}>{menu.name}</S.DropdownMenuItem>
            ))}
          </S.DropdownMenuContainer>
        )}
      </S.DropdownContainer>
    )
  } else if(dropdownType === "badge" || dropdownType === "search") {
    return(
    <S.BadgeDropdownContainer>
      <S.BadgeDropdownInput selectedItem={props.selectedItem.length === 0? false : true} onClick={toggleDropdown}> 
        {props.selectedItem.length === 0? props.name : props.selectedItem.map((item:any, index:any) => (
          <S.Badge key={index}>
            {item.name}
          </S.Badge>
        ))}
        <AiOutlineDown size="1.1rem"/>
      </S.BadgeDropdownInput>
      {isDropdownOpen && (
        <S.BadgeDropdownMenuContainer type={dropdownType}>
        {props.items.map((menu, index) => (
            props.selectedItem.length !== 0 && props.selectedItem.find((item: any) => item.id === menu.id) ? (
              <S.BadgeDropdownMenuItem key={index} onClick={() => props.onClick(menu)} selected={true}>
                {menu.name}
              </S.BadgeDropdownMenuItem>
            ) : (
              <S.BadgeDropdownMenuItem key={index} onClick={() => props.onClick(menu)} selected={false}>
                {menu.name}
              </S.BadgeDropdownMenuItem>
            )
          ))}

        </S.BadgeDropdownMenuContainer>
        )}
    </S.BadgeDropdownContainer>
    )
  }
}

export default DropdownMenu;