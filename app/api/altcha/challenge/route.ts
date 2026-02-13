import { NextResponse } from "next/server";
import { createAltchaChallenge } from "@/lib/altcha";

export async function GET() {
  try {
    return NextResponse.json(createAltchaChallenge());
  } catch {
    return NextResponse.json({ error: "Unable to initialize captcha" }, { status: 500 });
  }
}
