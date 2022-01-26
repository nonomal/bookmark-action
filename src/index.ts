import { getInput, setFailed } from "@actions/core";
import * as github from "@actions/github";
import { saveBookmarks } from "./save-bookmarks";
import { addBookmark, Bookmark } from "./add-bookmark";
import { getMetadata } from "./get-metadata";

export async function action() {
  try {
    const { url, notes } = github.context.payload;
    if (!url) {
      setFailed(`The url "${url}" is not valid`);
      return;
    }
    const fileName = getInput("fileName");
    const page = (await getMetadata({ url, notes })) as Bookmark;
    const bookmarks = await addBookmark(fileName, page);
    if (!bookmarks) {
      setFailed(`Unable to add bookmark`);
      return;
    }
    await saveBookmarks({ fileName, bookmarks });
  } catch (error) {
    setFailed(error.message);
  }
}

export default action();
