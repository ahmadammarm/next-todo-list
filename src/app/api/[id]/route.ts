import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// Get single todo item
export async function GET(
    { params }: { params: { id: string } }
) {
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json({ error: "Errors" }, { status: 500 })
    }
}


// Edit single todo item
export async function UPDATE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await request.json()
        const todo = await prisma.todo.update({
            where: {
                id: parseInt(params.id)
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return NextResponse.json({ todo, message: "edit todo success" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Errors" }, { status: 500 })
    }
}


// Delete Single Todo Item
export async function DELETE(
    { params }: { params: { id: string } }
) {
    try {
        await prisma.todo.delete({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json({ message: 'Todo deleted' })

    } catch (error) {
        return NextResponse.json({ error: 'Errors' }, { status: 500 })
    }
}