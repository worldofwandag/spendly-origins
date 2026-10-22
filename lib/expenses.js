import "server-only";
//makes this file as server code. if we import it into client component, nextjs stops us with clear error

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const expensesFile = path.join(process.cwd(), "data", "expenses.json"); //process.cwd() means the project root so this path works on any computer
const budgetsFile = path.join(process.cwd(), "data", "budgets.json")

export async function getExpenses() {
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // TEMP: fake slow data
  const text = await readFile(expensesFile, "utf8"); //reads the file as text
  const expenses = JSON.parse(text) //JSON.parse turns that text into a JavaScript array
  // Newest first, so the latest spending is always at the top
  return expenses.sort((a, b) => b.date.localeCompare(a.date)); 
}
//getExpenses() reads the file as text, and JSON.parse turns that text into a JavaScript array

export async function saveExpenses(expenses) {
  await writeFile(expensesFile, JSON.stringify(expenses, null, 2)); // JSON.stringify turns the array back into text. The null, 2 adds line breaks, so the file stays readable in VS Code.
}
//saveExpenses() does the reverse.

export async function createExpense({ title, amount, category, date }) {
  const expenses = await getExpenses() //getExpenses fn turned into variable so you can spread operator it later and add the new expense to it
  const expense = { id: crypto.randomUUID(), title: title.trim(), amount, category, date}; //crypto.randomUUID() gives every expense its own unique id. only copies 4 expected fields. others get ignored
  await saveExpenses([...expenses, expense]);
  return expense
}
//this function gets the list and adds a new one, then saves the list.

export async function deleteExpense(id) {
  const expenses = await getExpenses(); //getExpenses fn turned into variable so you can .filter it
  const remaining = expenses.filter((expense) => expense.id !== id);
  if (remaining.length === expenses.length) return false;
  await saveExpenses(remaining);
  return true;
}
//Keep every expense except the one with this id. If the list didn't get shorter, that id didn't exist, so we return false.

export async function getExpense(id) {
  const expenses = await getExpenses(); //getExpenses fn turned into variable so you can .find it
  return expenses.find((expense) => expense.id === id);
}
//this just gets one expense by its id

export async function updateExpense(id, { title, amount, category, date }) {
  const expenses = await getExpenses(); //getExpenses fn turned into variable so you can .find it
  const expense = expenses.find((expense) => expense.id === id);
  if (!expense) return null;

  const updated = {...expense, title: title.trim(), amount, category, date };
  await saveExpenses(expenses.map((expense) => (expense.id === id ? updated : expense)));
  return updated;
}

export async function getBudgets() {
  const text = await readFile(budgetsFile, "utf8");
  return JSON.parse(text);
}