import React from 'react'

export type PaymentModelProps = {
    priceInitial: number, 
    onSubscribe: (value: number) => void
}

function PaymentModel({priceInitial, onSubscribe} : PaymentModelProps) {
    const [price, setPrice] = React.useState<number>(priceInitial)

    const handleSubscribe = () => {
        onSubscribe(price)
    }

  return (
    <div>
        <div className="flex flex-col items-center justify-center z-[10000]">
            <div className="flex flex-col bg-white-100 rounded-lg w-96 p-6">
                <p className="text-xl font-black ">Enter Price in <span className="text-teal-600">TAREA</span></p>
                <input onChange={(e) => setPrice(Number(e.target.value))} value={price} className="px-4 py-3 rounded-lg outline-none border-[1px] border-gray-300 mt-4" type="number" step="0.1" placeholder="0.0" />
                <button onClick={handleSubscribe} className="bg-teal-400 hover:bg-teal-600 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer mt-4">Set Price</button>
            </div> 
        </div> 
    </div>
  )
}

export default PaymentModel
