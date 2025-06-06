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
            email: "b_example.com",
            name: "John Doe",
            phone: null
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "c_example.com",
            name: "Jane Smith",
            phone: 1234567890
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "k_example.com",
            name: "Alice Johnson",
            phone: 9876543210
        },
        {
            id: "1",
            amount: 100,
            status: "pending",
            email: "w_example.com",
            name: "Bob Brown",
            phone: null
        },
    ]
}
export default async function page() {
    const data = await getData();

  return (
    <div className='p-4'>
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <DataTable columns={columns} data={data} />
    </div>
  )
}
