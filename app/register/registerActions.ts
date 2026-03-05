'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const companyName = formData.get('companyName') as string

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: `${firstName} ${lastName}`,
                company_name: companyName,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        }
    })

    if (error) {
        let errorMessage = error.message
        if (errorMessage.includes('already registered')) {
            errorMessage = 'Este correo electrónico ya está registrado. Por favor, inicia sesión.'
        }
        return redirect(`/register?message=${encodeURIComponent(errorMessage)}`)
    }

    return redirect('/dashboard')
}
