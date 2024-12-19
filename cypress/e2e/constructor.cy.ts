import { URL } from '@api';
import { deleteCookie, setCookie } from '../../src/utils/cookie';
import { selectorList } from '../support/constants/selectors';
import { url } from '../support/constants/url';

describe('Constructor is Operating Correctly', () => {
  beforeEach(() => {
    setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzk3ZDY1YjI3YjA2MDAxYzNlOGE0OCIsImlhdCI6MTczNDU3NDUyMSwiZXhwIjoxNzM0NTc1NzIxfQ.aKlJrvtcM-6LfYkuVf-x_6zSyBiBaH73h5W9lF5ee_0'
    );
    localStorage.setItem(
      'refreshToken',
      'a03b28b635b0d560b62db5690872a682cbe64bd1dae8c5acb8a83d122823b6bb0a2636b35f36276e'
    );
    cy.intercept('GET', `${URL}//auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit(url);
    cy.wait('@getUser');
  });

  it('Ingredients are Received from the Server', () => {
    cy.get(selectorList.constructor).as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Modal Opens and Closes', () => {
    cy.get(selectorList.ingredientItem).first().click();
    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');

    // закрытие по крестику
    cy.get(selectorList.modalCloseButton).click();
    cy.get('@modal').should('not.exist');

    // открытие
    cy.get(selectorList.ingredientItem).first().click();
    cy.get('@modal').should('exist');

    // закрытие по оверлею
    cy.get(selectorList.modalOverlay).click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });

  it('Order is Created', () => {
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as(
      'orderBurgerApi'
    );
    cy.get(selectorList.constructor).as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').children('div').children('button').click();

    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '37865');

    cy.get(selectorList.modalCloseButton).click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructor').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');

    cy.wait('@orderBurgerApi');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
