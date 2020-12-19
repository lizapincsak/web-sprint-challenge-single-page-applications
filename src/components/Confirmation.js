import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ConfirmationHeader = styled.h2`
    color: ${(props) =>  props.theme.black};
    font-size: 2em;
`;
const LinkDiv = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.tertiaryColor};
  margin: 5%;
  padding: 5% 5%;
  font-size: 2em;
`;

function Confirmation (){
    return(
        <div>
            <LinkDiv>
            <Link to='/'>Home</Link>
            </LinkDiv>
            <ConfirmationHeader>Thank you for your order!</ConfirmationHeader>
            {/* <h3>Name: {details.name}</h3>
            <p>Pizza Size: {details.pizzaSize}</p>
            <p>Special Instructions: {details.specialInstructions}</p>
            {!!details.toppings && !!details.toppings.length && (
          <div>
            Toppings:
            <ul>
              {details.toppings.map((like, idx) => (
                <li key={idx}>{like}</li>
              ))}
            </ul>
            </div>
            )} */}
        </div>
    )
}

export default Confirmation;
