"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["ExternalPostTableDataSource"]["type"]>>([]);

  function listTodos() {
    client.models.ExternalPostTableDataSource.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    //追加。デフォルト値を0に指定。
    const todoDivision = window.prompt("内容を入力してください。") || "0";
  
    //const todolabel = window.prompt("ラベルを入力してください。");
    //const todovalue = window.prompt("値を入力してください。");
    client.models.ExternalPostTableDataSource.create({
      //content: window.prompt("入力してください。"),
      Division: todoDivision,
      //label: todolabel,
      //value: todovalue,
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((ExternalPostTableDataSource) => (

          //<li key={todo.id}>{todo.content}</li>
          <li key={ExternalPostTableDataSource.Division}>{ExternalPostTableDataSource.DivisionName}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
