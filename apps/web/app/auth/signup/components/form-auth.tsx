'use client';

import { signupData } from 'models/auth';
import { useRouter } from 'next-nprogress-bar';
import { useSignupMutation } from 'store/api/api-auth-slice';

export default function FormAuth() {
    const router = useRouter();

    const [signupMutation] = useSignupMutation();

    const onSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const name = data.get('name') as string;

        try {
            signupData.parse({ email, name, password });
            signupMutation({ email, password, name }).then((res: any) => {
                if ('error' in res) {
                    console.log(res?.data?.message);
                    return;
                }
                router.refresh();
            });
        } catch (e: any) {
            console.log(e?.message);
        }
    };

    return (
        <form className="flex flex-col gap-4 border border-gray-400 rounded" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">signup</button>
        </form>
    );
}
