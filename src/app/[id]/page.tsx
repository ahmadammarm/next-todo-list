"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DetailTodoProps {
    id: string;
    title: string;
    content: string;
}

export default function DetailTodoPage() {
    const [todo, setTodo] = useState<DetailTodoProps | null>(null);
    const { id } = useParams();
    const router = useRouter();

    const fetchTodo = async () => {
        if (!id) {
            console.error("ID is missing");
            return;
        }

        try {
            const response = await fetch(`/api/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const result = await response.json();
            setTodo(result);
            console.log("Fetched todo:", result);
        } catch (error) {
            console.error("Error fetching todo:", error);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!todo) {
            console.error("Todo is not loaded");
            return;
        }

        try {
            const response = await fetch(`/api/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: todo.title,
                    content: todo.content,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update: ${response.statusText}`);
            }

            const updated = await response.json();
            setTodo(updated);
            console.log("Updated todo:", updated);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className="px-4">
            <h1 className="text-2xl text-center mt-10">{todo?.title || "Loading..."}</h1>
            <p className="text-center mt-10">{todo?.content || "Loading..."}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={todo?.title || ""}
                        onChange={(e) =>
                            setTodo((prev) => prev && { ...prev, title: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                        id="content"
                        value={todo?.content || ""}
                        onChange={(e) =>
                            setTodo((prev) => prev && { ...prev, content: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    <Button type="submit" onClick={() => router.push('/')}>Save</Button>
                </div>
            </form>
        </div>
    );
}
