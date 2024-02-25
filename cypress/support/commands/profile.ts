export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.Edit').click();
    cy.getByTestId('ProfileCard.FirstName').clear().type(firstname);
    cy.getByTestId('ProfileCard.LastName').clear().type(lastname);
    cy.getByTestId('EditableProfileCardHeader.Save').click();
};

export const resetProfile = (profileId: string) =>
    cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asasf' },
        body: {
            id: '3',
            firstName: 'Ivan',
            lastName: 'Kot',
            age: 23,
            currency: 'RUS',
            country: 'Russia',
            city: 'Irkutsk',
            username: 'testuser',
            avatar: 'https://w.forfun.com/fetch/b4/b48a66b3c4ea0107be482a87f1e50fb8.jpeg',
        },
    });

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
