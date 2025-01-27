describe('Authentication Tests', () => {
  it('should get tokens', () => {
    cy.request({
      method: 'POST',
      url: `https://norma.nomoreparties.space/api/auth/login`,
      body: {
        email: 'andrei@gmail.com',
        password: '12345678'
      }
    }).then((response) => {
      const { accessToken, refreshToken } = response.body;
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      cy.log('Access Token:', accessToken);
      cy.log('Refresh Token:', refreshToken);
    });
  });
});
