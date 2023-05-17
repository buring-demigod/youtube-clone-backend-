const express = require('express');
const { getVideos, getSubscriptions, getComments, getVideo, getChannel, getFeedSubscriptions, getPlaylistVideos, getPlaylist } = require('../controllers/dataControllers');
const router = express.Router();
const auth = require('../middleware/auth');
const validity = require('../middleware/validity');


router.get('/videos', getVideos);

router.get('/comments', getComments);

router.get('/channel', getChannel);

router.get('/playlist', getPlaylist);

router.get('/subcriptions', auth, validity, getSubscriptions);

router.get('/feedsubscriptions', auth, validity, getFeedSubscriptions);

router.get('/playlistvideos', auth, validity, getPlaylistVideos);

router.get('/video', getVideo);



module.exports = router;