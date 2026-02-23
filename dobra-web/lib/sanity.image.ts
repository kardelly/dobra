import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./sanity";

const builder = createImageUrlBuilder(client);

export function urlFor(
  source: { _type: string; asset?: { _ref: string } } | null | undefined
) {
  if (!source) return builder;
  return builder.image(source);
}
