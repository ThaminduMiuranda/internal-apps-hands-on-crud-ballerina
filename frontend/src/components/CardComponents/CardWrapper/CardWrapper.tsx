import { CardWrapperProps } from "@/types/types";

export default function CardWrapper({ children }: CardWrapperProps) {
  return (
    <>
      <div className="userGrid rounded-2xl relative backdrop-blur-md p-[3ch] flex flex-col gap-[3ch] ">
        {children}
      </div>
    </>
  );
}
