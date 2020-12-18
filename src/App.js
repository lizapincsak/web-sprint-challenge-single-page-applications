import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import schema from './validation/formSchema';
import { Route, Link, Switch } from 'react-router-dom';

import Confirmation from './components/Confirmation';
import Home from './components/Home';
import PizzaForm from './components/PizzaForm';

const DivWrapper = styled.div`
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.white};
  width: 100%;
  height: 100%;
  padding: 4%;
`;

const Title = styled.h1`
  font-size: 3em;
  color: ${(props) => props.theme.black};
`;

const LinkChange = styled.div `
  display: flex;
  justify-content: space-around;
  color: ${(props) => props.theme.white};
  border: 2px solid ${(props) => props.theme.tertiaryColor};
  margin: 5%;
  padding: 5% 5%;
  font-size: 2em;
`;

const initialValueForms = {
  name: '',
  pizzaSize: '',
  sausage: false, 
  pepperoni: false, 
  olives: false, 
  mushrooms: false,
  specialInstructions: '',
}

const initilFormErrors = {
  name: '',
  pizzaSize: '',
  specialInstructions: '',
}

const initialOrder = [];
const initialDisabled = true;

function App() {
  const [orders, setOrders] = useState(initialOrder);
  const [formValues, setFormValues] = useState(initialValueForms);
  const [formErrors, setFormErrors] = useState(initilFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewOrder = (newOrder) => {
    axios.post('https://reqres.in/api/users', newOrder)
    .then((res) => {
      setOrders([res.data, ...orders]);
      setFormValues(initialValueForms);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const inputChange = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors, 
        [name]: '',
      })
    })
    .catch((err) => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })
    setFormValues({
      ...formValues, [name]: value,
    })
  }
  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      pizzaSize: formValues.pizzaSize.trim(),
      toppings: ['sausage', 'pepperoni', 'olives', 'mushrooms'].filter((topping) => formValues[topping]),
      specialInstructions: formValues.specialInstructions.trim(),
    }
    postNewOrder(newOrder);
  }

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    })
  }, [formValues]);

  return (
    <DivWrapper>
      <nav>
      <Title>Pasture and Plenty Pizza</Title>
      <LinkChange>
        <Link to='/'>Home</Link>
        <Link to='/pizza'>Order</Link>
      </LinkChange>
      </nav>
      <Switch>
        <Route path='/pizza'>
          <PizzaForm 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
          />
        </Route>
        <Route path='/thanks'>
          <Confirmation />
        </Route>
        <Route path='/'>
          {orders.map((order) => {
            return (<Home key={order.id} details={order} />)
          })}
        </Route>
      </Switch>
    </DivWrapper>
  );
};
export default App;
