import CardWrapper from "@/components/CardComponents/CardWrapper/CardWrapper";
import Form from "@/components/Form/Form";

export default function Add() {
  return (
    <>
      <div className="">
        <h1 className="text-center text-[color:var(--text-1)] text-[1.325rem] font-medium pb-[3ch]">
          Learning Portal - Add a User
        </h1>
        <CardWrapper>
          <div className="">
            <Form mode="add" role={""} />
          </div>
        </CardWrapper>
      </div>
    </>
  );
}
