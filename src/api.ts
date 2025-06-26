import { TransactionsResponseSchema } from "./schemas"


export async function getSalesByDate(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`
    const req = await fetch(url)
    const json = await req.json()


    //console.log("desde getSalesByDate",json)


    const transactions = TransactionsResponseSchema.parse(json)

    //console.log("desde getSalesByDate",transactions)

    return transactions
}