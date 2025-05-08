import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import axios from "axios";

const BASE_URL = process.env.BASE_URL

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const response = await axios.get(`${BASE_URL}enums/${type}`, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch enums " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}
