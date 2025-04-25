"use client"

import { useState, useEffect } from "react"
import { mockExpenses, type Expense } from "../data/expenses"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ManagerPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [employeeFilter, setEmployeeFilter] = useState<string>("all")

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    const allExpenses = [...mockExpenses, ...storedExpenses].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    setExpenses(allExpenses)
  }, [])

  // Get unique employee names from all expenses
  const uniqueEmployees = Array.from(
    new Set(expenses.map(expense => expense.employeeName))
  ).sort()

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesStatus = statusFilter === "all" || expense.status === statusFilter
      const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
      const matchesEmployee = employeeFilter === "all" || expense.employeeName === employeeFilter
      return matchesStatus && matchesCategory && matchesEmployee
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleStatusChange = (expenseId: string, newStatus: 'approved' | 'rejected') => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId 
        ? { ...expense, status: newStatus }
        : expense
    ))

    toast.success(`Expense ${newStatus}`, {
      description: `The expense has been ${newStatus}.`,
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Expense Management</h1>
      <p className="text-slate-600 mb-6 text-sm">
        Review and manage employee expense submissions
      </p>

      <div className="flex gap-4 mb-6">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setCategoryFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Client Entertainment">Client Entertainment</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Equipment">Equipment</SelectItem>
            <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setEmployeeFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employees</SelectItem>
            {uniqueEmployees.map(employee => (
              <SelectItem key={employee} value={employee}>
                {employee}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.employeeName}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell className="capitalize">{expense.category}</TableCell>
              <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
              <TableCell className="max-w-[180px]">
                <div className="space-y-1">
                  <p className="text-gray-500 text-xs">
                    Submitted: {expense.submissionDate || expense.date}
                  </p>
                  <p className="text-gray-700 text-xs truncate">
                    {expense.notes}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className={`capitalize px-2 py-1 rounded-full text-sm
                  ${expense.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    expense.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {expense.status}
                </span>
              </TableCell>
              <TableCell>
                {expense.status === 'pending' && (
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Approve
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Expense</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to approve this expense?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleStatusChange(expense.id, 'approved')}
                          >
                            Approve
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Expense</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to reject this expense?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleStatusChange(expense.id, 'rejected')}
                          >
                            Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 