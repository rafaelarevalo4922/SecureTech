'use client'

import { ReactNode } from 'react'

export function ServerActionForm({ action, children }: { action: (formData: FormData) => void, children: ReactNode }) {
    return (
        <form action={action} className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            {children}
        </form>
    )
}
