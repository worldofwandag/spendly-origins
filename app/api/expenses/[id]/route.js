import { deleteExpense, updateExpense } from "@/lib/expenses";
import { validateExpense } from "@/lib/validate";

export async function DELETE(request, { params }) {
    const { id } = await params;

    const deleted = await deleteExpense(id);
    if(!deleted) {
        return Response.json({ error: "Expense not found."}, { status: 404 })
    }

    return Response.json({ success: true })
}
// DELETE is a new endpoint type. Same idea as GET and POST, a function named after the action. Route handlers get params as their second argument, and we await it

export async function PATCH(request, { params }) {
    const { id } = await params;
    const data = await request.json()

    const error = validateExpense(data); 
    if (error) {
        return Response.json({ error }, { status: 400 });
    }

    const expense = await updateExpense(id, data);
    if (!expense) {
        return Response.json({ error: "Expense not found"}, { status: 404 })
    }

    return Response.json(expense)
}


