const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

const ressourceName ="books";

const settings ={
  port:3000,
  datafile : "./testdata.json"
};

