"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export default function ExpenseForm({ expense }) {
  const router = useRouter();
  const isEditing = Boolean(expense);

  const [title, setTitle] = useState(expense?.title ?? "");//expense?.title ?? "" reads like this: if there's an expense, use its title. Otherwise, start empty.
  const [amount, setAmount] = useState(expense?.amount ?? "");
  const [category, setCategory] = useState(expense?.category ?? CATEGORIES[0]);
  const [date, setDate] = useState(expense?.date ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const url = isEditing ? `/api/expenses/${expense.id}` : "/api/expenses";
    //The prop decides the mode. Got an expense? We're editing. No expense? We're adding.
    //expense?.title ?? "" reads like this: if there's an expense, use its title. Otherwise, start empty.

    const response = await fetch(url, {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount: Number(amount), category, date }),
    });

    if (!response.ok) {
      //is true for any success code. If it's not okay, we show the server's message and stay put.
      const data = await response.json();
      setError(data.error);
      return;
    }

    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Groceries"
        />
      </label>

      <label>
        Amount ($)
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="25.00"
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="button">
          {isEditing ? "Save changes" : "Add expense"}
        </button>
        <Link href="/">Cancel</Link>
      </div>
    </form>
  );
}
//This is INSTACLONE'S comment box but x4
