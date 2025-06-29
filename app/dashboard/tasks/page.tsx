import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export default async function TasksPage() {
  const session = await auth()
  const user = session?.user

  const canAccessTasks = user?.isActivated && user?.jobTier !== null

  return (
    <section className="container relative py-8">
      {!canAccessTasks ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-yellow-400 mb-2">Tasks Locked</h2>
          <p className="text-yellow-300 mb-4">You need to activate a package to access tasks</p>
          <Button asChild className="everett-gradient text-white">
            <Link href="/dashboard/packages">Activate a Package</Link>
          </Button>
        </div>
      ) : (
        <div>
          {/* Task content here */}
          <h1>Tasks Page</h1>
          <p>Welcome to the tasks page!</p>
        </div>
      )}
    </section>
  )
}
