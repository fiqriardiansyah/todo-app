import { z } from 'zod';

export interface BaseResponse<T> {
    message: string;
    data: T;
}

export const authSchema = z.object({
    id: z.number().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
    accessToken: z.string().optional(),
});

export type AuthType = z.infer<typeof authSchema>;

export const signupData = z.object({
    name: z.string().min(5, { message: 'min length charcater name is 5' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'min length character password is 8' }),
});

export const signinData = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'min length character password is 8' }),
});

export type SignupDataType = z.infer<typeof signupData>;
export type SigninDataType = z.infer<typeof signinData>;

export interface SigninResponse {
    accessToken: string;
}
