"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TodoProps {
    title: string;
    content: string;
}

const TodoItemList = () => {

    const [todos, setTodos] = useState<TodoProps[]>([]);

    const fetchTodos = async () => {
        try {
            const response = await fetch("/api/");
            const result = await response.json();
            setTodos(result);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-5'>
            {todos.map((todo, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-center mt-10">
                            {todo.title}
                        </CardTitle>
                        <CardContent>
                            <p className="text-center mt-10">
                                {todo.content}
                            </p>
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export default TodoItemList
