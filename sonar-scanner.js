/* eslint-disable */
const scanner = require("sonarqube-scanner");
require("dotenv").config();

scanner({
  serverUrl: process.env.SONARQUBE_HOST,
  options: {
    "sonar.projectKey": "rms-portal",
    "sonar.login": process.env.SONAR_LOGIN,
    "sonar.sources": ".",
    "sonar.qualitygate.wait": "true",
  },
});
