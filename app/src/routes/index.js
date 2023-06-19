const express = require('express');
const router = express.Router();

const ctrl = require('./index.ctrl');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/search', ctrl.getData);
router.post('/netflix', ctrl.movieData);
router.post('/youtube', ctrl.getYoutubeDate);
router.post('/google-trend', ctrl.getGoogleTrands);
router.post('/jusic', ctrl.getJusic);
router.post('/melon', ctrl.getMelon);

module.exports = router;
