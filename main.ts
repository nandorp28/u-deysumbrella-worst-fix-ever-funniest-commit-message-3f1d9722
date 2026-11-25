// Worst Fix Ever: Funniest Commit Message
// Writes one commit message (<=100 chars) to /output/entry.txt.
// Gate: UTF-8 text, 1-100 chars, not only whitespace, single line.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "fix: dedupe the user table by deleting the originals and keeping the copies";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 100) {
  throw new Error(`entry must be 1-100 chars, got ${chars.length}`);
}
if (LINE !== LINE.trim() || /\s/.test(LINE) && LINE.includes("\n")) {
  throw new Error("entry must be a single trimmed line");
}
if (/\r|\n/.test(LINE) || LINE.trim() === "") {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
console.log(`Wrote ${chars.length} characters, 1 line`);
