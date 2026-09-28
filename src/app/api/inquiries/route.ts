import { NextResponse } from "next/server";
import { submitProjectInquiry } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required" },
        { status: 400 }
      );
    }

    const result = await submitProjectInquiry(body);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message },
      { status: 500 }
    );
  }
}
