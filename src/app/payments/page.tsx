import React from 'react'
import type { ColumnDef } from "@tanstack/react-table"
import { columns, type Payment } from './columns';
import { DataTable } from './DataTable';

async function  getData():Promise<Payment[]> {
    return[
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "a_example.com"
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "a_example.com"
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "a_example.com"
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "a_example.com"
        },
    ]
}
export default async function page() {
    const data = await getData();

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <DataTable columns={columns} data={data} />
    </div>
  )
}
