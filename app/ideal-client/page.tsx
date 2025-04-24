"use client"

export default function IdealClientPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Ideal Client Example: Hopin</h1>

      {/* About Hopin */}
      <section className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-2xl font-semibold mb-4">About Hopin</h2>
        <p className="text-slate-700 leading-relaxed">
          A fast-scaling virtual events and hybrid engagement platform, that enables organizations 
          to host immersive online experiences — from global summits to local community meetups. 
          They went fully remote during their scale-up and hired globally at pace (300+ employees). 
          They have teams in marketing, customer success, and product all spending across tools, 
          vendors, and events.
        </p>
      </section>

      {/* Company Structure */}
      <section className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-2xl font-semibold mb-4">Company Structure</h2>
        <div className="space-y-6">
          <h3 className="text-xl font-medium mb-3">Teams & Roles</h3>
          <div className="grid gap-4">
            {[
              {
                team: "Sales & Partnerships",
                role: "Attend/host events, manage travel/hospitality expenses",
                relevance: "Require fast access to budgets, mobile-friendly expense tracking, and quick approvals"
              },
              {
                team: "Marketing & Events",
                role: "Handle vendors, booths, and sponsorships across regions",
                relevance: "Need multi-currency support, vendor invoice management, and automated workflows"
              },
              {
                team: "Operations & Finance",
                role: "Oversee budgets, reimbursements, and compliance",
                relevance: "Primary users of approval flows, real-time spend visibility, and accounting integration"
              },
              {
                team: "Engineering & Product",
                role: "Purchase SaaS/dev tools occasionally",
                relevance: "Benefit from user-level control and receipt automation for one-off tech expenses"
              }
            ].map((item, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h4 className="font-semibold text-blue-600">{item.team}</h4>
                <p className="text-slate-600 mt-1">{item.role}</p>
                <p className="text-sm text-slate-500 mt-2">{item.relevance}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-medium mb-3 mt-8">Stakeholders</h3>
          <div className="grid gap-4">
            {[
              {
                role: "Finance Leadership",
                responsibility: "Make financial decisions, track spend, enforce compliance",
                needs: "Key decision-makers; need robust reporting, control, and integrations (e.g., Xero)"
              },
              {
                role: "Department Heads",
                responsibility: "Oversee budgets and team efficiency",
                needs: "Stakeholders in team-wide adoption and ensuring ease of use across functions"
              },
              {
                role: "IT / Procurement",
                responsibility: "Ensure data security and approve new tools/vendors",
                needs: "May vet Pleo's security and integration compatibility before full deployment"
              }
            ].map((item, i) => (
              <div key={i} className="border rounded-lg p-4">
                <h4 className="font-semibold text-blue-600">{item.role}</h4>
                <p className="text-slate-600 mt-1">{item.responsibility}</p>
                <p className="text-sm text-slate-500 mt-2">{item.needs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Pain Points</h2>
          <div className="space-y-4">
            {[
              {
                title: "Global Complexity",
                points: [
                  "Multiple currencies, time zones, and vendors",
                  "Inconsistent workflows for approving and reporting expenses"
                ]
              },
              {
                title: "Manual Receipt Hassles",
                points: [
                  "Teams submit receipts manually (or late), causing delays",
                  "Receipts are often missing or unclear for finance reviews"
                ]
              },
              {
                title: "Slow Reimbursements",
                points: [
                  "Employees front costs and wait for repayment",
                  "Hurts morale and productivity, especially in remote roles"
                ]
              },
              {
                title: "Limited Visibility",
                points: [
                  "Difficult to track live spending across distributed teams",
                  "Budget owners can't make real-time decisions"
                ]
              }
            ].map((item, i) => (
              <div key={i} className="border-b last:border-0 pb-4">
                <h3 className="font-medium text-red-600 mb-2">{item.title}</h3>
                <ul className="space-y-1">
                  {item.points.map((point, j) => (
                    <li key={j} className="text-slate-600 text-sm flex items-center gap-2">
                      <span className="text-red-500">●</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Pleo Solution</h2>
          <div className="space-y-4">
            {[
              {
                problem: "Employees paying out of pocket and waiting for reimbursement",
                solution: "Instantly issues smart virtual/physical cards with team and spending limit controls",
                benefit: "Virtual & Physical Company Cards",
                context: "Removes friction for remote, frequently traveling event staff"
              },
              {
                problem: "Finance lacks real-time visibility over spend",
                solution: "Transactions appear instantly in the Pleo dashboard",
                benefit: "Real-Time Expense Tracking",
                context: "Enables proactive budgeting and oversight for distributed teams"
              },
              {
                problem: "Manual receipt collection is time-consuming and error-prone",
                solution: "Mobile app lets employees snap and auto-match receipts on the go",
                benefit: "Automated Receipt Capture",
                context: "Saves time and prevents lost receipts, especially during live events or travel"
              },
              {
                problem: "Complex approval workflows due to remote teams in multiple time zones and currencies",
                solution: "Set automated rules for approvals, currencies, and department limits",
                benefit: "Custom Spend Rules by Team/Region",
                context: "Ensures compliance without micromanagement; adapts to Hopin's global footprint"
              }
            ].map((item, i) => (
              <div key={i} className="border-b last:border-0 pb-4">
                <h3 className="font-medium text-green-600 mb-1">{item.benefit}</h3>
                <p className="text-sm text-slate-600 mb-2">{item.solution}</p>
                <p className="text-xs text-slate-500 italic">{item.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Expected ROI</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              category: "Expense Reimbursement Cycle",
              before: "7-14 days avg",
              after: "1-2 days"
            },
            {
              category: "Manual Admin (per employee/month)",
              before: "~2 hours",
              after: "<30 mins"
            },
            {
              category: "Visibility into Live Spend",
              before: "Low",
              after: "High (real-time)"
            },
            {
              category: "Policy Compliance",
              before: "Difficult to enforce",
              after: "Easy via app-based rules"
            }
          ].map((item, i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-medium text-blue-600 mb-2">{item.category}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-slate-500">Before</p>
                  <p className="text-red-600 font-medium">{item.before}</p>
                </div>
                <div>
                  <p className="text-slate-500">After</p>
                  <p className="text-green-600 font-medium">{item.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 