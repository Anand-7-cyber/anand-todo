"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Load tasks from LocalStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Save tasks to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <Head>
        <title>Anand-To-Do-App</title> {/* Title set to Anand-To-Do-App */}
        <meta name="description" content="A simple and interactive To-Do List built with Next.js" />
        <meta name="keywords" content="To-Do List, Next.js, React, Task Manager" />
        <meta name="author" content="Anand" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        {/* Authentication Section */}
        <div className="absolute top-4 right-4">
          {isSignedIn ? <UserButton /> : <SignInButton />}
        </div>

        <h1 className="text-4xl font-bold mb-6">Anand-To-Do-App</h1>

        {isSignedIn ? (
          <>
            <p className="mb-4 text-lg">Welcome, {user?.fullName} 👋</p>

            {/* Task Input */}
            <div className="flex gap-2 mb-6 w-full max-w-md">
              <Input
                type="text"
                placeholder="Enter task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="p-2 text-white flex-1"
              />
              <Button onClick={addTask} className="bg-blue-500 text-white hover:bg-blue-700">
                Add
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-4 w-full max-w-md">
              {tasks.map((task, index) => (
                <Card key={index} className="bg-gray-800">
                  <CardContent className="flex justify-between items-center p-4">
                    <span>{task}</span>
                    <Button onClick={() => deleteTask(index)} variant="ghost" className="text-red-500">
                      ❌
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <p className="text-lg mt-4">Please <SignInButton /> to access your tasks.</p>
        )}
      </div>
    </>
  );
}
