describe('Contact page', () => {
  it('should send a message', () => {
    cy.visit('http://localhost:3000/contact')
    
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="email"]').type('johndoe@gmail.com')
    cy.get('input[name="message"]').type('hello world !')

    cy.get('button[type="submit"]').click()
    cy.contains('Votre message a bien été envoyé')
  })
  it('should not send a message', () => {
    cy.visit('http://localhost:3000/contact')

    cy.get('input[name="lastName"]').type('a')
    cy.get('input[name="firstName"]').type('b')
    cy.get('input[name="email"]').type('c')
    cy.get('input[name="message"]').type('d')

    cy.get('button[type="submit"]').click()

    cy.get('p:contains("String must contain at least 2 character(s)")')
      .should('have.length', 3)
      
    cy.contains('Invalid email')
  })
})