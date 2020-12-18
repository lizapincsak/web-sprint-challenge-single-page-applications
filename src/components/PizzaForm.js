import React from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import Confirmation from './Confirmation';
import styled from 'styled-components';

const PizzaDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.5em;
    color: ${(props) =>  props.theme.secondaryColor};
    margin: 5%;
    padding: 5% 5%;
    border: 2px solid ${(props) => props.theme.black};
`;

const Subheader = styled.h2 `
    color: ${(props) =>  props.theme.black};
    font-size: 2em;
`;

const ButtonStyled = styled.div`
    button{
        background: transparent;
        font-size: 1.5em;
        border-radius: 3px;
        border: 2px solid ${(props) => props.theme.black};
        margin: 0 1em;
        padding: 0.25em 1em;
        color: ${(props) => props.theme.primaryColor};

    &:hover {
      transform: scale(1.1);
      transition: all 0.5s ease-in-out;
    }
    transition: all 0.5s ease-in-out;
    }
`
export default function PizzaForm (props) {
    const { values, change, submit, disabled, errors } = props;
    const { path } = useRouteMatch();

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        change (name, valueToUse);
    }
    const thankYou = (evt) => {
        alert('Thank you for your order!')
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="errors" style={{color: 'brown'}}>
                    <div>{errors.name}</div>
                    <div>{errors.pizzaSize}</div>
                    <div>{errors.specialInstructions}</div>
                    {/* <div>{errors.toppings}</div> */}
                </div>
                <PizzaDiv className="inputs">
                    <label>Name: 
                    <input
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    placeholder="Type name here"
                    />
                    </label>
                <label>Pizza Size: 
                    <select onChange={onChange} value={values.pizzaSize} name="pizzaSize">
                        <option value="">--Select a Size--</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </label>
                <label>Sausage:
                    <input
                    type="checkbox"
                    name="sausage"
                    checked={values.sausage}
                    onChange={onChange}
                    />
                </label>
                <label>Pepperoni:
                    <input
                    type="checkbox"
                    name="pepperoni"
                    checked={values.pepperoni}
                    onChange={onChange}
                    />
                </label>
                <label>Olives:
                    <input
                    type="checkbox"
                    name="olives"
                    checked={values.olives}
                    onChange={onChange}
                    />
                </label>
                <label>Mushrooms:
                    <input
                    type="checkbox"
                    name="mushrooms"
                    checked={values.mushrooms}
                    onChange={onChange}
                    />
                </label>
                <label>Special Instructions:
                    <input
                    type="text"
                    name="specialInstructions"
                    placeholder="type additional instructions"
                    checked={values.specialInstructions}
                    onChange={onChange}
                    />
                </label>
                </PizzaDiv>
                <div>
                    <Subheader>Please Submit Your Order</Subheader>
                    <Link to={'/thanks'}>
                    <ButtonStyled>
                    <button onClick={thankYou} className='submit' disabled={disabled}>Submit</button>
                    </ButtonStyled>
                    </Link>
                </div>
            </form>
            <Route path={`${path}/thanks`}>
                <Confirmation />
            </Route>
        </div>
    )
}