// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { z } from "zod";
// import { redirect } from "next/navigation";

// const signInSchema = z.object({
//   email: z.string().email().min(1, { message: "Email is required" }).max(191),
//   password: z.string().min(6, { message: "Password is required" }).max(191),
// });

// export async function POST(request: Request) {
//   try {
//     const formData = await request.json();
//     const { email, password } = signInSchema.parse(formData); // Валидация данных

//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Incorrect email or password", field: "email" },
//         { status: 404 }
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Incorrect email or password", field: "email" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       message: "Logged in successfully",
//       userId: user.id,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message || "An error occurred" },
//         { status: 500 }
//       );
//     } else {
//       return NextResponse.json(
//         { error: "An unknown error occurred" },
//         { status: 500 }
//       );
//     }
//   }
// }
