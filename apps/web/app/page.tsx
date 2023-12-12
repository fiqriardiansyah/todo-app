'use client';

import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { useAppDispatch, useAppSelectore } from 'hooks/useStore';
import { useLogoutMutation } from 'store/api/api-auth-slice';
import { setLogout } from 'store/user/user-slice';

export default function IndexPage() {
    const router = useRouter();
    const token = useAppSelectore((s) => s.user.user);

    const [logoutMutation] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const logoutClick = () => {
        logoutMutation().then(() => {
            dispatch(setLogout());
            router.refresh();
        });
    };

    return (
        <main className="flex flex-col gap-10 w-full min-h-screen items-center justify-centerr">
            <Link href="/new" className="!text-white">
                add new todo
            </Link>
            <button onClick={logoutClick} className="text-red-300 text-3xl">
                logout
            </button>
        </main>
    );
}
