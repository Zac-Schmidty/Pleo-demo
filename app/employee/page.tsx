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

// Define the form validation schema
const formSchema = z.object({
  date: z.string(),
  category: z.string(),
  amount: z.string(),
  receipt: z.string(),
  notes: z.string().optional(),
})

// Mock OCR result interface
interface ParsedReceipt {
  merchantName: string;
  date: string;
  amount: string;
  category: string;
}

export default function ExpenseForm() {
  const [parsedData, setParsedData] = useState<ParsedReceipt | null>(null);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

    // Mock data - now using today's date
    const mockData: ParsedReceipt = {
      merchantName: "Coffee Shop",
      date: today,
      amount: "15.99",
      category: "meals",
    }

    setParsedData(mockData);

    // Auto-fill the form
    form.setValue("date", mockData.date);
    form.setValue("amount", mockData.amount);
    form.setValue("category", mockData.category);
    form.setValue("notes", `Merchant: ${mockData.merchantName}`);
  }

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Submit Expense</h1>
      <p className="text-slate-600 mb-6 text-sm">
        Once a receipt is input the data is extracted and autofills the expense info. This is just a demo using a pre-empted expense, but the functionality is valid.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="receipt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receipt</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input 
                      type="file" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          field.onChange(file.name)
                          await simulateOCR(file)
                        }
                      }}
                    />
                    {parsedData && (
                      <div className="p-4 bg-slate-100 rounded-md">
                        <h3 className="font-semibold mb-2">Parsed Receipt Data:</h3>
                        <p>Merchant: {parsedData.merchantName}</p>
                        <p>Date: {parsedData.date}</p>
                        <p>Amount: ${parsedData.amount}</p>
                        <p>Category: {parsedData.category}</p>
                      </div>
                    )}
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
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="meals">Meals</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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

          <Button type="submit">Submit Expense</Button>
        </form>
      </Form>
    </div>
  )
} 