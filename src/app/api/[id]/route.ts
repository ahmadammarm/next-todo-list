import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get single todo item
export async function GET(
    { params }: { params: {id: string} }
) {
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json(todo)
    } catch(error) {
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

    } catch(error) {
        return NextResponse.json({ error: 'Errors' }, { status: 500 })
    }
}