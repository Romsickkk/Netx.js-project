"use server";

import argon2 from "argon2";
import { z } from "zod";

import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import { prisma } from "@/lib/prisma";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces"
      ),
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export async function signUp(
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return toActionState(
        "ERROR",
        "User with this email already exists",
        formData
      );
    }

    const existinUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existinUsername) {
      return toActionState("ERROR", "User with this username already exists");
    }
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return toActionState("SUCCESS", "Sign up successful", formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
}
