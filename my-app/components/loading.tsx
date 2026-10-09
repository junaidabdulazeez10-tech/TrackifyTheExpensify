import { LoaderCircle   } from "lucide-react";

export default function Loading() {

  return (
     <div className="flex min-h-screen flex-col items-center justify-center gap-5">

      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          TrackifyTheExpensify
        </h2>

        <div className="mt-3 flex justify-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )

}