"use client"

import React, { useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";


interface TodoProps {
    title: string;
    content: string;
}

const InputForm: React.FC = () => {

    const [todos, setTodos] = useState<TodoProps[]>([])
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })

    const formSchema = z.object({
        title: z.string().min(2).max(50),
        content: z.string().min(2).max(100)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    const fetchTodo = async () => {
        try {
            const response = await fetch("/api/");
            const result = await response.json();
            setTodos(result);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
        });
        fetchTodo();
        setFormData({
            title: "",
            content: ""
        })
    }

    useEffect(() => {
        fetchTodo();
    }, [])

    return (
        <div className="flex items-center justify-center px-4 py-6">
            <div>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Title" {...field}
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Content" {...field}
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="border p-2 rounded text-black"
                                            required
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tuliskan to do list yang ingin kamu kerjakan
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default InputForm
