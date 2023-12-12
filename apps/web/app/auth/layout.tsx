export default function Layout({ children }: { children: any }) {
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-semibold">AUTH</h1>
            {children}
        </div>
    );
}
