export default function exit(req, res) {
  res.clearPreviewData();
  res.redirect("/");
}
