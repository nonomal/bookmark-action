import pen15 from "./fixtures/pen15.json";
import soup from "./fixtures/slow-cooker-soup.json";
import ogs from "open-graph-scraper";
import { getMetadata } from "../get-metadata";

jest.mock("open-graph-scraper");
jest.mock("@actions/core");

describe("getMetadata", () => {
  test("tv show", async () => {
    ogs.mockResolvedValueOnce({ result: pen15 });
    expect(
      await getMetadata({
        url: "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",

        date: "2022-01-01",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "date": "2022-01-26",
        "description": "PEN15 is middle school as it really happened. Maya Erskine and Anna Konkle star in this adult comedy, playing versions of themselves as thirteen-year-old outcasts in the year 2000, surrounded by actual thirteen-year-olds, where the best day of your life can turn into your worst with the stroke of a gel pen.",
        "image": "bookmark-pen15.jpg",
        "site": "Hulu",
        "title": "PEN15",
        "type": "tv_show",
        "url": "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
      }
    `);
  });
  test("recipe, with note", async () => {
    ogs.mockResolvedValueOnce({ result: soup });
    expect(
      await getMetadata({
        url: "https://cooking.nytimes.com/recipes/1022831-slow-cooker-cauliflower-potato-and-white-bean-soup",
        body: "Delicious!",
        date: "2022-01-01",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "date": "2022-01-26",
        "description": "This creamy vegetarian soup is built on humble winter staples, but the addition of sour cream and chives make it feel special (Crumble a few sour-cream-and-onion chips on top to take the theme all the way.) It takes just a few minutes to throw the ingredients into the slow cooker, and the rest of the recipe almost entirely hands-off, making it very doable on a weekday If you have one, use an immersion blender to purée it to a silky smooth consistency, but a potato masher works well for a textured, chunky soup",
        "image": "bookmark-slow-cooker-cauliflower-potato-and-white-bean-soup-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Slow-Cooker Cauliflower, Potato and White Bean Soup Recipe",
        "type": "article",
        "url": "https://cooking.nytimes.com/recipes/1022831-slow-cooker-cauliflower-potato-and-white-bean-soup",
      }
    `);
  });
  test("tv show, no image", async () => {
    ogs.mockResolvedValueOnce({
      result: {
        ...pen15,
        ogImage: undefined,
      },
    });
    expect(
      await getMetadata({
        url: "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
        date: "2022-01-01",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "date": "2022-01-26",
        "description": "PEN15 is middle school as it really happened. Maya Erskine and Anna Konkle star in this adult comedy, playing versions of themselves as thirteen-year-old outcasts in the year 2000, surrounded by actual thirteen-year-olds, where the best day of your life can turn into your worst with the stroke of a gel pen.",
        "image": "",
        "site": "Hulu",
        "title": "PEN15",
        "type": "tv_show",
        "url": "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
      }
    `);
  });
  test("tv show, no type", async () => {
    ogs.mockResolvedValueOnce({
      result: {
        ...pen15,
        ogType: undefined,
      },
    });
    expect(
      await getMetadata({
        url: "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
        date: "2022-01-01",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "date": "2022-01-26",
        "description": "PEN15 is middle school as it really happened. Maya Erskine and Anna Konkle star in this adult comedy, playing versions of themselves as thirteen-year-old outcasts in the year 2000, surrounded by actual thirteen-year-olds, where the best day of your life can turn into your worst with the stroke of a gel pen.",
        "image": "bookmark-pen15.jpg",
        "site": "Hulu",
        "title": "PEN15",
        "type": "",
        "url": "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
      }
    `);
  });
  test("tv show, no title, site, or description", async () => {
    ogs.mockResolvedValueOnce({
      result: {
        ...pen15,
        ogTitle: undefined,
        ogSiteName: undefined,
        ogDescription: undefined,
      },
    });
    expect(
      await getMetadata({
        url: "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
        date: "2022-01-01",
      })
    ).toMatchInlineSnapshot(`
      Object {
        "date": "2022-01-26",
        "description": "",
        "image": "",
        "site": "",
        "title": "",
        "type": "tv_show",
        "url": "https://www.hulu.com/series/pen15-8c87035d-2b10-4b10-a233-ca5b3597145d",
      }
    `);
  });
});
