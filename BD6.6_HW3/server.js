let { app, port } = require("./index.js");

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
