import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "w78wyvil",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-02-05",
});
export const previewClient = createClient({
  projectId: "w78wyvil",
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-02-05",
  perspective: "previewDrafts", // This fetches draft content
  token: process.env.SANITY_API_READ_TOKEN, // Read token for draft access
});
