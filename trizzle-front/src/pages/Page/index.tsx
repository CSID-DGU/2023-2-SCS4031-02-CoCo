import Headers from "../../components/Headers";
import React from "react";
import { HeadersProps } from "../../components/Headers/Headers.type";
import Footer from "../../components/Footers";
import styled from "@emotion/styled";

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