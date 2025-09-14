"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { Chart } from "@/components/chart";

export const DataCharts = () => {
    const {data, isLoading} = useGetSummary();

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return(
              <div className="grid grid-col-1 lg:grid-cols-6 gap-8">
                <div className="col-span-1 lg:col-span-3 xl:xol-span-4">
                    <Chart data={data?.days}/>
                </div>
              </div>
    )
}