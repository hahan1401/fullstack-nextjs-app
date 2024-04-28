import { ERRORS } from "@/constants/errors";
import { generateResponseData } from "@/helper/responseData";
import prisma from "@/lib/db";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allUsers = await prisma?.users.findMany();

  return Response.json(generateResponseData.success(allUsers));
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const userExist = await prisma.users.findFirst({
    where: {
      name: body.name,
    },
  });
  if (userExist) {
    return Response.json(generateResponseData.error(ERRORS.userExisted));
  }
  await prisma.users.create({ data: body });
  const newAdded = (await prisma.users.findMany()).at(-1);

  return Response.json(generateResponseData.success(newAdded));
};

export const PUT = async (req: NextRequest) => {
  const {id, ...body}: User = await req.json();
  await prisma.users.update({
    data: body,
    where: {
      id: id,
    },
  });
  return NextResponse.json(
    await prisma.users.findFirst({
      where: {
        id: id,
      },
    })
  );
};
