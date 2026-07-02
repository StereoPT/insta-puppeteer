import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type ImageRouteParams = {
  params: Promise<{ filename: string }>;
};

export const GET = async (_request: Request, { params }: ImageRouteParams) => {
  const { filename } = await params;

  if (path.basename(filename) !== filename) {
    return new NextResponse(null, { status: 400 });
  }

  const imagesDir = process.env.IMAGES_DIR;
  if (!imagesDir) throw new Error("IMAGES_DIR env var is required");

  try {
    const file = await readFile(path.join(imagesDir, filename));
    return new NextResponse(file, {
      headers: { "Content-Type": "image/png" },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
};
