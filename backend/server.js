const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const os = require('os'); 
const app = express();
const PORT = process.env.PORT || 4000;

// Update the CORS origin to allow requests from localhost
const corsOptions = {
  origin: ["http://localhost", "http://frontend"],
  methods: "POST",
  allowedHeaders: "Content-Type",
  credentials: true,
};

app.use(cors(corsOptions));

// Increase the request body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
app.use(helmet());
app.use(compression());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json({
    ...req.headers,
    hostname: os.hostname(),
    date: new Date().toISOString(),
  });
});

app.get("/healthcheck", (req, res) => {
  res.json({ status: "UP" });
});

app.post(
  "/backend/upload",
  upload.fields([
    { name: "csv", maxCount: 1 },
    { name: "locationCsv", maxCount: 1 },
  ]),
  (req, res) => {
    if (!req.files || !req.files.csv || req.files.csv.length === 0) {
      console.error("File upload failed.");
      return res.status(400).send("No file uploaded");
    }

    const filePath = req.files.csv[0].path;

    let odsCommand;
    switch (req.body.command) {
      case "location":
        odsCommand = `ods_tools check --location ${filePath}`;
        break;
      case "account":
        if (req.files.locationCsv && req.files.locationCsv.length > 0) {
          const locationFilePath = req.files.locationCsv[0].path;
          odsCommand = `ods_tools check --account ${filePath} --location ${locationFilePath}`;
        } else {
          return res
            .status(400)
            .send("Location file missing for account check.");
        }
        break;
      default:
        console.error("Invalid command option received.");
        return res.status(400).send("Invalid command option.");
    }

    exec(odsCommand, (error, stdout, stderr) => {
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
      if (error) {
        console.error("Error running ods_tools:", error);
        return res.status(500).send({ stderr: stderr });
      }
      res.send({ stdout: stdout, stderr: stderr });
    });
  }
);

// Trust the headers passed by the proxy
app.set("trust proxy", true);

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
