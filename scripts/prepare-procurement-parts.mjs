import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = resolve("data/procurement.json");
const destination = resolve("data");
const chunkSize = 16_000;

await mkdir(destination, { recursive: true });
const parsed = JSON.parse(await readFile(source, "utf8"));
for (const opportunity of parsed.opportunities?.rows || []) delete opportunity.contactEmail;
const serialized = `${JSON.stringify(parsed)}\n`;
const existing = await readdir(destination);
await Promise.all(existing.filter((name) => /^procurement-\d{3}\.part$/.test(name)).map((name) => rm(resolve(destination, name))));

const parts = [];
for (let start = 0, index = 0; start < serialized.length; index += 1) {
  let end = Math.min(serialized.length, start + chunkSize);
  const lastCodeUnit = serialized.charCodeAt(end - 1);
  if (lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff) end -= 1;
  const filename = `procurement-${String(index).padStart(3, "0")}.part`;
  await writeFile(resolve(destination, filename), serialized.slice(start, end), "utf8");
  parts.push(filename);
  start = end;
}

await writeFile(resolve(destination, "manifest.json"), `${JSON.stringify({ version: 1, parts, bytes: Buffer.byteLength(serialized) }, null, 2)}\n`);
console.log(`Prepared ${parts.length} browser data parts (${Buffer.byteLength(serialized).toLocaleString()} bytes).`);
