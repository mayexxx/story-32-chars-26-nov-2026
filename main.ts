import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
if (!scriptPath) throw new Error("Unable to locate the script");

const line = "TellMyWiFiLoveHer";
const characterCount = Array.from(line).length;
if (characterCount < 1 || characterCount > 32 || /[\r\n]/.test(line)) {
  throw new Error("Entry must be a single line of 1 to 32 characters");
}
const expected = `${line}\n`;
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", expected, "utf8");
if (!readFileSync("/output/entry.txt").equals(Buffer.from(expected, "utf8"))) {
  throw new Error("Written output does not match the expected bytes");
}
