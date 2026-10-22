import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import Filters from "@/components/Filters";
import { getExpenses, getBudgets } from "@/lib/expenses";
import { CATEGORIES  } from "@/lib/categories";
import { formatMoney, formatMonth, getMonths, sum } from "@/lib/helpers";
import BudgetBar from "@/components/BudgetBar";


export default async function HomePage({ searchParams }) {
  const filters = await searchParams; //searchParams works just like params. Next.js hands it to the page, and we await it.
  const expenses = await getExpenses(); //If this is getting data from an external api, we'd have to use fetch
  const budgets = await getBudgets()

  if (expenses.length === 0) { //With zero expenses there are no months, and formatMonth would crash.
    return (
      <main>
        <h1>Expenses</h1>
        <p className="muted">No expenses yet</p>
        <Link href="/expenses/new" className="button">
          + Add expense
        </Link>
      </main>
    );
  }

  const months = getMonths(expenses);
  const month = filters.month ?? months[0]; //No month in the URL yet? We use months[0], the newest month, because getExpenses sorts newest first
  const category = filters.category ?? "all";

  const monthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(month),
  );
  const shownExpenses =
    category === "all"
      ? monthExpenses
      : monthExpenses.filter((expense) => expense.category === category);

  return (
    <main>
      <div className="page-header">
        <h1>Expenses</h1>
        <Link href="/expenses/new" className="button">
          + Add expense
        </Link>
      </div>

      <Filters months={months} month={month} category={category} />

      <section className="card">
        <h2>{formatMonth(month)} budgets</h2>
        {CATEGORIES.map((name) => (
          <BudgetBar
            key={name}
            category={name}
            spent={sum(monthExpenses.filter((expense) => expense.category === name))}
            // The bars use monthExpenses, not shownExpenses, so they always show the whole month, even with a category filter on.
            budget={budgets[name]}
          />
        ))}
      </section>
      {/* For each category, we filter that month's expenses down to the category and sum them. The same helper from the start, running once per bar. */}

      <section className="card">
        <div className="list-header">
          <h2>{category === "all" ? "All categories" : category}</h2>
          <p className="total">{formatMoney(sum(expenses))}</p>
        </div>

        {shownExpenses.length === 0 && (
          <p className="muted">Nothing here yet.</p>
        )}

        <ul className="expense-list">
          {shownExpenses.map((expense) => (
            <li key={expense.id} className="expense">
              <div>
                <p className="expense-title">{expense.title}</p>
                <p className="muted">
                  {expense.category} · {expense.date}
                </p>
              </div>
              <p className="expense-amount">{formatMoney(expense.amount)}</p>
              {/* pass expense amount into formatMoney so you get the correct 0 at the end and the $ */}
              <div className="expense-actions">
                <Link href={`/expenses/${expense.id}/edit`}>Edit</Link>
                <DeleteButton id={expense.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
