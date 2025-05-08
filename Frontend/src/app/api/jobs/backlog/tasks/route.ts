import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";



const BASE_URL = process.env.BASE_URL || "";
const BACKLOG_URL = process.env.BACKLOG_URL || "";
const URL = `${BASE_URL}${BACKLOG_URL}`;

// 📌 Kullanıcıyı projeye davet et
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
    const res = await axios.post(URL + "/tasks",  body, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error sending invitation:", error);
    return NextResponse.json(
      { message: "Failed to send invitation" },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}
