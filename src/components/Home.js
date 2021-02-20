import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkChange = styled.div `
  display: flex;
  justify-content: space-around;
  color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.tertiaryColor};
  margin: 5%;
  padding: 5% 5%;
  font-size: 2em;
`;
function Home (){
    return(
        <LinkChange>
            <Link to='/pizza'>ORDER</Link>
        </LinkChange>
    )
}
export default Home;