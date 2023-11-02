import Headers from "../../components/Headers";
import React, {useState} from "react";
import { HeadersProps } from "../../components/Headers/Headers.type";
import Footer from "../../components/Footers";
import styled from "@emotion/styled";
import Tabs from "../../components/Tabs";
import { useNavigate } from "react-router-dom";

type PageProps = {
  headersProps: HeadersProps;
  children?: React.ReactNode;
}

const DefaultBody = styled.div`
  width: 87.5rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 4.5rem;
  padding: 0 1.875rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const Page: React.FC<PageProps> = (props: PageProps) => {
  return (
    <>
      <Headers {...props.headersProps}/>
        <DefaultBody>
          {props.children}
        </DefaultBody>
      <Footer/>
    </>
  )
}

export default Page;

export const MyfeedLayout: React.FC<{children: React.ReactNode, isMe:boolean, selectTab?:any}> = ({children, isMe, selectTab}) => {
  const tabs = [{name: "내 정보", URL:"info"}, {name:"여행 계획", URL:"plans"}, {name:"북마크", URL:"bookmarks"}];
  const navigate = useNavigate();
  const [tab, setTab] = useState<any>(selectTab ? selectTab : "");

  const onTabClick = (tab:any) => {
    setTab(tab);
    navigate(`/myfeed/${tab.URL}`);
  };

  return (
    <>
    {isMe ? (
      <Page headersProps={{isLogin: true, isHome: false}}>
      <Tabs tabs={tabs} selectedTab={tab} onClick={(tab) => {onTabClick(tab)}}/>
      {children}
    </Page>
    ) : (
      <Page headersProps={{isLogin: true, isHome: false}}>
        {children}
      </Page>
    )}
    </>
  )
}