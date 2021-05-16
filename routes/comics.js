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
  let { page, title } = req.query;
  //declare URL
  let url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`;

  //the api doesnt work with parenthesis in title
  if (title.indexOf("(") !== -1) {
    title = title.substring(0, title.indexOf("("));
  }

  const limit = 100;
  const skip = (page - 1) * limit;

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
