describe ("Data App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })

    const nameInput = () => cy.get('input[name="name"]');
    const specialInput = () => cy.get('input[name="specialInstructions"]');
    const sausageInput = () => cy.get('input[name="sausage"]');
    const pepperoniInput = () => cy.get('input[name="pepperoni"]');
    const olivesInput = () => cy.get('input[name="olives"]');
    const mushroomInput = () => cy.get('input[name="mushrooms"]');
    const submitButton = () =>  cy.get('.submit');
    const sizeInput = () => cy.get('select[name="pizzaSize"]')
    
    it("sanity test", () => {
        expect(1 + 2).to.equal(3);
    })
//test that you can add text to the box
it('NAME is added to text box', () => {
    nameInput().should('exist')
    .should('have.value', '')
    .type('Bob')
    .should('have.value', 'Bob')
})
it('EXTRA CHEESE is added to special box', () => {
    specialInput().should('exist')
    .should('have.value', '')
    .type('EXTRA CHEESE')
    .should('have.value', 'EXTRA CHEESE')
})
//test that you can select multiple toppings
it('checkboxes should check on and off', () => {
    sausageInput().uncheck();
    sausageInput().check();
    pepperoniInput().uncheck();
    pepperoniInput().check();
    olivesInput().uncheck();
    olivesInput().check();
    mushroomInput().uncheck();
    mushroomInput().check();
    olivesInput().uncheck();
    pepperoniInput().uncheck();
    mushroomInput().uncheck();
    sausageInput().uncheck();
})
//test that you can submit the form
it('can submit the form', () => {
    submitButton().should('exist');
    submitButton().should('be.disabled');
    nameInput().type('NAME');
    submitButton().should("be.disabled");
    nameInput().clear();
    sizeInput().should('exist');
    sizeInput().select('small');
    submitButton().should("be.disabled");
    sizeInput().select('medium');
    submitButton().should("be.disabled");
    sizeInput().select('large');
    submitButton().should("be.disabled");
    //final test
    nameInput().type("BOB");
    sizeInput().select('large');
    submitButton().should("not.be.disabled");
    nameInput().clear();
    //final final test
    nameInput().type("BOB");
    sizeInput().select('medium');
    olivesInput().check();
    sausageInput().check();
    mushroomInput().check();
    pepperoniInput().check();
    specialInput().type('anchovies');
    submitButton().should("not.be.disabled");
})
})





