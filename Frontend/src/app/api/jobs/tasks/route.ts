import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import axios from "axios";


const BASE_URLL = process.env.BASE_URL || "";
const TASK_URL = process.env.TASK_URL || "";
const URL = `${BASE_URLL}${TASK_URL}`;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const response = await axios.post(URL, body, {
      headers: {
        Authorization: session.accessToken,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("Failed to create task", error);
    return NextResponse.json(
      { error: "Failed to create task " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}
