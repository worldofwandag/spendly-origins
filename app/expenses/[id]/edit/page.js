
import ExpenseForm from "@/components/ExpenseForm";
import { getExpense } from "@/lib/expenses";
import { notFound } from "next/navigation";

export default async function EditExpensePage({ params }) {
    const { id } = await params;
    const expense = await getExpense(id);

    if(!expense) {
        notFound();
    }

    return(
        <main>
            <h1>Edit expense</h1>
            <ExpenseForm expense={expense} />
        </main>
    )


}