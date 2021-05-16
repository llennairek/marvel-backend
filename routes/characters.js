const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  //recept query strings
  let { page, name } = req.query;
  //declare URL
  let url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`;

  //the api doesnt work with parenthesis in name
  if (name.indexOf("(") !== -1) {
    name = name.substring(0, name.indexOf("("));
  }

  const limit = 100;
  const skip = (page - 1) * limit;

  //construct request URL
  name && (url += "&name=" + name);
  limit && (url += "&limit=" + limit);
  skip && (url += "&skip=" + skip);

  try {
    //API request
    const response = await axios.get(encodeURI(url));
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
