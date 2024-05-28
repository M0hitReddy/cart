import React, { useEffect, useMemo, useState } from 'react'
import items from '../assets/dummy';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Spinner from '../assets/Spinner.jsx';
function Products() {
    const [products, setProducts] = useState(null);
    const { cartState, cartDispatch } = useCart();
    const [something, setSomething] = useState(false);
    const [adding, setAdding] = useState(
        // cartState.cart.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
        // products.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
        {}
    );
    // console.log(adding);
    useEffect(() => {
        // const res = useMemo(() => {
            // Imagine this computation is expensive
            const fetchData = async () => {
                const res = await items();
                // console.log(res);
                setProducts(res);
            }
            fetchData();
            // const res = await items().map(item => ({ ...item }));
        // }, [items]);
    }, []);
    useEffect(() => {
        if (!products) return;
        setAdding(products.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}));
    },[products]);
    const handleAddToCart = (item) => {
        // console.log("Add to cart");
        // const item = e.target.item;
        // setAdding(true);
        if (adding[item.id] || something) return;
        setAdding({ ...adding, [item.id]: true });
        setSomething(true);
        console.log(item);
        setTimeout(() => {
            cartDispatch({ type: "ADD_ITEM", payload: { ...item, checked: true, quantity: 1 } });
            setAdding({ ...adding, [item.id]: false });
            setSomething(false);
        }, 1000);
        // cartDispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
    }
    useEffect(() => {
        console.log(cartState);
    }, [cartState]);
    return (
        <>
            {/* <Link to='/cart' className='bg-zinc-800 text-white p-2 rounded-lg'>Go to cart</Link> */}
            <section className='p-2 flex flex-col gap-6 sm:mx-10 w-max sm:w-auto m-auto mt-5'>

                <h1 className='font-bold text-2xl'>Products</h1>
                <div className='grid max-[400px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-6 '>
                    {products != null ? products.map((item, index) => (
                        <div key={item.id} className={`max-[400px]:w-[90vw] sm:w-auto border border-gray-400 rounded-xl hover:scale-105 duration-300 ease-in-out`}>
                            <img src={item.image} alt={item.name} className='h-[14rem] w-full object-cover rounded-tl-xl rounded-tr-xl' />
                            <div className='p-2 flex flex-col gap-6'>
                                <div className='flex justify-between'>
                                    <span className='text-lg italic font-bold'>{item.name}</span>
                                    <span>${item.price}</span>
                                </div>

                                <button item={item} className={`bg-zinc-${adding[item.id] ? '600' : '800'} px-2 py-1 rounded-lg text-white hover:bg-zinc-700 hover:scale-105 duration-300 ease-in-out`} onClick={() => handleAddToCart(item)}>
                                    {adding[item.id] ? <Spinner /> : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                    )) : <Spinner />}
                    {/* <div className='justify-self-start'>njbh</div> */}
                </div>
            </section>
        </>
    )
}

export default Products