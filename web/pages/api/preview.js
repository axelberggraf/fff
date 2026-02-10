export default async function preview(req, res) {
  // Enable Preview Mode
  res.setPreviewData({});

  // Get the pathname from header or query
  const pathname =
    req.headers["sanity-preview-pathname"] || req.query.slug || "/";

  // Redirect to the path
  res.redirect(pathname);
}
