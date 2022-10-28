import { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
}

export const FormWrapper = <T extends FieldValues>({ methods, onSubmit, children }: FormWrapperProps<T>) => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
  </FormProvider>
);
