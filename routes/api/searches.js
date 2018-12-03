const express = require("express");
const https = require("https");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Input validation
const validateSearch = require('../../validation/search');

//mySearches
const Search = require("../../db/db").search;

// @route GET /api/users/test
// @desc Tests post route
// @access Private
router.get("/search", (req, res) => {
  console.log(req.query.query);

  bingWebSearch(req.query.query)
    .then(results => {
      let currentResults = [];
      results.webPages.value.forEach(value => {
        currentResults.push({
          id: value.id,
          name: value.name,
          url: value.url,
          snippet: value.snippet
        });
      });
      res.status(200).send(currentResults);
    })
    .catch(err => console.log(err));
});

//async + promise ca sa astepte pana cand primeste un raspuns de la query sa nu returneze blank
async function bingWebSearch(query) {
  const SUBSCRIPTION_KEY = "bccdbec011754ea0b33e296bf61aa9d5";
  if (!SUBSCRIPTION_KEY) {
    throw new Error("AZURE_SUBSCRIPTION_KEY is not set.");
  }

  return new Promise((resolve, reject) => {
    https.get(
      {
        hostname: "api.cognitive.microsoft.com",
        path: "/bing/v7.0/search?q=" + encodeURIComponent(query),
        headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY }
      },
      res => {
        let body = "";
        res.on("data", part => (body += part));
        res.on("end", () => {
          for (var header in res.headers) {
            if (
              header.startsWith("bingapis-") ||
              header.startsWith("x-msedge-")
            ) {
              console.log(header + ": " + res.headers[header]);
            }
          }
          resolve(JSON.parse(body));
        });
        res.on("error", e => {
          reject(e);
        });
      }
    );
  });
}

// trebuie rezolvat whereul ca sa pot sa extrag pt user specific
// @route   GET api/searches
// @desc    Get all searches
// @access  Private
router.get("/", (req, res) => {
  Search.findAll({
    // where: {
    //   userEmail: req.headers.email
    // }
  })
    .then(searches => { 
        res.json(searches);
    });
});

// @route   POST api/searches/addSearch
// @desc    Create a search
// @access  Private
router.post("/addSearch", (req, res) => {

  const { errors, isValid } = validateSearch(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  Search.create({
    searchText: req.body.searchText,
    date: req.body.date,
    userEmail: req.body.userEmail
  })
    .then(search => {
      res.status(200).json(search);
    })
    .catch(err => res.status(500).send(err));
});

// @route   DELETE api/searches/:id
// @desc    Delete a search
// @access  Private
router.delete("/:id", (req, res) => {
  Search.destroy({
    where: {
      idSearch: req.params.id
    }
  })
  .then(res.status(200).json( {success: true }))
  .catch(err => res.status(400).json({sucess: false}));
});

module.exports = router;
