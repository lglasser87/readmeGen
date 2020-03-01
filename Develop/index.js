const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./markdown.js")
const api = require("./api")

const writeFileAsync = util.promisify(fs.writeFile);

function promptAnswers() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?"
    },
    {
      type: "input",
      name: "description",
      message: "What is the description of your project?"
    },
    {
      type: "input",
      name: "tableOfContents",
      message: "explain the layout of your table of contents or bullet points"
    },
    {
      type: "input",
      name: "installation",
      message: "What was the process to install this program?"
    },
    {
      type: "input",
      name: "use",
      message: "What is the intended use of this program?"
    },
    {
      type: "input",
      name: "license",
      message: "Who owns the license to this program"
    },
    {
      type: "input",
      name: "contributing",
      message: "Who contributed in the development of this program?"
    },  
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">This project is named  ${answers.title}</h1>
    <p class="lead">Description:  ${answers.description}.</p>
    <p>My table of contents consists of ${answers.tableOfContents}</p>
    <p>The following steps:  ${answers.installation}</p>
    <p>License ${answers.license}</p>
    <p>The contributor(s) to this project: ${answers.contributing}</p>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });