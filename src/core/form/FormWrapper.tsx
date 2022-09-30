import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { CustomFC } from '../interface/component';

interface FormWrapperProps<T extends FieldValues> extends CustomFC {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

const FormWrapper = <T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: FormWrapperProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;
