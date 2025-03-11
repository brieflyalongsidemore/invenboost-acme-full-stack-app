import { useFormikContext } from "formik"
import { type MainFormSchemaType } from "../get-started/page"

export const useMainForm = () => {
    const form = useFormikContext<MainFormSchemaType>()
    return form

}