import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";


const BASE_URLL = process.env.BASE_URL || "";
const PROJECT_URL = process.env.PROJECT_URL || "";
const URL = `${BASE_URLL}${PROJECT_URL}`;

export async function GET(req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const pId = await (await params).projectId;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    const res = await axios.get(URL + "/" + pId, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Failed to fetch project " },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}