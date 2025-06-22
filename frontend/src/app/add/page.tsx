import CardWrapper from "@/components/CardComponents/CardWrapper/CardWrapper";
import Form from "@/components/Form/Form";

export default function Add() {
  return (
    <>
      <CardWrapper>
        <div className="">
          <Form mode="add" role={"admin"} />
        </div>
      </CardWrapper>
    </>
  );
}
