import Image from "next/image";
import { CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen p-8">
      <main className="flex flex-col gap-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to my Pleo Sales Engineering Demo
          </h1>
          <p className="text-lg text-slate-600">
            An expense management system demonstration
          </p>
        </div>

        {/* What is Pleo Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">What is Pleo?</h2>
          <p className="text-xl font-semibold text-blue-600">
            Smart Spending. Simple Control. Real-Time Visibility.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Pleo is a modern spend management solution that replaces outdated expense workflows 
            with smart company cards, automated expense tracking, and seamless accounting 
            integration — giving businesses real-time visibility and full control of team spending.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Key Features at a Glance</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                feature: "Smart Company Cards",
                does: "Issue physical or virtual cards to employees",
                matters: "Empower teams to spend without delays, reduce bottlenecks"
              },
              {
                feature: "Automated Receipt Capture",
                does: "Snap & attach receipts via mobile app",
                matters: "Say goodbye to lost receipts and manual chasing"
              },
              {
                feature: "Real-Time Expense Tracking",
                does: "Every purchase shows up instantly",
                matters: "Keep finance informed and in control, always"
              },
              {
                feature: "Spend Controls & Approvals",
                does: "Set limits, auto-flag unusual spend, require approvals",
                matters: "Protect budget and prevent overspend"
              },
              {
                feature: "Accounting Integrations",
                does: "Connect to Xero, QuickBooks, Sage, etc.",
                matters: "Cut down on admin and speed up month-end close"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-600">{item.feature}</h3>
                <p className="mt-2 text-slate-600">{item.does}</p>
                <p className="mt-1 text-sm text-slate-500">{item.matters}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">How It Works</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {[
                "Manager Sets Card Limits",
                "Employee Makes Purchase",
                "Real-Time Notification + Auto Receipt Request",
                "Expense Appears in Dashboard",
                "Export to Accounting Software in 1 Click"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Companies Choose Pleo Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Why Companies Choose Pleo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Boost Efficiency",
                desc: "No more receipt chasing or spreadsheet hell."
              },
              {
                title: "Empower Employees",
                desc: "Let teams spend responsibly — without the friction."
              },
              {
                title: "Complete Visibility",
                desc: "See what's being spent, by whom, and why — in real-time."
              },
              {
                title: "Scales With You",
                desc: "From startups to 1,000+ headcount orgs, Pleo grows with your business."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="font-bold">{item.title}</h3>
                </div>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Integrates Seamlessly With</h2>
          <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Xero",
              "QuickBooks",
              "Sage",
              "Netsuite",
              "Google Workspace",
              "Microsoft Teams",
              "… and more!"
            ].map((integration, i) => (
              <div 
                key={i} 
                className="p-4 bg-white rounded-lg shadow-sm border text-center hover:border-blue-500 transition-colors"
              >
                <p className="font-medium text-slate-700">{integration}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Perfect For</h2>
          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              "Remote or hybrid teams",
              "Fast-scaling startups",
              "Finance teams drowning in manual processes",
              "Any business that hates chasing receipts"
            ].map((item, i) => (
              <div 
                key={i} 
                className="p-6 bg-white rounded-lg shadow-sm border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-lg text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
