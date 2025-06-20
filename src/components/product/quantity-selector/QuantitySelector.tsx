'use client'  
import { useState } from "react";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

interface Props {
    quantity: number;

    onQuantityChanged: (value: number) => void;
    
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  
    // const [count, setCount] = useState(quantity);

    const onValueChanged = ( value: number ) => {

      if ( quantity + value < 1 ) return;
    //   setCount(count + value);
      onQuantityChanged(quantity + value);
    }
  
    return (
    <div className="flex">
        <button onClick={() => onValueChanged( - 1)}>
            <IoMdRemoveCircleOutline size={ 30 } />
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity}</span>

        <button onClick={() => onValueChanged(+ 1)}>
            <IoMdAddCircleOutline  size={ 30 } />
        </button>
    </div>
  )
}
