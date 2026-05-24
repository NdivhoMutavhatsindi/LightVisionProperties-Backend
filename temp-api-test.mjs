import fetch from "node-fetch";
const urls = [
  "http://localhost:5000/api/properties",
  "http://localhost:5000/api/agents",
  "http://localhost:5000/api/careers",
];
for (const url of urls) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(JSON.stringify({ url, status: res.status, body: text }, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ url, error: err.message }, null, 2));
  }
}
