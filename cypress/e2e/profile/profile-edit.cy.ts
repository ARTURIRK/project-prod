let profileId = '';
describe('Пользователь заходит на страницу профиля ', () => {
    beforeEach(() => {
        cy.visit('profile');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Профиль успешно загрузился', () => {
        cy.getByTestId('ProfileCard.FirstName').should('have.value', 'Ivan');
    });
    it('Профиль успешно отредактирован', () => {
        const newFirstName = 'Artur';
        const newLastName = 'Ivanov';
        cy.updateProfile(newFirstName, newLastName);
        cy.getByTestId('ProfileCard.FirstName').should('have.value', newFirstName);
        cy.getByTestId('ProfileCard.LastName').should('have.value', newLastName);
    });
});
