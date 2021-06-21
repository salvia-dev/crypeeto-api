import * as dotenv from "dotenv";
import path from "path";

// Configure the .env file
dotenv.config({ path: path.join(__dirname + "/.env") });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3001;

// Server configuration
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(router);

// Connect to the database
mongoose
  .connect(process.env.MONGO_DATABASE_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server has started running on port ${PORT}.`
  );
});

export default app;
