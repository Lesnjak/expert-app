import React from 'react';
import styled from "styled-components";
import Logo from "../../../assets/images/icons/TopX.svg"

const Header = () => {
    return (
        <Wrapper>
            <Image src={Logo} alt="TopX logo"/>
            <Paragraph>
                Join thousands of top professionals today <br/> and start seeing clients online
            </Paragraph>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  margin-top: 40px;
  width: 560px;
  color: white;
  
  @media(max-height: 800px) {
      margin-top: 30px;
  }
`;

const Image = styled.img`
   margin-bottom: 30px;
`;

const Paragraph = styled.p`
    color: #fff;
    margin-bottom: 0;
    font-family: "Lato",sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
// `;
export default Header;
