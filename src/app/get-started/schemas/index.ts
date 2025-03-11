import { z } from "zod";

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
  phone: z.string().min(10, "Phone number is required."),
  accessCode: z.string().min(6, "Access code is required."),
});

export type InsuranceDetailsSchemaType = z.infer<typeof InsuranceDetailsSchema>;

export const InsuranceDetailsSchema = z.object({
  provider: z.string().min(1, "Please select an Insurance Provider"),
  memberId: z.string().min(1, "Please enter a Member ID"),
  groupNumber: z.string().min(1, "Please enter a Group Number"),
});
