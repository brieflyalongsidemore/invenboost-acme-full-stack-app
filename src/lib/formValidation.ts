import { type FormikProps } from "formik";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIfFormIsValid = (form: FormikProps<any>, formKey: string) => {
  return form.values
    ? //eslint-disable-next-line
      !Object.values(form.values[formKey]).every((val: any) => val === "")
    : false;
};
