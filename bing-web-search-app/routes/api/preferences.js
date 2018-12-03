const express = require("express");
const router = express.Router();

const Preference = require("../../db/db").preference;

// @route POST api/preferences
// @desc Create user preferences DEFAULT
// @access Public
router.post("/create", (req, res) => {
  Preference.create({
    webPages: false,
    news: false,
    images: false,
    from: '24 hours ago',
    userEmail: req.body.userEmail
  })
    .then(preference => {
      res.status(200).json(preference);
    })
    .catch(err => res.status(500).send(err));
});

// @route PUT api/preferences
// @desc Update current preferences
// @access Public
router.put("/update", (req, res) => {
  Preference.update({
    webPages: req.body.webPages,
    news: req.body.news,
    images: req.body.images,
    from: req.body.from,
  },
  {
      where : {
        userEmail: req.body.userEmail
      }
  })
    .then(preference => {
      res.status(200).json(preference);
      console.log('Preference updated successfully!')
    })
    .catch(err => res.status(500).send(err));
});

// @route   GET api/preferences
// @desc    Get user preferences
// @access  Private
router.get("/load", (req, res) => {
  Preference.findOne({
    where: {
      userEmail: req.headers.email
    }
  }).then(preferences => {
    res.json(preferences);
  }).catch(err => res.json(err))
});


module.exports = router;
