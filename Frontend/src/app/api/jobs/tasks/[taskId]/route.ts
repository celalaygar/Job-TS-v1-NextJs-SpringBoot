import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";



const BASE_URLL = process.env.BASE_URL || "";
const TASK_URL = process.env.TASK_URL || "";
const URL = `${BASE_URLL}${TASK_URL}`;


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    //get a task by id
    const tId =  (await params).taskId;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }
    const res = await axios.get(URL + "/" + tId, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
  finally {
    console.log("GET request to /jobs/tasks/{taskId} has been made.");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }
  // req.body'yi manuel parse et
  const body = await req.json();
  const { taskId } = await params;
  try {
    const res = await axios.put(URL + "/" + taskId, body, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ ...res.data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 401 }
    );
  }
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 401 }
      );
    }

    // req.body'yi manuel parse et
    const body = await req.json();
    const { taskId } = await params;

    const res = await axios.patch(URL + "/" + taskId, body, {
      headers: {
        Authorization: `${session.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json({ ...res.data });
  } catch (error) {
    console.error("Error sending invitation:", error);
    return NextResponse.json(
      { message: "Failed to send invitation" },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
}
