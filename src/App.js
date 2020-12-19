import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';
import schema from './validation/formSchema';
import { Route, Switch } from 'react-router-dom';

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

const initialFormValues = {
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
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initilFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewOrder = (newOrder) => {
    axios.post('https://reqres.in/api/pizza', newOrder)
    .then((res) => {
      console.log(res);
      setOrders([res.data, ...orders])
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setFormValues(initialFormValues);
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
      <header>
      <Title>Pasture and Plenty Pizza</Title>
      </header>
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
          {/* {orders.map((order) => {
            return <Confirmation key={order.id} details={order} />
          })} */}
        </Route>
        <Route path='/'>
          <Home />
        </Route>
        </Switch>
    </DivWrapper>
  );
};
export default App;
