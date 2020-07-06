describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: 'Hurri Markkunen',
      username: 'Marukka',
      password: 'hurrikka'
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('log in to application')
    cy.contains('login').click()
    cy.get('#username').should('exist').type('password')
    cy.get('#password').should('exist').type('password')
  })

  describe('Login', () => {

    it('Login succeeds', () => {
      cy.contains('login').click()
      cy.get('#username').type('Marukka')
      cy.get('#password').type('hurrikka')
      cy.get('#login-button').click()
      cy.contains('Hurri Markkunen logged in')
    })

    it('Login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('Marukka')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Wrong credentials!')
        .and('have.css', 'background-color', 'rgb(172, 14, 14)')

      cy.get('html').should('not.contain', 'Hurri Markkunen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'Marukka', password: 'hurrikka'})
    })
    
    it('a new blog can be created', function() {
      cy.contains('Create Post').click()
      cy.get('#title').type('Suuri ja mahtava Kouvostoliitto')
      cy.get('#author').type('Pekka Siitoin')
      cy.get('#url').type('www.pekanpuuhapaja.com')
      cy.contains('Submit Post').click()
      // eslint-disable-next-line quotes
      cy.contains("New post 'Suuri ja mahtava Kouvostoliitto' by author Pekka Siitoin created.")
    })
  })

  describe('Logged in and post created', function() {
    beforeEach(function() {
      cy.login({username: 'Marukka', password: 'hurrikka'})
      cy.createBlog({
        title: 'Suuri ja mahtava Kouvostoliitto',
        author: 'Pekka Siitoin',
        url: 'www.pekanpuuhapaja.com',
        likes: 0
      })

    })

    it('A blog post can be liked', function() {
      cy.contains('View').click()
      cy.contains('Like').as('LikeElement')
      cy.get('@LikeElement').parent().should('contain', 0)
      cy.get('@LikeElement').click()
      cy.get('@LikeElement').parent().should('contain', 1)
    })

    it('A blog post can be deleted', function() {
      cy.contains('Suuri ja mahtava Kouvostoliitto').parent().as('TargetElement')
      cy.get('@TargetElement').contains('View').click()
      cy.get('@TargetElement').contains('Remove').click()
      cy.contains('Suuri ja mahtava Kouvostoliitto by author Pekka Siitoin succesfully deleted')
    })

  })

  describe('Logged in, 3 posts added', function() {
    beforeEach(function() {
      cy.login({username: 'Marukka', password: 'hurrikka'})
      cy.createBlog({
        title: 'Suuri ja mahtava Kouvostoliitto',
        author: 'Pekka Siitoin',
        url: 'www.pekanpuuhapaja.com',
        likes: 0,
      })
      cy.createBlog({
        title: 'Pieni ja naurettava Sotkamo',
        author: 'Jessika Aro',
        url: 'www.keha3.com',
        likes: 8,
      })
      cy.createBlog({
        title: 'Keskisuuri ja hieman huvittava Turku',
        author: 'Mauri Kunnas',
        url: 'www.kirjoitanelainsatuja.com',
        likes: 5,
      })

    })

    it.only('Blog posts are sorted by likes', function() {
      cy.get('div>h3').eq(0).contains('Pieni ja naurettava Sotkamo')
      cy.get('div>h3').eq(1).contains('Keskisuuri ja hieman huvittava Turku')
      cy.get('div>h3').eq(2).contains('Suuri ja mahtava Kouvostoliitto')
    })

  })

})

