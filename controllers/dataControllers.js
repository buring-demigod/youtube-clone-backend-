const axios = require('axios');
require('dotenv').config();

const getVideos = async (req, res) => {
  const { query, videoId, channelId, order } = req.query;
  try {
    const searchParams = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      ...(query ? { q: query } : {}),
      ...(videoId ? { relatedToVideoId: videoId } : {}),
      ...(channelId ? { channelId } : {}),
      ...(order ? { order } : {}),
      videoDefinition: 'high',
      videoEmbeddable: true,
      maxResults: 10,
    });

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&${searchParams.toString()}`;

    const searchResponse = await axios.get(searchUrl);

    const videos = await Promise.all(searchResponse.data.items.map(async (video) => {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id.videoId}&key=${process.env.API_KEY}`;

      const response = await axios.get(url);
      return response.data;
    }));

    res.send(videos);
  } catch (error) {
    res.send({ error });
  }
}

const getVideo = async (req, res) => {
  const { videoId } = req.query;

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.API_KEY}`;

    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getComments = async (req, res) => {
  const { videoId } = req.query;

  try {
    const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.API_KEY}`;

    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.send({ error: error.message });
  }
}

const getSubscriptions = async (req, res) => {
  try {
    const response = await axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions', {
      params: {
        part: 'snippet',
        maxResults: 10,
        mine: true,
        key: process.env.API_KEY
      },
      headers: {
        Authorization: 'Bearer ' + req.accessToken,
      }
    });
    res.send({ data: response.data.items });
  } catch (error) {
    res.send(error);
  }
}

const getChannel = async (req, res) => {
  const { channelId } = req.query;
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${process.env.API_KEY}&part=snippet,contentDetails,statistics,brandingSettings`;

    const response = await axios.get(url);

    res.send(response.data.items[0]);
  } catch (error) {
    res.send({ error: error.message });
  }
}

const getFeedSubscriptions = async (req, res) => {
  try {
    const response = await axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions', {
      params: {
        part: 'snippet',
        maxResults: 20,
        mine: true,
        key: process.env.API_KEY
      },
      headers: {
        Authorization: 'Bearer ' + req.accessToken,
      }
    });

    const subscribed = response.data.items;

    const videoResponse = await Promise.all(subscribed.map(async (item) => {
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCmXmlB4-HJytD7wek0Uo97A&maxResults=3&order=date&key=${process.env.API_KEY}`;
      searhResponse = await axios.get(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + req.accessToken,
        }
      });
      return searchResponse.data.items;
    }));
    console.log(videoResponse);
    res.send(videoResponse);

  } catch (error) {
    res.send(error);
  }
}

const getPlaylistVideos = async (req, res) => {
  const { id } = req.query;
  try {
    const videoResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&maxResults=10&key=${process.env.API_KEY}`, {
      headers: {
        Authorization: 'Bearer ' + req.accessToken,
      }
    });
    res.send(videoResponse.data.items);
  } catch (error) {
    res.send(error);
  }
}

const getPlaylist = async (req, res) => {
  const { channelId } = req.query;
  try {
    const playlist = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=15&key=${process.env.API_KEY}`);

    res.send(playlist.data.items);
  } catch (error) {
    res.send(error);
  }
}

module.exports = { getSubscriptions, getVideos, getComments, getVideo, getChannel, getFeedSubscriptions, getPlaylistVideos, getPlaylist };