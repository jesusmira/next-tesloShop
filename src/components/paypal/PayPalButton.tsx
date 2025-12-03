'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props{
  orderId: string;
  amount: number;
}



export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundendAmont = (Math.round(amount * 100)) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-10  bg-gray-300 rounded" />
        <div className="h-10  bg-gray-300 rounded mt-2" />
      </div>
    )
  }


  const createOrder = async (data:CreateOrderData, actions:CreateOrderActions): Promise<string> =>{

    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
          {
          invoice_id: orderId,  
          amount: {
            value: roundendAmont.toString(),
            currency_code: 'USD'
          }
        }
]
    });

    console.log(transactionId);

    // TODO: guardar el transacctionId en la orden en la base de datos
    //actions/payments/ setTransactionId(transactionId);
    const { ok} = await setTransactionId({ transactionId, orderId });

    if (!ok) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  }

  const onApprove = async(data:OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    
    if (!details || !details.id) return;

    await paypalCheckPayment(details.id);


  }



  return (
    <>
      
      <PayPalButtons
        createOrder={ createOrder }
        onApprove={ onApprove }
      />
    </>
  )
}
