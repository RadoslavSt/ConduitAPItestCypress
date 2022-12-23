/// <reference types='cypress'/>

describe("LogiIn, Get all articles from 1st page, Post comment on the last article ", () => {
  it("Log In successfully", () => {
    const realCredentials = {
      user: { email: "Darby_Williamson55@yahoo.com", password: "bob1234" },
    };

    const postComment = {
      comment: {
        body: "this is my API comments that is visible on the last created article",
      },
    };

    cy.api("POST", "https://api.realworld.io/api/users/login", realCredentials)
      .its("body")
      .then((body) => {
        console.log(body);

        const Tokenuser2 = body.user.token;
        cy.log(Tokenuser2);

        //Proverava tacan broj articala na prvoj strani
        //pravimo konstantu za poslednje kreirani artical kako bismo mogli da ostavimo komentar
        cy.request({
          method: "GET",
          url: "https://api.realworld.io/api/articles?limit=10&offset=0",
          headers: { authorization: "Token " + Tokenuser2 },
        }).then((responsive) => {
          console.log(responsive);
          expect(responsive.body.articles).to.have.length(10);
          cy.log(responsive.body.articles[0].slug);
          cy.log("ukupan broj articala je:" + responsive.body.articlesCount);
          const lastGalleryUrl = responsive.body.articles[0].slug;

          //postavljamo komentar na poslednji artical
          cy.request({
            method: "POST",
            url:
              "https://api.realworld.io/api/articles/" +
              lastGalleryUrl +
              "/comments",
            headers: { authorization: "Token " + Tokenuser2 },
            body: postComment,
          }).then((responsOnComm) => {
            console.log(responsOnComm);
            cy.log(responsOnComm.body.comment.body);
          });
        });
      });
  });
});



