import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";


const BASE_URLL = process.env.BASE_URL || "";
const TASK_PROJECT_URL = process.env.TASK_PROJECT_URL || "";
const URL = `${BASE_URLL}${TASK_PROJECT_URL}`;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const pId = (await params).projectId;

    //get a task by id
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
    return NextResponse.json(
      { error: "Failed to fetch projects " + error },
      { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
    );
  }
  finally {
    console.log("GET request to /jobs/tasks/{taskId} has been made.");
  }
}