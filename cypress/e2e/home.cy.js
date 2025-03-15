describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000');
  });

  it('displays the main heading', () => {
    cy.contains('h1', 'Boffin Institute of Data Science').should('be.visible');
  });

  it('navigates to courses page when courses link is clicked', () => {
    cy.contains('Courses').click();
    cy.url().should('include', '/courses');
  });

  it('navigates to registration page when register link is clicked', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/register');
  });

  it('navigates to about page when about link is clicked', () => {
    cy.contains('About Us').click();
    cy.url().should('include', '/about');
  });
});
