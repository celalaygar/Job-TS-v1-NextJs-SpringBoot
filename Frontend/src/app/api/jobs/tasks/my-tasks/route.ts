import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const BASE_URLL = process.env.BASE_URL || "";
const TASK_URL = process.env.TASK_URL || "";
const URL = `${BASE_URLL}${TASK_URL}`;



export async function POST(req: NextRequest) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const res = await axios.post(URL + "/my-tasks", body, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching project users:", error);
    return NextResponse.json(
      { message: "Failed to fetch project users + " },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}