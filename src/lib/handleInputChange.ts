import { type FormikProps } from "formik";

export const handleOnChange = async (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormikProps<any>,
) => {
  const id = e.target.id;
  await form.setFieldValue(id, e.target.value);
};
