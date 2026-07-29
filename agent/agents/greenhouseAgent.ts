import { chromium } from "playwright";

export async function greenhouseAgent() {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("https://boards.greenhouse.io");

  /*
      Search jobs

      Read cards

      Extract data
  */

  await browser.close();

  return [
    {
      company: "Spotify",
      title: "React Developer",
      location: "Sweden",
      platform: "Greenhouse",
      url: "https://boards.greenhouse.io/job/123",
    },
  ];
}