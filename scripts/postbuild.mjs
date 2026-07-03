// Post-build: fix public asset paths for GitHub Pages base path
import { readFileSync, writeFileSync } from "fs";
import { globSync } from "fs";

// Simple glob (Node 22+)
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

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
  // Fix src attributes for public/ assets
  content = content.replace(/src="\/(images|icons|fonts)\//g, `src="${basePath}/$1/`);
  content = content.replace(/srcset="\/(images|icons)\//g, `srcset="${basePath}/$1/`);
  // Fix favicon and other link hrefs for public assets
  content = content.replace(/href="\/(images|icons|fonts)\//g, `href="${basePath}/$1/`);
  writeFileSync(file, content);
  console.log("Fixed:", file);
}

console.log("Post-build complete:", htmlFiles.length, "files");