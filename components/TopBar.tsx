import Clock from "./Clock";

export default function TopBar() {
  return (
    <div className="flex items-center justify-end gap-3 pt-[max(1.75rem,env(safe-area-inset-top))] sm:pt-8">
      <Clock />
    </div>
  );
}
