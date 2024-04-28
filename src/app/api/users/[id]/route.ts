import { ERRORS } from "@/constants/errors";
import { generateResponseData } from "@/helper/responseData";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: params.id,
      },
    });
    if (user) {
      return NextResponse.json(generateResponseData.success(user));
    }
    return NextResponse.json(generateResponseData.error(ERRORS.userNotfound));
  } catch (err) {
    throw err;
  }
};

export const DELETE = async (
  _: any,
  { params }: { params: { id: string } }
) => {
  try {
    const userExist = await prisma.users.findFirst({
      where: {
        id: params.id,
      },
    });
    if (userExist) {
      await prisma.users.delete({
        where: {
          id: params.id,
        },
      });
      return NextResponse.json(generateResponseData.success(true));
    }
    return NextResponse.json(generateResponseData.error(ERRORS.userNotfound));
  } catch (err) {
    throw err;
  }
};
