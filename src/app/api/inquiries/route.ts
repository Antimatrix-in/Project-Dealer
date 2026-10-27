import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
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

    // Persist to local store for admin dashboard
    const saved = await saveInquiry(body);
    await submitProjectInquiry(body);

    return NextResponse.json(
      {
        success: true,
        message: "Consultation inquiry received! Our academic coordinator will contact you on WhatsApp / Phone within 2 hours.",
        data: saved
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message },
      { status: 500 }
    );
  }
}
