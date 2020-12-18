import * as yup from 'yup';

export default yup.object().shape({
name: yup
.string()
.required('name is required')
.min(2, 'name must be 2 characters long'),
pizzaSize: yup
.string()
.oneOf(['small', 'medium', 'large'], 'you must select a size'),
sausage: yup.boolean(),
pepperoni: yup.boolean(),
olives: yup.boolean(),
mushrooms: yup.boolean(),
specialInstructions: yup
.string(),
});