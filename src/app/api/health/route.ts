import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";


export async function GET() {
await connectToDatabase();
return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}