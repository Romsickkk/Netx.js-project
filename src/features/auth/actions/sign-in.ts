import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(191)
    .email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password is required" }).max(191),
});

export async function signIn(
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = Object.fromEntries(formData);
    const { email, password } = signInSchema.parse(rawData);

    const result = await nextAuthSignIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      return toActionState("SUCCESS", "Logged in successfully");
    } else {
      return {
        status: "ERROR",
        message: "Incorrect email or password",
        payload: formData,
        fieldErrors: {
          password: ["Incorrect email or password"],
        },
        timestamp: Date.now(),
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};

      for (const err of error.errors) {
        const field = err.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
      }

      return {
        status: "ERROR",
        message: "Validation failed",
        payload: formData,
        fieldErrors,
        timestamp: Date.now(),
      };
    }

    return fromErrorToActionState(error, formData);
  }
}
