import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "dobra";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "dobra-studio",
  title: "Dobra CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
