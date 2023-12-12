'use client';

import { useAppDispatch } from 'hooks/useStore';
import { signinData } from 'models/auth';
import { useRouter } from 'next-nprogress-bar';
import { useSigninMutation } from 'store/api/api-auth-slice';
import { setUser } from 'store/user/user-slice';

export default function FormAuth() {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const [signinMutation, { isLoading, isError, error }] = useSigninMutation();

    const onSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            signinData.parse({ email, password });
            signinMutation({ email, password }).then((res) => {
                if ('error' in res) return;
                dispatch(setUser(res.data?.data));
                router.push('/');
            });
        } catch (e: any) {
            console.log(e?.message);
        }
    };

    return (
        <form className="flex flex-col gap-4 border border-gray-400 rounded" onSubmit={onSubmit}>
            {isLoading ? <h1 className="text-white text-3xl">Loadingg</h1> : null}
            {isError ? <h1 className="text-red-300 text-3xl">{(error as any).data.message}</h1> : null}
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">signin</button>
        </form>
    );
}
