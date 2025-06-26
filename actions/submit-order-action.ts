"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"

export async function submitOrder(data: unknown) {
    const order = OrderSchema.parse(data)
    const url = `${process.env.API_URL}/transactions`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...order})
    })

    const json = await req.json()
    if(!req.ok){
        const erros = ErrorResponseSchema.parse(json)
        return {
            errors: erros.message.map(issue => issue),
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(json)

    revalidateTag('products-by-category')
    //revalidatePath('/(store)/[caregoryId]', 'page')

    return {
        errors: [],
        success
    }
}