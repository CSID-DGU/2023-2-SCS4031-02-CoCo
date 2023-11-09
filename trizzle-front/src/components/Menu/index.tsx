import React, {useState} from "react";
import * as S from './Menu.style'
import { MenuProps } from "./Menu.type";
import { AiOutlineEllipsis } from "react-icons/ai";

const Menu:React.FC<MenuProps> = (props:MenuProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
  <S.MenuButtonContainer >
          <AiOutlineEllipsis size="1.5rem" onClick={() => setOpen(!open)} />
          {open && (
            <S.MenuContainer>
              {props.item.map((item) => (
                <S.MenuItem onClick={() => {
                  if(item.isDelete) {
                    if(confirm("삭제하시겠습니까?") ) {item.onClick(); setOpen(!open);}
                    else {setOpen(!open); return;}
                  } else{
                    item.onClick();
                    setOpen(!open);
                  }
                  ; }} delete={item.isDelete}>{item.content}</S.MenuItem>
              ))}
            </S.MenuContainer>
          )}
        </S.MenuButtonContainer>
  );
};

export default Menu;