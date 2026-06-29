import "dotenv/config";

import express from "express";

import { InstagramAutomator } from "@insta-puppeteer/automator/InstagramAutomator";
import { prisma } from "@insta-puppeteer/database/server";

const app = express();
const port = process.env.PORT || 3200;

app.use(express.json());

app.post("/automate", async (req, res) => {
  const { hashtag } = req.body;

  const config = {
    profileName: process.env.PROFILE_NAME ?? "",
    email: process.env.EMAIL ?? "",
    password: process.env.PASSWORD ?? "",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    headless: false,
    viewport: { width: 1280, height: 860 },
  };

  const session = await prisma.session.create({
    data: { status: "IN_PROGRESS", hashtag },
  });

  const automator = new InstagramAutomator(config);
  automator.run(session.id, hashtag);

  res.json({ sessionId: session.id });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
