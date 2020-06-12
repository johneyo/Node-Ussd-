const express = require("express");
const router = express.Router();
const UssdMenu = require("ussd-menu-builder");
let menu = new UssdMenu();

const registerPhoneNumber = () =>
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
    // setTimeout(() => reject(new Error("Whoops!")), 1000);
  });
menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "Welcome. Choose option:" +
        "\n1. User Registration" +
        "\n2. New Loan Request" +
        "\n3. Loan Topup Request" +
        "\n4. Loan Balance Inquiry" +
        "\n5. Savings Plan Balance" +
        "\n6. Savings Plan Balance Loan Liquidation"
    );
  },
  // next object links to next state based on user input
  next: {
    "1": "userRegistration",
    "2": "newLoanRequest",
    "3": "loanTopUpRequest",
    "4": "loanBalanceEnquiry",
    "5": "savingsPlanBalance",
    "6": "savingsPlanLoanLiquidation",
  },
});

menu.state("userRegistration", {
  run: () => {
    menu.con(
      "How do you want to register:" +
        "\n1. Register with phone number" +
        "\n2. Register with IPPIS" +
        "\n3. Go back" +
        "\n4. Exit"
    );
  },
  next: {
    "1": "phoneRegistration",
    "2": "ippisRegistration",
    "3": "goBack",
    "4": "exit",
  },
});

menu.state("phoneRegistration", {
  run: () => {
    menu.con("Put in your phone number:" + "\n1. Go back" + "\n2. Exit");
  },
  next: {
    "*\\d+": "phoneRegistration.number",
    "1": "goBack",
    "2": "exit",
  },
});

menu.state("phoneRegistration.number", {
  run: () => {
    var number = menu.val;
    registerPhoneNumber(number)
      .then(function (res) {
        menu.con("Put in your email" + "\n1. Exit");
      })
      .catch(() => menu.end("Phone number registration failed."));
  },
  next: {
    "*\\w+@\\w+\\.\\w+": "phoneRegistration.email",
    "1": "exit",
  },
});
menu.state("phoneRegistration.email", {
  run: () => {
    var password = menu.val;
    registerPhoneNumber(password)
      .then(function (res) {
        menu.con("Put in your passwsord" + "\n1. Exit");
      })
      .catch(() => menu.end("Phone number registration failed."));
  },
  next: {
    "*\\d+": "phoneRegistration.password",
    "1": "exit",
  },
});
menu.state("phoneRegistration.password", {
  run: () => {
    var password = menu.val;
    registerPhoneNumber(password)
      .then(function (res) {
        menu.end("You have succesfully registered.");
      })
      .catch(() =>
        menu.con(
          "Phone number registration failed." +
            "Put in your passwsord" +
            "\n1. Exit"
        )
      );
  },
  next: {
    "*\\d+": "phoneRegistration.pasword",
    "1": "exit",
  },
});

menu.state("ippisRegistration", {
  run: () => {
    menu.con("Put in your IPPIS number:" + "\n1. Go back" + "\n2. Exit");
  },
  next: {
    "*\\d+": "ippisRegistration.number",
    "1": "userRegistration",
    "2": "exit",
  },
});
menu.state("ippisRegistration.number", {
  run: () => {
    var number = menu.val;
    registerPhoneNumber(number)
      .then(function (res) {
        menu.end("You have succesfully registered.");
      })
      .catch(() =>
        menu.con(
          "IPPIS registration failed." +
            "Put in your IPPIS number" +
            "\n2. Exit"
        )
      );
  },
  next: {
    "*\\d+": "ippisRegistration.number",
    "1": "exit",
  },
});

//New Loan
menu.state("newLoanRequest", {
  run: () => {
    menu.con("Enter Tenure (in months)" + "\n0. Go back");
  },
  next: {
    "0": "",
    "*\\d+": "newLoanRequest.tenure",
  },
});

menu.state("newLoanRequest.tenure", {
  run: () => {
    var tenure = menu.val;
    registerPhoneNumber(tenure)
      .then(function (res) {
        menu.con("Put in your loan duration" + "\n0. Go Back");
      })
      .catch(() =>
        menu.con("Tenure Denied, put in a less duration" + "\n0. Go Back")
      );
  },
  next: {
    "*\\d+": "newLoanRequest.amount",
    "0": "newLoanRequest",
  },
});

menu.state("newLoanRequest.amount", {
  run: () => {
    var amount = menu.val;
    registerPhoneNumber(amount)
      .then(function (res) {
        menu.con("Put in your loan amount" + "\n0. Go back" + "\n*. Exit");
      })
      .catch(() =>
        menu.con(
          "Amount Denied, put in a lesser amount" + "\n0. Go Back" + "\n*. Exit"
        )
      );
  },
  next: {
    "*\\d+": "newLoanRequest.password",
    "0": "newLoanRequest.tenure",
    "*": "exit",
  },
});

menu.state("newLoanRequest.password", {
  run: () => {
    var password = menu.val;
    registerPhoneNumber(password)
      .then(function (res) {
        menu.end(
          "Your loan has been logged in for processing, it will take between 2 to 24hrs. "
        );
      })
      .catch(() =>
        menu.con(
          "New Loan request failed." + "Put in your passwsord" + "\n1. Exit"
        )
      );
  },
  next: {
    "*\\d+": "newLoanRequest.pasword",
    "1": "exit",
  },
});

//Loan Top Up

menu.state("loanTopUpRequest", {
  run: () => {
    menu.con("Enter Tenure (in months)" + "\n0. Go back");
  },
  next: {
    "0": "",
    "*\\d+": "loanTopUpRequest.tenure",
  },
});

menu.state("loanTopUpRequest.tenure", {
  run: () => {
    var tenure = menu.val;
    registerPhoneNumber(tenure)
      .then(function (res) {
        menu.con("Put in your loan duration" + "\n0. Go Back");
      })
      .catch(() =>
        menu.con("Tenure Denied, put in a less duration" + "\n0. Go Back")
      );
  },
  next: {
    "*\\d+": "loanTopUpRequest.amount",
    "0": "loanTopUpRequest",
  },
});

menu.state("loanTopUpRequest.amount", {
  run: () => {
    var amount = menu.val;
    registerPhoneNumber(amount)
      .then(function (res) {
        menu.con("Put in your loan amount" + "\n0. Go back" + "\n*. Exit");
      })
      .catch(() =>
        menu.con(
          "Amount Denied, put in a lesser amount" + "\n0. Go Back" + "\n*. Exit"
        )
      );
  },
  next: {
    "*\\d+": "loanTopUpRequest.password",
    "0": "loanTopUpRequest.tenure",
    "*": "exit",
  },
});

menu.state("loanTopUpRequest.password", {
  run: () => {
    var password = menu.val;
    registerPhoneNumber(password)
      .then(function (res) {
        menu.end(
          "Your loan top up has been logged in for processing, it will take between 2 to 24hrs."
        );
      })
      .catch(() =>
        menu.con(
          "Loan Top Up request failed." + "Put in your passwsord" + "\n1. Exit"
        )
      );
  },
  next: {
    "*\\d+": "loanTopUpRequest.pasword",
    "1": "exit",
  },
});

//Loan balance enquiry
menu.state("loanBalanceEnquiry", {
  run: () => {
    menu.con("Your Loan balance is: #5,000" + "\n1. Go Back" + "\n2. Exit");
  },
  next: {
    "1": "",
    "2": "exit",
  },
});

//Loan balance enquiry
menu.state("savingsPlanBalance", {
  run: () => {
    menu.con(
      "Your Savings plan balance is: #5,000" + "\n1. Go Back" + "\n2. Exit"
    );
  },
  next: {
    "1": "",
    "2": "exit",
  },
});

menu.state("exit", {
  run: function () {
    menu.end("Thank you!");
  },
});
router.post("/start", function (req, res) {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

module.exports = router;
