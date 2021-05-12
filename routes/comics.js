const router = require("express").Router();
const axios = require("axios");

router.get("/:id", async (req, res) => {
  try {
    //recept params
    const { id } = req.params;

    //API request
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  //recept query strings
  const { page, title } = req.query;
  //decalre URL
  let url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`;

  const limit = 100;
  const skip = (page - 1) * 100;

  //construct request URL
  title && (url += "&title=" + title);
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
