const express = require('express');
const router = express.Router();

// @route GET /api/users/test
// @desc Tests post route
router.get('/test', (req, res) => res.json({
    msg: 'Preferences works'
})); //trimit json

module.exports = router;