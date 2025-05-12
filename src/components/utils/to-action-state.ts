import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  formData?: FormData;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export function fromErrorToActionState(
  error: unknown,
  formData?: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
}

export function toActionState(
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
}
