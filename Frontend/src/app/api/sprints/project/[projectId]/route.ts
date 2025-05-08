import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



const BASE_URLL = process.env.BASE_URL || "";
const SPRINT_URL = process.env.SPRINT_URL || "";
const URL = `${BASE_URLL}${SPRINT_URL}`;


export async function GET(
  req: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const pId = (await params).projectId;
        const session = await getServerSession(authOptions);

        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const response = await axios.get(URL + "/" + pId + "/list", {
            headers: {
                Authorization: session.accessToken,
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch sprints " + error },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}