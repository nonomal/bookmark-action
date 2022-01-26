import { exportVariable } from "@actions/core";
import ogs from "open-graph-scraper";
import { setImage } from "./set-image";

export async function getMetadata({
  url,
  notes,
}: {
  url: string;
  notes?: string;
}) {
  const { result } = (await ogs({ url })) as { result: OpenGraphObject };
  const date = new Date().toISOString().slice(0, 10);
  exportVariable("BookmarkTitle", result.ogTitle);
  const image = setImage(result);
  return {
    title: result.ogTitle || "",
    site: result.ogSiteName || "",
    date,
    description: result.ogDescription || "",
    url: result.ogUrl,
    image: image || "",
    type: result.ogType || "",
    ...(notes && { notes }),
  };
}

export type OpenGraphObject = {
  ogTitle: string;
  ogSiteName: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  success: boolean;
};
