export type Expense = {
  id: string;
  employeeName: string;
  date: string;
  submissionDate?: string;
  category: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  receiptUrl: string;
};

export const mockExpenses: Expense[] = [
  {
    id: '23',
    employeeName: 'Tony Stark',
    date: '2025-04-24',
    submissionDate: '2025-04-24',
    category: 'meals',
    amount: 42.99,
    notes: 'Working lunch with department',
    status: 'approved',
    receiptUrl: 'receipt23.jpg'
  },
  {
    id: '22',
    employeeName: 'Tony Stark',
    date: '2025-04-23',
    submissionDate: '2025-04-23',
    category: 'travel',
    amount: 1250.00,
    notes: 'International business flight',
    status: 'pending',
    receiptUrl: 'receipt22.jpg'
  },
  {
    id: '21',
    employeeName: 'Peter Parker',
    date: '2025-04-22',
    submissionDate: '2025-04-22',
    category: 'supplies',
    amount: 999.99,
    notes: 'New laptop accessories',
    status: 'rejected',
    receiptUrl: 'receipt21.jpg'
  },
  {
    id: '20',
    employeeName: 'Diana Prince',
    date: '2025-04-21',
    submissionDate: '2025-04-21',
    category: 'meals',
    amount: 195.75,
    notes: 'Team building dinner - 5 people',
    status: 'approved',
    receiptUrl: 'receipt20.jpg'
  },
  {
    id: '19',
    employeeName: 'Peter Parker',
    date: '2025-04-20',
    submissionDate: '2025-04-20',
    category: 'travel',
    amount: 55.00,
    notes: 'Uber rides to client office',
    status: 'pending',
    receiptUrl: 'receipt19.jpg'
  },
  {
    id: '18',
    employeeName: 'Diana Prince',
    date: '2025-04-18',
    submissionDate: '2025-04-18',
    category: 'supplies',
    amount: 175.25,
    notes: 'Office decorations for company event',
    status: 'approved',
    receiptUrl: 'receipt18.jpg'
  },
  {
    id: '17',
    employeeName: 'Bruce Wayne',
    date: '2025-04-16',
    submissionDate: '2025-04-16',
    category: 'meals',
    amount: 28.50,
    notes: 'Overtime dinner',
    status: 'rejected',
    receiptUrl: 'receipt17.jpg'
  },
  {
    id: '16',
    employeeName: 'Bruce Wayne',
    date: '2025-04-14',
    submissionDate: '2025-04-14',
    category: 'travel',
    amount: 890.00,
    notes: 'Conference registration + hotel',
    status: 'approved',
    receiptUrl: 'receipt16.jpg'
  },
  {
    id: '15',
    employeeName: 'Peter Parker',
    date: '2025-04-12',
    submissionDate: '2025-04-12',
    category: 'supplies',
    amount: 529.99,
    notes: 'New office chair (ergonomic)',
    status: 'pending',
    receiptUrl: 'receipt15.jpg'
  },
  {
    id: '14',
    employeeName: 'Diana Prince',
    date: '2025-04-10',
    submissionDate: '2025-04-10',
    category: 'meals',
    amount: 145.80,
    notes: 'Client lunch meeting - 4 people',
    status: 'approved',
    receiptUrl: 'receipt14.jpg'
  },
  {
    id: '13',
    employeeName: 'Bruce Wayne',
    date: '2025-04-08',
    submissionDate: '2025-04-08',
    category: 'travel',
    amount: 65.00,
    notes: 'Parking fees for client visit',
    status: 'pending',
    receiptUrl: 'receipt13.jpg'
  },
  {
    id: '12',
    employeeName: 'Tony Stark',
    date: '2025-04-05',
    submissionDate: '2025-04-05',
    category: 'supplies',
    amount: 89.99,
    notes: 'Ergonomic keyboard',
    status: 'approved',
    receiptUrl: 'receipt12.jpg'
  },
  {
    id: '11',
    employeeName: 'Peter Parker',
    date: '2025-03-29',
    submissionDate: '2025-03-29',
    category: 'meals',
    amount: 75.25,
    notes: 'Department celebration dinner',
    status: 'pending',
    receiptUrl: 'receipt11.jpg'
  },
  {
    id: '10',
    employeeName: 'Bruce Wayne',
    date: '2025-03-22',
    submissionDate: '2025-03-22',
    category: 'travel',
    amount: 550.00,
    notes: 'Flight to Chicago for training',
    status: 'approved',
    receiptUrl: 'receipt10.jpg'
  },
  {
    id: '9',
    employeeName: 'Diana Prince',
    date: '2025-03-15',
    submissionDate: '2025-03-15',
    category: 'supplies',
    amount: 159.99,
    notes: 'Printer cartridges',
    status: 'pending',
    receiptUrl: 'receipt9.jpg'
  },
  {
    id: '8',
    employeeName: 'Tony Stark',
    date: '2025-03-08',
    submissionDate: '2025-03-08',
    category: 'meals',
    amount: 35.50,
    notes: 'Team lunch meeting',
    status: 'rejected',
    receiptUrl: 'receipt8.jpg'
  },
  {
    id: '7',
    employeeName: 'Peter Parker',
    date: '2025-03-01',
    submissionDate: '2025-03-01',
    category: 'travel',
    amount: 450.00,
    notes: 'Hotel stay for conference',
    status: 'approved',
    receiptUrl: 'receipt7.jpg'
  },
  {
    id: '6',
    employeeName: 'Bruce Wayne',
    date: '2025-02-22',
    submissionDate: '2025-02-22',
    category: 'supplies',
    amount: 299.99,
    notes: 'New monitor for home office',
    status: 'pending',
    receiptUrl: 'receipt6.jpg'
  },
  {
    id: '5',
    employeeName: 'Tony Stark',
    date: '2025-02-15',
    submissionDate: '2025-02-15',
    category: 'meals',
    amount: 89.99,
    notes: 'Client dinner at Italian Restaurant',
    status: 'approved',
    receiptUrl: 'receipt5.jpg'
  },
  {
    id: '4',
    employeeName: 'Diana Prince',
    date: '2025-02-08',
    submissionDate: '2025-02-08',
    category: 'travel',
    amount: 125.75,
    notes: 'Taxi rides for client meetings',
    status: 'pending',
    receiptUrl: 'receipt4.jpg'
  },
  {
    id: '3',
    employeeName: 'Peter Parker',
    date: '2025-02-01',
    submissionDate: '2025-02-01',
    category: 'supplies',
    amount: 45.50,
    notes: 'Office supplies',
    status: 'rejected',
    receiptUrl: 'receipt3.jpg'
  },
  {
    id: '2',
    employeeName: 'Bruce Wayne',
    date: '2025-01-25',
    submissionDate: '2025-01-25',
    category: 'travel',
    amount: 250.00,
    notes: 'Flight to New York',
    status: 'approved',
    receiptUrl: 'receipt2.jpg'
  },
  {
    id: '1',
    employeeName: 'Tony Stark',
    date: '2025-01-18',
    submissionDate: '2025-01-18',
    category: 'meals',
    amount: 15.99,
    notes: 'Merchant: Coffee Shop',
    status: 'pending',
    receiptUrl: 'receipt1.jpg'
  }
]; 