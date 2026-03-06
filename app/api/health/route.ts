import { NextResponse } from "next/server";

// This tells Next.js to generate this route as a static JSON file during build
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    { 
      status: "ok", 
      // Note: This timestamp will be the time you BUILT the project,
      // not the time the user visits the page.
      timestamp: new Date().toISOString() 
    },
    { status: 200 }
  );
}
