import express, { Application } from "express";
import cors from "cors";
import {
  verifyProofAge,
  verifyProofCmp,
  generateCallDataTwitter,
  generateProofTwitter,
  generateCallDataAge,
  generateProofAge,
} from "./lib/zkutils.js";

//ROUTES
import GPTRoutes from "./modules/gpt/gpt.routes";

const app: Application = express();
const port = 8080;
const corsOptions = {
  // To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(express.json());
app.set("trust proxy", true);
app.use(cors());
app.get("/", (req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

//GPT Routes
app.use("/api/gpt", GPTRoutes);

// Twitter Verification
app.get("/api/twitter/generate-call-data", async (req, res, next) => {
  try {
    console.log("Generating proof...");
    const followers = req.query.followers;
    const threshold = req.query.threshold;
    // check if creditScore is a number
    if (isNaN(followers as any as any) && isNaN(threshold as any as any)) {
      return res.status(400).send("followers must be a number");
    }
    const data = await generateCallDataTwitter(followers, threshold);

    if (
      data?.a === null ||
      data?.b === null ||
      data?.c === null ||
      data?.Input === null
    ) {
      return res.status(400).send("Error generating call data");
    }

    console.log("Call Data Generated");
    console.log("a", data?.a);
    console.log("b", data?.b);
    console.log("c", data?.c);
    console.log("Input", data?.Input);
    return res
      .status(200)
      .send({ a: data?.a, b: data?.b, c: data?.c, Input: data?.Input });
  } catch (err) {
    console.log(`Error Message ${err}`);
    next(err);
  }
});

app.post("/api/twitter/verify-proof", async (req, res, next) => {
  try {
    const { proof, publicSignals } = req.body;
    const result = await verifyProofCmp(proof, publicSignals);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(`Error Message ${error}`);
    next(error);
  }
});

app.get("/api/twitter/generate-proof", async (req, res, next) => {
  try {
    console.log("Generating proof...");
    const followers = req.query.followers;
    const threshold = req.query.threshold;
    // check if creditScore is a number
    if (isNaN(followers as any) && isNaN(threshold as any)) {
      return res.status(400).send("Followes and Threshold must be a number");
    }
    const p = await generateProofTwitter(followers, threshold);

    // check if proofJson is null
    if (p?.proof == null) {
      return res.status(400).send("creditScore must more than 15");
    }
    return res
      .status(200)
      .json({ proof: p?.proof, publicSignals: p?.publicSignals });
  } catch (error) {
    console.log(`Error Message ${error}`);
    next(error);
  }
});

// Age Verification
app.get("/api/age/generate-call-data", async (req, res, next) => {
  try {
    console.log("Generating proof...");
    const age = req.query.age;
    // check if age is a number
    if (isNaN(age as any)) {
      return res.status(400).send("age must be a number");
    }
    const data = await generateCallDataAge(age);

    if (
      data?.a === null ||
      data?.b === null ||
      data?.c === null ||
      data?.Input === null
    ) {
      return res.status(400).send("Error generating call data");
    }

    console.log("Call Data Generated");
    console.log("a", data?.a);
    console.log("b", data?.b);
    console.log("c", data?.c);
    console.log("Input", data?.Input);
    return res
      .status(200)
      .send({ a: data?.a, b: data?.b, c: data?.c, Input: data?.Input });
  } catch (error) {
    console.log(`Error Message ${error}`);
    next(error);
  }
});

app.get("/api/age/generate-proof", async (req, res, next) => {
  try {
    console.log("Generating proof...");
    const age = req.query.age;
    // check if age is a number
    if (isNaN(age as any)) {
      return res.status(400).send("creditScore must be a number");
    }
    const p = await generateProofAge(age);

    // check if proofJson is null
    if (p?.proof == null) {
      return res.status(400).send("age must more than 18");
    }
    return res
      .status(200)
      .json({ proof: p?.proof, publicSignals: p?.publicSignals });
  } catch (error) {
    console.log(`Error Message ${error}`);
    next(error);
  }
});

app.post("/api/age/verify-proof", async (req, res, next) => {
  try {
    const { proof, publicSignals } = req.body;
    const result = await verifyProofAge(proof, publicSignals);
    return res.status(200).json({ result });
  } catch (error) {
    console.log(`Error Message ${error}`);
    next(error);
  }
});

// =========================================

app.use("*", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed!",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
