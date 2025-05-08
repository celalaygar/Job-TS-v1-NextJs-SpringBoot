import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


const BASE_URL = process.env.BASE_URL || "";
const INVITATION_URL = process.env.INVITATION_URL || "";
const URL = `${BASE_URL}${INVITATION_URL}`;


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

        const body = await req.json(); // Gönderilen veriyi al
        const res = await axios.post(`${URL}/send`, body, {
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

