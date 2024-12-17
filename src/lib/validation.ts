import { z } from 'zod'

export const loginSchema = z.object({
	Email: z.string().email(),
	password: z.string().min(8)
})

export const registerSchema = z.object({
	Email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string()
}).refine(data => data.confirmPassword === data.password, {
	message: 'Passwords do not match!',
	path: ['confirmPassword']
})

export const taskSchema = z.object({
	title: z.string()
})