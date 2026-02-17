/**
 * Image optimization script for MKN Technisch website
 * Uses Sharp to resize, convert to WebP, generate thumbnails, and blur placeholders
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, mkdir, copyFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const SOURCE_DIR = "mkn gorseller";
const VIDEO_DIR = "mkn gorseller/videolar";
const OUTPUT_BASE = "public/images/projects";
const VIDEO_OUTPUT = "public/videos";
const DATA_OUTPUT = "src/lib/project-data.ts";

const FULL_WIDTH = 1920;
const THUMB_WIDTH = 400;
const FULL_QUALITY = 82;
const THUMB_QUALITY = 72;

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

function groupFiles(files) {
  const project1 = []; // 12:00 AM group
  const project2 = []; // 12:26 AM group
  const generic = []; // No timestamp pattern

  for (const file of files) {
    if (!file.toLowerCase().endsWith(".jpeg") && !file.toLowerCase().endsWith(".jpg")) continue;
    if (file === "videolar") continue;

    if (file.includes("12.00.") || file.includes("12.01.")) {
      project1.push(file);
    } else if (file.includes("12.26.") || file.includes("12.27.") || file.includes("12.20.") || file.includes("12.21.")) {
      project2.push(file);
    } else {
      generic.push(file);
    }
  }

  return { project1, project2, generic };
}

function groupVideos(files) {
  const project1 = [];
  const project2 = [];

  for (const file of files) {
    if (!file.toLowerCase().endsWith(".mp4")) continue;

    if (file.includes("12.00.") || file.includes("12.01.")) {
      project1.push(file);
    } else {
      project2.push(file);
    }
  }

  return { project1, project2 };
}

async function processImage(inputPath, outputDir, index) {
  const fullDir = path.join(outputDir, "full");
  const thumbDir = path.join(outputDir, "thumb");
  await ensureDir(fullDir);
  await ensureDir(thumbDir);

  const filename = `img-${String(index).padStart(3, "0")}.webp`;
  const fullPath = path.join(fullDir, filename);
  const thumbPath = path.join(thumbDir, filename);

  try {
    // Full size
    await sharp(inputPath)
      .resize(FULL_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: FULL_QUALITY })
      .toFile(fullPath);

    // Thumbnail
    await sharp(inputPath)
      .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbPath);

    // Blur placeholder (tiny 10px base64)
    const blurBuffer = await sharp(inputPath)
      .resize(10, null)
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    // Get dimensions
    const metadata = await sharp(fullPath).metadata();

    return {
      filename,
      full: fullPath.replace(/\\/g, "/").replace("public/", "/"),
      thumb: thumbPath.replace(/\\/g, "/").replace("public/", "/"),
      blurDataURL,
      width: metadata.width,
      height: metadata.height,
    };
  } catch (err) {
    console.error(`  Error processing ${inputPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("🔨 MKN Technisch — Image Optimization Pipeline\n");

  // Read source files
  const allFiles = await readdir(SOURCE_DIR);
  const { project1, project2, generic } = groupFiles(allFiles);

  console.log(`📸 Images found:`);
  console.log(`   Project 1 (12:00 AM): ${project1.length} images`);
  console.log(`   Project 2 (12:26 AM): ${project2.length} images`);
  console.log(`   Generic: ${generic.length} images`);

  // Read videos
  let videoFiles = [];
  try {
    videoFiles = await readdir(VIDEO_DIR);
  } catch (e) {}
  const videoGroups = groupVideos(videoFiles);
  console.log(`🎬 Videos found:`);
  console.log(`   Project 1: ${videoGroups.project1.length} videos`);
  console.log(`   Project 2: ${videoGroups.project2.length} videos`);
  console.log("");

  const projectData = {
    project1: { images: [], videos: [] },
    project2: { images: [], videos: [] },
  };

  // Process Project 1 images
  console.log("⚙️  Processing Project 1 images...");
  const p1OutputDir = path.join(OUTPUT_BASE, "project-1");
  // Add generic images to project 1 (distribute: first half to p1, second half to p2)
  const halfGeneric = Math.ceil(generic.length / 2);
  const p1Files = [...project1, ...generic.slice(0, halfGeneric)];
  const p2GenericFiles = generic.slice(halfGeneric);

  for (let i = 0; i < p1Files.length; i++) {
    const filePath = path.join(SOURCE_DIR, p1Files[i]);
    const result = await processImage(filePath, p1OutputDir, i + 1);
    if (result) {
      projectData.project1.images.push(result);
      process.stdout.write(`\r   ${i + 1}/${p1Files.length}`);
    }
  }
  console.log(` ✅`);

  // Process Project 2 images
  console.log("⚙️  Processing Project 2 images...");
  const p2OutputDir = path.join(OUTPUT_BASE, "project-2");
  const p2Files = [...project2, ...p2GenericFiles];

  for (let i = 0; i < p2Files.length; i++) {
    const filePath = path.join(SOURCE_DIR, p2Files[i]);
    const result = await processImage(filePath, p2OutputDir, i + 1);
    if (result) {
      projectData.project2.images.push(result);
      process.stdout.write(`\r   ${i + 1}/${p2Files.length}`);
    }
  }
  console.log(` ✅`);

  // Copy videos
  console.log("⚙️  Copying Project 1 videos...");
  const v1Dir = path.join(VIDEO_OUTPUT, "project-1");
  await ensureDir(v1Dir);
  for (let i = 0; i < videoGroups.project1.length; i++) {
    const src = path.join(VIDEO_DIR, videoGroups.project1[i]);
    const filename = `video-${String(i + 1).padStart(2, "0")}.mp4`;
    const dest = path.join(v1Dir, filename);
    await copyFile(src, dest);
    projectData.project1.videos.push({
      filename,
      src: `/${v1Dir.replace(/\\/g, "/")}/${filename}`.replace("/public/", "/"),
    });
  }
  console.log(`   ${videoGroups.project1.length} videos copied ✅`);

  console.log("⚙️  Copying Project 2 videos...");
  const v2Dir = path.join(VIDEO_OUTPUT, "project-2");
  await ensureDir(v2Dir);
  for (let i = 0; i < videoGroups.project2.length; i++) {
    const src = path.join(VIDEO_DIR, videoGroups.project2[i]);
    const filename = `video-${String(i + 1).padStart(2, "0")}.mp4`;
    const dest = path.join(v2Dir, filename);
    await copyFile(src, dest);
    projectData.project2.videos.push({
      filename,
      src: `/${v2Dir.replace(/\\/g, "/")}/${filename}`.replace("/public/", "/"),
    });
  }
  console.log(`   ${videoGroups.project2.length} videos copied ✅`);

  // Generate TypeScript data file
  console.log("\n📝 Generating project data file...");

  const tsContent = `// Auto-generated by scripts/optimize-images.mjs
// Do not edit manually

export interface ProjectImage {
  filename: string;
  full: string;
  thumb: string;
  blurDataURL: string;
  width: number;
  height: number;
}

export interface ProjectVideo {
  filename: string;
  src: string;
}

export interface Project {
  id: string;
  images: ProjectImage[];
  videos: ProjectVideo[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    images: ${JSON.stringify(projectData.project1.images, null, 6).replace(/\n/g, "\n    ")},
    videos: ${JSON.stringify(projectData.project1.videos, null, 6).replace(/\n/g, "\n    ")},
  },
  {
    id: "project-2",
    images: ${JSON.stringify(projectData.project2.images, null, 6).replace(/\n/g, "\n    ")},
    videos: ${JSON.stringify(projectData.project2.videos, null, 6).replace(/\n/g, "\n    ")},
  },
];

export const allImages: ProjectImage[] = projects.flatMap((p) => p.images);
export const allVideos: ProjectVideo[] = projects.flatMap((p) => p.videos);

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
`;

  await ensureDir("src/lib");
  await writeFile(DATA_OUTPUT, tsContent, "utf-8");

  console.log(`\n🎉 Done!`);
  console.log(`   Total images processed: ${projectData.project1.images.length + projectData.project2.images.length}`);
  console.log(`   Total videos copied: ${projectData.project1.videos.length + projectData.project2.videos.length}`);
  console.log(`   Data file: ${DATA_OUTPUT}`);
}

main().catch(console.error);
