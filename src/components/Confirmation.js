import React from 'react';
import styled from 'styled-components';
// import Pizza from '../Assets/Pizza';

const ConfirmationHeader = styled.h2`
    color: ${(props) =>  props.theme.black};
    font-size: 2em;
`;

function Confirmation () {
    
    return (
        <div>
            <ConfirmationHeader>Thank you for your order!</ConfirmationHeader>
            
        </div>
    )
}

export default Confirmation;
