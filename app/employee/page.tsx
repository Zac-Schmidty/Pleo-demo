"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
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

// Define the form validation schema
const formSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  date: z.string(),
  category: z.string(),
  amount: z.string(),
  receipt: z.string(),
  notes: z.string().optional(),
})

// Mock OCR result interface
interface ParsedReceipt {
  date: string;
  amount: string;
  category: string;
  notes: string;
}

// Helper function to generate a random date within the last 30 days
function getRandomDate() {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 30)
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return randomDate.toISOString().split('T')[0] // Returns YYYY-MM-DD
}

// Helper function to get random amount between min and max
function getRandomAmount(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

// Helper function to get random item from array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Generate random expense data
function generateExpenses() {

  const expenseTypes = [
    { category: 'Travel', items: ['Flight to London', 'Train ticket', 'Hotel stay', 'Taxi ride', 'Car rental', 'Airport parking'] },
    { category: 'Office Supplies', items: ['Printer paper', 'Ink cartridges', 'Notebooks', 'Pens and markers', 'Desk organizer', 'Sticky notes'] },
    { category: 'Software', items: ['Zoom subscription', 'Adobe Creative Cloud', 'Slack annual plan', 'Notion team license', 'Microsoft 365', 'Jira license'] },
    { category: 'Client Entertainment', items: ['Business lunch', 'Coffee meeting', 'Client dinner', 'Event tickets', 'Golf outing', 'Restaurant booking'] },
    { category: 'Training', items: ['Online course', 'Conference ticket', 'Workshop materials', 'Certification exam', 'Team training session', 'Professional development'] },
    { category: 'Marketing', items: ['Facebook Ads', 'LinkedIn Premium', 'Trade show booth', 'Marketing materials', 'Banner printing', 'Social media tools'] },
    { category: 'Equipment', items: ['Laptop', 'Monitor', 'Keyboard', 'Wireless mouse', 'Headphones', 'Webcam', 'Phone charger'] },
    { category: 'Miscellaneous', items: ['Office snacks', 'Team lunch', 'Birthday celebration', 'Office plants', 'First aid supplies', 'Coffee supplies'] }
  ]

  const amountRanges = {
    'Travel': { min: 50, max: 2000 },
    'Office Supplies': { min: 10, max: 200 },
    'Software': { min: 20, max: 500 },
    'Client Entertainment': { min: 30, max: 300 },
    'Training': { min: 100, max: 1500 },
    'Marketing': { min: 50, max: 1000 },
    'Equipment': { min: 50, max: 2000 },
    'Miscellaneous': { min: 5, max: 150 }
  }

  const category = getRandomItem(expenseTypes)
  const notes = getRandomItem(category.items)
  const amount = getRandomAmount(
      amountRanges[category.category as keyof typeof amountRanges].min,
      amountRanges[category.category as keyof typeof amountRanges].max
    )
  const date = getRandomDate()

  return {
    category: category.category,
    notes: notes,
    date: date,
    amount: amount,
  }
}

export default function ExpenseForm() {
  const [parsedData, setParsedData] = useState<ParsedReceipt | null>(null);
  
  // Initialize the form with all fields having defined default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      date: "",
      category: "",
      amount: "",
      receipt: "",
      notes: "",
    },
  })

  // Simulate OCR processing
  const simulateOCR = async (file: File) => {
    // Pretend we're processing the image
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const expense = generateExpenses()

    // Mock data - now using today's date
    const mockData: ParsedReceipt = {
      category: expense.category,
      notes: expense.notes,
      date: expense.date,
      amount: expense.amount.toString(),
    }

    setParsedData(mockData);

    // Auto-fill the form
    form.setValue("date", mockData.date);
    form.setValue("amount", mockData.amount);
    form.setValue("category", mockData.category);
    form.setValue("notes", mockData.notes);
  }

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Get existing expenses from localStorage or use empty array
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    
    // Create new expense
    const newExpense = {
      id: Date.now().toString(),
      employeeName: values.employeeName,
      date: values.date,
      submissionDate: today, // Add submission date
      category: values.category,
      amount: parseFloat(values.amount),
      status: 'pending',
      notes: values.notes
    }

    // Add to existing expenses
    const updatedExpenses = [...existingExpenses, newExpense]
    
    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
    
    // Clear form
    form.reset()
    
    // Show success message
    toast.success('Expense submitted successfully')
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Submit Expense</h1>
      <p className="text-slate-600 mb-6 text-sm">
        Once a receipt is input the data is extracted and autofills the expense info. This is just a demo using randomised expense data, but the functionality is valid. Employee would also not have to input their name (sign ins), but it is used for the demo.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="employeeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receipt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receipt</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <label 
                      htmlFor="file-upload" 
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer hover:border-pink-500 transition-colors"
                    >
                      <span>Choose Receipt</span>
                      <Input 
                        id="file-upload"
                        type="file" 
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            field.onChange(file.name)
                            await simulateOCR(file)
                          }
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Meals">Meals</SelectItem>
                    <SelectItem value="Client Entertainment">Client Entertainment</SelectItem>
                    <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any additional details here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button">Submit Expense</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Expense</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to submit this expense?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => form.handleSubmit(onSubmit)()}
                >
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  )
} 