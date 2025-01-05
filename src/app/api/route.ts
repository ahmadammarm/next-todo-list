import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// Get Todos
export async function GET() {
    try {
        const todos = await prisma.todo.findMany()
        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json({ error: "error" }, { status: 500 })
    }
}



// Create a Todo
export async function POST(
    request: NextRequest
) {
    try {
        const body = await request.json()
        const todo = await prisma.todo.create({
            data: {
                title: body.title,
                content: body.content
            }
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json({ error: 'errors' }, { status: 200 })
    }
}