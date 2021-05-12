const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  //recept query strings
  const { page, name } = req.query;
  //declare URL
  let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`;

  const limit = 100;
  const skip = (page - 1) * 100;

  //construct request URL
  name && (url += "&name=" + name);
  limit && (url += "&limit=" + limit);
  skip && (url += "&skip=" + skip);

  try {
    //API request
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
