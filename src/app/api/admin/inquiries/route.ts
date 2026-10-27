import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getAllInquiries, updateInquiryStatus } from "@/lib/inquiries";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const inquiries = await getAllInquiries();
  const total = inquiries.length;
  const pending = inquiries.filter((i) => i.status === "Pending").length;
  const inProgress = inquiries.filter((i) => i.status === "In Progress").length;
  const completed = inquiries.filter((i) => i.status === "Completed").length;

  return NextResponse.json(
    {
      success: true,
      inquiries,
      stats: {
        total,
        pending,
        inProgress,
        completed
      }
    },
    { status: 200 }
  );
}

export async function PATCH(request: Request) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !["Pending", "In Progress", "Completed"].includes(status)) {
      return NextResponse.json(
        { error: "Valid Inquiry ID and status ('Pending' | 'In Progress' | 'Completed') are required." },
        { status: 400 }
      );
    }

    await updateInquiryStatus(id, status);
    return NextResponse.json(
      { success: true, message: `Status updated to ${status}`, inquiry: { id, status } },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to update inquiry status", details: err?.message },
      { status: 500 }
    );
  }
}
