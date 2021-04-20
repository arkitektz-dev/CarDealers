import * as yup from "yup";

export const loginSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  password: yup.string().min(4).max(10).required("Password is required"),
});
