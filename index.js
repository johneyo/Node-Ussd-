const express = require("express");
const router = express.Router();

router.post("/start", (req, res) => {
  const { sessionId, erviceCode, phoneNumber, text } = req.body;

  if (text == "") {
    res
      .status(200)
      .send(
        "CON What would you want to check \n 1. My Account \n 2. My phone number"
      );
  } else if (text == "1") {
    res
      .status(200)
      .send(
        "CON Choose account information you want to view \n 1. Account number \n 2. Account balance \n"
      );
  } else if (text == "2") {
    res.status(200).send(`END Your phone number is ${phoneNumber}`);
  } else if (text == "1*1") {
    const accountNumber = "ACC1001";
    res.status(200).send(`END Your account number is ${accountNumber}`);
  } else if (text == "1*2") {
    const balance = "₦5,000";
    res.status(200).send(`END Your balance is ${balance}`);
  } else {
    res.status(200).send(`END Please start the application again`);
  }

  console.log("############", req.body);
  let response = "";
});
module.exports = router;
