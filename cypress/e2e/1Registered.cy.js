/// <reference types ='cypress'/>

import { faker } from "@faker-js/faker";
const randomEmail = faker.internet.email();
const randomUsername = faker.name.firstName();

describe("Register new user and create new Article with him", () => {
  it("Registered new user with bad credentials", () => {
    const newCredentials = {
      user: {
        email: randomEmail,
        password: "bob1234",
        username: randomUsername,
      },
    };

    

    cy.api("POST", "https://api.realworld.io/api/users", newCredentials)
      .its("body")
      .then((body) => {
        console.log(body);
        const tokenUser = body.user.token;
        const userName = body.user.username;
        cy.log(tokenUser);


        const articleData = {
            article: {
              tagList: [],
              title: "api title created by: " + userName,
              description: "this is description",
              body: "this is body created by : " +  userName ,
            },
          };

        cy.request({
          method: "POST",
          url: "https://api.realworld.io/api/articles/",
          body: articleData,
          headers: { authorization: "Token " + tokenUser },
          
        });
      });
  });

//    Real credentials that we created user and we are going to use are :
//    email : Darby_Williamson55@yahoo.com,
//    password : bob1234
  
});
