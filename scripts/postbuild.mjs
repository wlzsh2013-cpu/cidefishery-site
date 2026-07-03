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
  // Fix all root-relative paths in src/href attributes
  content = content.replace(/src="\/([^"]+)"/g, (match, path) => {
    if (path.startsWith("cidefishery-site")) return match;
    return `src="${basePath}/${path}"`;
  });
  content = content.replace(/href="\/([^"]+)"/g, (match, path) => {
    if (path.startsWith("cidefishery-site") || path.startsWith("http") || path.startsWith("#")) return match;
    return `href="${basePath}/${path}"`;
  });
  writeFileSync(file, content);
}

console.log("Fixed " + htmlFiles.length + " files");