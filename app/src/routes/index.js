const express = require('express');
const router = express.Router();

const ctrl = require('./index.ctrl');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/search', ctrl.getData);
router.post('/netflix', ctrl.movieData);
router.post('/youtube', ctrl.getYoutubeDate);
router.post('/google-trand', ctrl.getGoogleTrands);

module.exports = router;
