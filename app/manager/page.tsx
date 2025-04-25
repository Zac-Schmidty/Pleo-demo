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
import { Download } from "lucide-react"

export default function ManagerPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [currentPage, setCurrentPage] = useState(1)
  const expensesPerPage = 20
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

  // Get paginated expenses
  const indexOfLastExpense = currentPage * expensesPerPage
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense)
  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage)

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
        Review and manage employee expense submissions. Hover over the category to view more expense details. As this is a demo, the receipt is a static image (worth viewing).
      </p>

      {/* Filters with horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[140px] sm:w-[180px]">
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
          <SelectTrigger className="w-[140px] sm:w-[180px]">
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
          <SelectTrigger className="w-[140px] sm:w-[180px]">
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

      {/* Make table container scrollable */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.employeeName}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell 
                  className="capitalize relative group cursor-help"
                >
                  <span className="hover:text-pink-600">{expense.category}</span>
                  <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-2 rounded-md shadow-lg z-10 -mt-1 left-full ml-2 min-w-[200px]">
                    <p className="text-gray-500 text-xs">
                      Submitted: {expense.submissionDate || expense.date}
                    </p>
                    <p className="text-gray-700 text-xs mt-1">
                      {expense.notes}
                    </p>
                  </div>
                </TableCell>
                <TableCell>${Number(expense.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <a 
                    href="/Receipt.jpg"
                    download="Receipt.jpg"
                    className="flex items-center gap-1 text-pink-600 hover:text-pink-700 px-2 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-xs">Receipt</span>
                  </a>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
} 