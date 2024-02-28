const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const API_BASE_URL = 'https://imdb-api.projects.thetuhin.com';

app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/title/:imdb_id', async (req, res) => {
    console.log("title")
  try {
    const imdb_id = req.params.imdb_id;
    const response = await axios.get(`${API_BASE_URL}/title/${imdb_id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reviews/:imdb_id', async (req, res) => {
  try {
    const imdb_id = req.params.imdb_id;
    const option = req.query.option || 'helpfulness';
    const sortOrder = req.query.sortOrder || 'desc';
    const response = await axios.get(`${API_BASE_URL}/reviews/${imdb_id}?option=${option}&sortOrder=${sortOrder}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/title/:imdb_id/season/:season_id', async (req, res) => {
  try {
    const imdb_id = req.params.imdb_id;
    const season_id = req.params.season_id;
    const response = await axios.get(`${API_BASE_URL}/title/${imdb_id}/season/${season_id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const response = await axios.get(`${API_BASE_URL}/user/${user_id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/:user_id/ratings', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const ratingFilter = req.query.ratingFilter || '';
    const sort = req.query.sort || 'most_recent';
    const response = await axios.get(`${API_BASE_URL}/user/${user_id}/ratings?ratingFilter=${ratingFilter}&sort=${sort}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
