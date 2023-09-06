const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const usersRoute = require("./routes/usersRoute");
const postsRoute = require("./routes/postsRoute");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUİ = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");

app.use(bodyParser.json());

/* Swagger İnitialization Start */
const swaggerOptions = {
  swaggerDefinition: (swaggerJSDoc.Options = {
    info: {
      title: "my-posts-node",
      description: "My Posts API Information",
      contact: {
        name: "Meryam Abdulla",
      },
      servers: ["http://localhost:3000"],
    },
  }),
  apis: ["./routes/*.js"],
};


const swaggerFile = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocs = YAML.load(swaggerFile);
app.use("/api-docs", swaggerUİ.serve, swaggerUİ.setup(swaggerDocs));
/* Swagger İnitialization End */

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


