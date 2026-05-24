import "./config/database.js";
const { Property } = await import("./models/Property.js");
try {
  const props = await Property.findAll({ limit: 1 });
  console.log("OK", props.length);
} catch (err) {
  console.error("ERROR NAME:", err.name);
  console.error("ERROR MESSAGE:", err.message);
  if (err.parent) { console.error("ERR PARENT:", err.parent.message); }
  if (err.original) { console.error("ERR ORIGINAL:", err.original.message); }
  process.exit(1);
}
