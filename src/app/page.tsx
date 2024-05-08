"use client";
import { FormComponent } from "@/components/form/form";

export default function Home() {
  return (
    <FormComponent
      formConfig={[
        { type: "text_field", label: "Test" },
        { type: "upload", label: "Test" },
      ]}
      fixActionBarAtBottom={false}
    />
  );
}
