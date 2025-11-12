import fs from "fs";
import path from "path";

// Folder containing JSON files (+ current directory)
const jsonFolder = "./src/lib/data/json";
const outputFolder = "./src/lib/data"; 

// Read all JSON files in the folder
const files = fs.readdirSync(jsonFolder).filter(f => f.endsWith(".json"));

files.forEach(file => {
  const filePath = path.join(jsonFolder, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Transform rows into structured objects
  const crypticClues = data.rows.map(([clue, answer, definition]) => {
    const match = clue.match(/\((\d+)\)/);
    const length = match ? match[1] : "";

    return {
      clue,
      answer,
      length,
      difficulty: "medium", // default
      type: "Definition + Wordplay",
      hints: {
        definition,
        indicator: "unknown",
        fodder: "unknown"
      },
      explanation: {
        definition,
        wordplay: "Not provided (from dataset export)",
        breakdown: "Cryptic clue from exported JSON",
        tip: "Identify the definition first — usually at start or end of the clue."
      }
    };
  });

  // Create JS file in the same level as JSON folder
  const jsFileName = path.basename(file, ".json") + ".js";
  const outputPath = path.join(outputFolder, jsFileName);

  fs.writeFileSync(
    outputPath,
    "export const crypticClues = " + JSON.stringify(crypticClues, null, 2) + ";"
  );

  console.log(`Success: ${jsFileName} generated with ${crypticClues.length} entries`);
});
