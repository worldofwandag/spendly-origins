"use client"

import { CATEGORIES } from "@/lib/categories";
import { formatMonth } from "@/lib/helpers";
import { useRouter } from "next/navigation"

export default function Filters({ months, month, category }) {
    const router = useRouter()

    function handleMonthChange(event) {
            router.push(`/?month=${event.target.value}&category=${category}`);
    }
    function handleCategoryChange(event) {
            router.push(`/?month=${month}&category=${event.target.value}`);
    }

    return (
        <div className="filters">
            <select value={month} onChange={handleMonthChange}>
                {months.map((m) => <option key={m} value={m}>
                    {formatMonth(m)}
                </option>)}
            </select>

            <select value={category} onChange={handleCategoryChange}>
                <option value="all">All Categories</option>
                {CATEGORIES.map((name) => <option key={name}>{name}</option>)}
            </select>
        </div>
    )
}

//The dropdowns don't filter anything themselves. They just change the URL with router.push, like the search on Instaclone's explore page. The page reads the URL and does the filtering.
