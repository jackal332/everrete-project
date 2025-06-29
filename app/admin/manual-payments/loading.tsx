import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ManualPaymentsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6 bg-yellow-800/30" />

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-yellow-900/20 border-yellow-700">
              <CardContent className="p-4 text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2 bg-yellow-800/30" />
                <Skeleton className="h-4 w-20 mx-auto bg-yellow-800/30" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card className="bg-yellow-900/20 border-yellow-700 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1 bg-yellow-800/30" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-20 bg-yellow-800/30" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Cards Skeleton */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-yellow-900/20 border-yellow-700">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="w-4 h-4 bg-yellow-800/30" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-1 bg-yellow-800/30" />
                        <Skeleton className="h-4 w-48 bg-yellow-800/30" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4 bg-yellow-800/30" />
                          <div>
                            <Skeleton className="h-4 w-16 mb-1 bg-yellow-800/30" />
                            <Skeleton className="h-4 w-20 bg-yellow-800/30" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <Skeleton className="h-6 w-20 bg-yellow-800/30" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-20 bg-yellow-800/30" />
                      <Skeleton className="h-8 w-20 bg-yellow-800/30" />
                    </div>
                    <Skeleton className="h-8 w-16 bg-yellow-800/30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
