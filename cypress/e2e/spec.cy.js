/// <reference types="cypress" />

context('Testes de Tickets', () => {

  beforeEach(() => {
    cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html');
  });

  it('TC01 - Input First and Last Name', () => {
    const firstName = "Alic";
    const lastName = "Victor";
    const fullName = `${firstName} ${lastName}`;

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get(".agreement p").should('contain', `I, ${fullName}, wish to buy`);
  })

  it('TC02 - Compra de Ingressos Full', () => {
    // Efetue a compra de Tickets com sucesso, preenchendo todos os campos apresentados no formulario
    // Desafios:
    // Preencher o campo Special Request com um texto longo e busque otimizar o tempo de digitação para que o teste tenha maior performace
    // Tente otimizar o preenchimento dos campos mandatórios, criando um comando Cypress personalizado.

    const firstName = "Alic";
    const lastName = "Victor";
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
    const ticketQuantity = "2";
    const specialRequest = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, 
    vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices 
    nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. 
    Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed 
    nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. 
    Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.`

    cy.fillMandatoryFields(firstName, lastName, email, ticketQuantity, specialRequest);
    cy.get('button[type="submit"]').contains("Confirm Tickets").click();
  });

  it('TC03 - Requisição HTTP - GET', () => {
    // Tal teste deve fazer uso da funcionalidade cy.request(), para fazer uma requisição tipo GET para a seguinte URL: https://httpbin.org/get
    // Com a resposta da requisição, verifique que o status retornou 200, o statusText retornou OK

    const url = 'https://httpbin.org/get';

    cy.request({
      method: 'GET',
      url: url,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.statusText).to.eq('OK');
    });

  });

  it('TC04 - Requisição HTTP - POST', () => {
    // Deverá ser feita uma requisição do tipo POST para a url: https://httpbin.org/post
    // Deverá ser informado no campo na requisição os dados (name e age) e com a resposta, verificar que o status retornou 200, o statusText retornou OK
  
    const url = 'https://httpbin.org/post';
    const requestData = {
      name: 'Alic',
      age: 20
    }

    cy.request({
      method: 'POST',
      url: url,
      body: requestData
    }).then((response) => {
      expect(response.statusText).to.eq('OK');
    });
  });

  // Prática V
  // Crie uma pipeline de testes automatizados. Vá até o GitHub e veja sua mudança disparando o pipeline (e se tudo der certo, veja seus testes passando)

}) 