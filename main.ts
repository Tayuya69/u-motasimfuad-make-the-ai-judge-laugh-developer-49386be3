import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "It worked on my machine, so we deployed my machine instead. It starts Monday.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (77 characters, one line, no trailing newline).
{
  const { readFileSync } = await import("node:fs");
  const ENTRY =
    "It worked on my machine, so we deployed my machine instead. It starts Monday.";
  const actual = readFileSync("/output/entry.txt", "utf8");
  if (actual !== ENTRY) {
    throw new Error(
      `entry mismatch: expected ${ENTRY.length} chars, got ${actual.length} chars`,
    );
  }
  if (actual.length !== 77) throw new Error(`entry length ${actual.length}, expected 77`);
  if (actual.includes("\n")) throw new Error("entry must be a single line");
  if (actual.trim() !== actual) throw new Error("entry must not have surrounding whitespace");
  console.log("verification passed: entry.txt is exactly the 77-character entry line");
}
