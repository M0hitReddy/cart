import React, { useEffect } from 'react'
import { useCart } from './CartContext';
import Delete from '../assets/Delete.jsx';
import Plus from '../assets/Plus.jsx';
import Minus from '../assets/Minus.jsx';
import Tick from '../assets/Tick.jsx';
function Cart() {
    // const items = [
    //     { id: 1, name: "Item 1", price: 100 },
    //     { id: 2, name: "Item 2", price: 200 },
    //     { id: 3, name: "Item 3", price: 300 },
    // ];
    const { cartState, cartDispatch } = useCart();
    // console.log(cartState);
    const cartItems = cartState.cart;
    const handlePlusMinus = (item, f) => {
        // f = 0 is  decrement
        // f = 1 is  dincrement
        // f = 2 is  remove_item
        if (f === 0) { 
            if (item.quantity > 1) cartDispatch({ type: 'DECREMENT', payload: item.id });
            else cartDispatch({ type: 'REMOVE_ITEM', payload: item.id });
        }
        else if (f === 1 && item.quantity < 20) {
            cartDispatch({ type: 'INCREMENT', payload: item.id });
        }
        else if (f === 2) {
            cartDispatch({ type: 'REMOVE_ITEM', payload: item.id });
        }
    };
    useEffect(() => {
        console.log(cartState);
    }, [cartState]);
    return (
        <>
            <section className='p-2 flex flex-col gap-6 mx-2 sm:mx-10 md:mx-20 mt-3'>
                <h1 className='font-bold text-2xl'>MY CART <span className='text-gray-500'>{`(${cartState.totQuantity})`}</span></h1>
                <div className='lg:w-1/2 md:w-[75%] sm:w-full flex flex-col  gap-6 bg-gry-500 sm:h-screen sm:overflow-y-auto sm:pr-2'>
                    {cartState.cart.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className='flex gap-3 w-full  m-aut'>
                                <div><img src={item.image} alt="" className='min-h-[8rem] sm:h-[14rem] w-full sm:w-[18rem] object-cover object-center rounded-lg' /></div>
                                <div className='flex-grow flex flex-col justify-between gap-4'>
                                    <div className='flex justify-between align-top'>
                                        <div className='flex flex-col gap-3 justify-between'>
                                            <div className='text-3xl italic font-bold'>{item.name}</div>
                                            <div>Price : ${item.price}</div>
                                            <div>Quantity: {item.quantity}</div>
                                            <div>Subtotal: ${item.price * item.quantity}</div>
                                            {/* <button className='w-max rounded-full h-full max-[440px]:px-2 hover:bg-gray-200 p-2' onClick={() => handlePlusMinus(item, 0)}>
                                            <Delete color={'#ac3131'}/> 
                                        </button> */}
                                        </div>
                                        <div className='flex gap-2 flex-col  items-center py-2'>
                                            <input type="checkbox" className='hidden'/>
                                            <button className={`bg-${(!item.checked) ? 'white' : 'black'} h-5 w-5 rounded-[1px] border-2 border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black`} onClick={() => cartDispatch({type:'CHECK_ITEM', payload:item.id})}><Tick color={`white`}/><Tick color={'white'}/></button>
                                            <button className='w-max rounded-full max-[440px]:px-2 hover:bg-gray-200 p-2' onClick={() => handlePlusMinus(item, 2)}>
                                                <Delete color={'#ac3131'} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* <div className='flex justify-between'>
                                        <div>Quantity: {item.quantity}</div>
                                        <div>Subtotal: ${item.price * item.quantity}</div>
                                    </div> */}
                                    <div item={item} className='bg-zinc-800 rounded-full w-full flex justify-between text-white' >
                                        <span><button className='px-8 border-e py-1 h-full max-[440px]:px-2' onClick={() => handlePlusMinus(item, 0)}>
                                            {item.quantity === 1 ? <Delete color={'white'} /> : <Minus />}
                                        </button></span>
                                        <span className='py-1 w-max px-2'>Qty: {item.quantity}</span>
                                        <span><button className='px-8 border-s py-1 h-full max-[440px]:px-2' onClick={() => handlePlusMinus(item, 1)}>
                                            <Plus color={item.quantity === 20 ? 'gray' : 'white'} />
                                        </button></span>

                                    </div>
                                </div>
                            </div>
                            <hr className='w-full my-4' />
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Cart;