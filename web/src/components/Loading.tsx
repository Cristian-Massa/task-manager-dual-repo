import { LoadingSpinner } from "./loading/LoadingSpinner";

export function Loading() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center">
      <LoadingSpinner />
      <p className="font-bold text-xl">Loading</p>
    </div>
  );
}
