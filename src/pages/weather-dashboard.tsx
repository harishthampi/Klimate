import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const DashBoard = () => {
  return (
    <div className="space-y-4">
      {/* FavouriteCity */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button  size={"icon"}
        // onClick={handleRefresh}
        // disabled={}
        >
          <RefreshCw className="h-4 w-4"/>
        </Button>
        </div>
        {/* current and hourly forecast */}
      </div>
  )
}

export default DashBoard
