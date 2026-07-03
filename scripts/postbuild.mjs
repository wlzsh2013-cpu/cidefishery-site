import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { readFileSync, writeFileSync } from "fs";

function walkDir(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full));
    } else if (extname(entry) === ".html") {
      results.push(full);
    }
  }
  return results;
}

const distDir = "dist";
const basePath = "/cidefishery-site";

const htmlFiles = walkDir(distDir);

for (const file of htmlFiles) {
  let content = readFileSync(file, "utf-8");
  content = content.replace(/(src|href|content|srcset)="\/((?!cidefishery-site|http)[^"]*)"/g, (match, attr, path) => {
    return `${attr}="${basePath}/${path}"`;
  });
  writeFileSync(file, content);
}

console.log("Fixed " + htmlFiles.length + " files");