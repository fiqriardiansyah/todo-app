'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReactReduxProvider } from 'react-redux';
import '../style/globals.css';
import store from 'store/store';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tudu</title>
            <meta name="description" content="Todo app" />
            <body className={`${inter.className} bg-primary`}>
                <AppProgressBar height="3px" color="#ffffff" options={{ showSpinner: false, parent: 'body' }} shallowRouting />
                <ReactReduxProvider store={store}>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                </ReactReduxProvider>
            </body>
        </html>
    );
}
