import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../assets/Cart.jsx'
import { useCart } from './CartContext'
export default function Navbar() {
    const [cartQuantity, setCartQuantity] = useState(0);
    const {cartState} = useCart();
    useEffect(() => {
        let tot = 0;
        for(let item of cartState.cart) {
            tot += item.quantity;
        }
        setCartQuantity(tot);
    }, [cartState]);
    return (
        <>
            <nav className="bg-zinc-800 px-10 p-4 flex justify-between items-center rounded-full sticky right-0 left-0 top-2 mx-2 z-10" style={{ boxShadow: '0 -12px 6px -1px #FFFFFF, 0 -12px 6px -1px #FFFFFF' }}>
                <Link to='/' className='text-white '><h1 className="text-white font-bold italic"> Shop In</h1></Link>
                <Link to='/cart' className='text-white relative hover:scale-105 ease-in-out duration-300'>
                    <Cart color={'white'} size={'size-9'}/>
                    <div className='px-[7px] py-[2px] border-4 border-zinc-800 font-bold rounded-full text-[10px] absolute bg-red-500 -top-3 -right-3'>{cartQuantity}</div>
                </Link>
            </nav>
        </>
    )
}
