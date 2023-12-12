import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { RootState } from 'store/store';
import { setLogout, setUser } from 'store/user/user-slice';
import { authEndpoints } from './api-auth-slice';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).user?.user?.accessToken;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
    credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = (await baseQuery(args, api, extraOptions)) as any;
    if (result.error && result.error.originalStatus === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = (await baseQuery(authEndpoints.refreshToken, api, extraOptions)) as any;

                if (refreshResult.data) {
                    api.dispatch(setUser(refreshResult.data.data));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(setLogout());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export default baseQueryWithReauth;
