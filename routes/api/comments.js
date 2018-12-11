const express = require('express');
const router = express.Router();
const Comment = require("../../db/db").comment;

// @route   GET api/comment
// @desc    Get current comment
// @access  Private
router.get("/", (req, res) => {
    Comment.findOne({
        where: {
            idSearch: req.headers.idsearch
        }
    }).then(comment => {
        res.json(comment);
    }).catch(err => res.json(err))
});

// @route POST api/comment
// @desc Create comment at search insert
// @access Public
router.post("/create", (req, res) => {
    Comment.create({
            commentText: req.body.commentText,
            idSearch: req.body.idSearch
        })
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(err => res.status(500).send(err));
});

// @route PUT api/comment
// @desc Update current preferences
// @access Public
router
    .put("/update", (req, res) => {
        Comment.update({
                commentText: req.body.commentText,
            }, {
                where : {
                    idSearch: req.body.idSearch
                }
            })
            .then(comment => {
                res.status(200).json(comment);
                console.log('Comment updated successfully!')
            })
            .catch(err => res.status(500).send(err));
    });

module.exports = router;