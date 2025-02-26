import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(req: Request ,{ params }: { params: { id: string }}) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Public ID is required" });
    }

     const result = await cloudinary.uploader.destroy(id);

    return NextResponse.json({ message: "Image deleted successfully", result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image", details: error });
  }
}