import { submitOrder } from "@/actions/submit-order-action"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store"
import { toast } from "react-toastify"


export default function SubmitOrderForm() {

    const total = useStore(state => state.total)
    const coupon = useStore(state => state.coupon.name)
    const contents = useStore(state => state.contents)
    const clearOrder = useStore(state => state.clearOrder)

    const order = {
        total,
        coupon,
        contents
    }

    //console.log(order)

    const submitOrderWithData = submitOrder.bind(null, order)

    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error => toast.error(error))
        }

        if (state.success) {
            const message = typeof state.success === 'string' ? state.success : state.success.message;
            toast.success(message);
            clearOrder()
        }
    }, [state, clearOrder]);

    //console.log(state)

    return (
        <form action={dispatch}>
            <input
                type="submit"
                value="Confirmar Compra"
                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white uppercase font-bold p-3"
            />
        </form>
    )
}