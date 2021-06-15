describe('Blog', function() {
	it('front end can be opened', function () {
		cy.visit('http://localhost:3000')
		cy.contains('blogs')
	})

	it('initially app is in login state', function () {
		cy.visit('http://localhost:3000')
		cy.contains('Log in for application')
	})

	describe('When user is logged in', function () {
		beforeEach(function() {
			cy.visit('http://localhost:3000')
			cy.get('#username')
				.type('neel12')
			cy.get('#password')
				.type('qwertyuiop')
			cy.contains('Login')
				.click()
		})

		it('Login works', function () {
			cy.contains('Neel logged in')
		})

		it('initially at blogs page', function () {
			cy.url().should('eq','http://localhost:3000/blogs')
		})

		it('should contains some blogs', function () {
			cy.contains('2 more dead in assam')
		})

		it('logout works', function () {
			cy.contains('logout')
				.click()
			cy.contains('Log in for application')
		})

		it('add new blog post', function() {
			cy.contains('create new').click()
			
			cy.get('[data-cy=title]')
				.type('Adding new post via cypress')
			cy.get('#author').type('Parshva Barbhaya')
			cy.get('#url').type('http://localhost:3000')
			
			cy.contains('create').click()
		})
	})
})