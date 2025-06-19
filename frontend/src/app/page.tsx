import UserGrid from "@/components/CardGrid/UserGrid";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-center text-[color:var(--text-1)] text-[1.325rem] font-medium pb-[3ch]">
        Learning Portal - User Management
      </h1>
      <UserGrid />
    </div>
  );
}
