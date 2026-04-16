import { NextResponse } from "next/server";
import { rejectCrossSiteRequest } from "@/lib/security";
import { API_NO_STORE_HEADERS, jsonNoStore } from "@/lib/api";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return jsonNoStore(
      { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET." },
      500,
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get("file");

    if (!(file instanceof File)) {
      return jsonNoStore({ error: "No upload file received." }, 400);
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return jsonNoStore({ error: "File is too large. Maximum allowed size is 12 MB." }, 413);
    }

    const outbound = new FormData();
    outbound.append("file", file);
    outbound.append("upload_preset", uploadPreset);
    outbound.append("folder", "mysarah/solar-application");

    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: outbound,
    });

    const data = (await cloudinaryResponse.json().catch(() => null)) as
      | { secure_url?: string; public_id?: string; original_filename?: string; error?: { message?: string } }
      | null;

    if (!cloudinaryResponse.ok) {
      return jsonNoStore(
        { error: data?.error?.message || "Cloudinary rejected the upload request." },
        502,
      );
    }

    if (!data?.secure_url || !data.public_id) {
      return jsonNoStore({ error: "Cloudinary response was missing file details." }, 502);
    }

    return NextResponse.json({
      ok: true,
      url: data.secure_url,
      publicId: data.public_id,
      fileName: data.original_filename || file.name,
    }, {
      headers: API_NO_STORE_HEADERS,
    });
  } catch (error) {
    console.error("[api/uploads/cloudinary] upload failed", error);
    return jsonNoStore({ error: "Upload service failed. Please try again." }, 500);
  }
}
