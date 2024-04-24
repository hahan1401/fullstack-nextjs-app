import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {

  const allUsers = await prisma?.uers.findMany();

  return Response.json({ responseData: allUsers });
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  
  return Response.json({ responseData: 1 });
}
