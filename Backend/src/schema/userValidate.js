import { z } from "zod"

const signupSchema = z.object({

    email: z.string({
        required_error: "Email is required",
    })
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" })
        .trim()
        .toLowerCase(),

    password: z.string({
        required_error: "Password is required",
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .min(1, { message: "Password is required" }),

    fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full Name must be a string",
    })
        .min(1, { message: "Full name is required" })
        .trim(),

    admin: z.boolean()
        .default(false),

    avatar: z.string()
        .url({ message: "invalid URL" })
        .optional(),

    refreshToken: z.string()
        .optional()



})

const loginSchema = z.object({

    email: z.string({
        required_error: "Email is required",
    })
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" })
        .trim()
        .toLowerCase(),

    password: z.string({
        required_error: "Password is required",
    })
        .min(8, { message: "Password must be at least 8 characters long" })
        .min(1, { message: "Password is required" }),

})

export {
    signupSchema,
    loginSchema
}
