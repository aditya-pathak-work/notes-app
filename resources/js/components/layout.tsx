import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="p-3 w-dvw h-dvh overflow-auto flex flex-col">
            {children}
        </div>
    );
}