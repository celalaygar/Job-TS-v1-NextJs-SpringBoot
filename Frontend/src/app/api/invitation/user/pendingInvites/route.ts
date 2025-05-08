import { getServerSession } from "next-auth";
import axios from "axios";
import {  NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";



const BASE_URL = process.env.BASE_URL || "";
const INVITATION_URL = process.env.INVITATION_URL || "";
const URL = `${BASE_URL}${INVITATION_URL}`;


// 📌 Belirli bir kullanıcının davetlerini getir
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "You are not logged in" },
                { status: 401 }
            );
        }
        const res = await axios.get(`${URL}/user/pendingInvites`, {
            headers: {
                Authorization: `${session.accessToken}`,
            },
        });
        return NextResponse.json(res.data);
    } catch (error) {
        console.error("Error fetching invitations user:", error);
        return NextResponse.json(
            { message: "Failed to fetch invitations user" },
            { status: (axios.isAxiosError(error) && error.response?.status) || 500 }
        );
    }
}
