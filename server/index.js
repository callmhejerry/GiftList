const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "7379d0e5b26d5e5b02fe67212004bd805e0128d47907a8e1ba14e17ce45765d8";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const { proof, name } = body;
  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
