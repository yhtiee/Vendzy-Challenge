'use client';
import { useState, useEffect } from 'react';
import { Package, ShoppingCart, Zap, Check, Loader2 } from 'lucide-react';
import { useCreateOrder } from '../api/orders/hooks/mutations/useManageOrders';
import { createOrderSchema } from '../api/orders/validation';
import { ZodError } from 'zod';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  stock: number;
}

export function InventoryComponent({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const createOrder = useCreateOrder();
    const isOutOfStock = product.stock <= 0;
    const isLowStock = !isOutOfStock && product.stock < 10;

    // Reset quantity when stock changes or order succeeds
    useEffect(() => {
        if (createOrder.isSuccess) {
            setQuantity(1);
        }
    }, [createOrder.isSuccess]);

    const handleCreateOrder = async () => {
        try {
            setErrors({});
            const orderData = {
                productId: product.id,
                quantity,
                userId: 'user-123', // Mock user id since no auth used
            };
            
            // Validate data
            createOrderSchema.parse(orderData);
            
            // If validation passes, mutate
            createOrder.mutate(orderData as any);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    const path = err.path.join('.');
                    formattedErrors[path] = err.message;
                });
                setErrors(formattedErrors);
                toast.error('Please check the form for errors');
            }
        }
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        }
    }

    return (
        <div className={`group relative bg-white p-6 rounded-xl border transition-all duration-300 flex flex-col ${
            isOutOfStock 
                ? 'border-zinc-100 opacity-60 grayscale' 
                : 'border-zinc-200 hover:border-zinc-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-indigo-500/20'
        }`}>

            {isOutOfStock && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-xl pointer-events-none">
                    <span className="bg-zinc-900 text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-xl transform -rotate-12 border-2 border-white">
                        OUT OF STOCK
                    </span>
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl transition-colors ${isOutOfStock ? 'bg-zinc-100 text-zinc-400' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'}`}>
                    <Package size={24} strokeWidth={1.5} />
                </div>
                <div className="text-right">
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Price</p>
                    <p className="text-lg font-bold text-zinc-900">$99.00</p>
                </div>
            </div>

            <div className="mb-auto">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-1 tracking-tight">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                    {isLowStock && <Zap size={16} className="text-amber-500 fill-amber-500 animate-pulse" />}
                    <p className={`text-2xl font-mono font-bold tracking-tight ${isLowStock ? 'text-amber-600' : 'text-zinc-900'}`}>
                        {product.stock}
                        <span className="text-sm font-sans font-medium text-zinc-400 ml-1.5">units left</span>
                    </p>
                </div>

                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-6">
                    <div 
                        className={`h-full rounded-full transition-all duration-500 ${isLowStock ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="space-y-3 mt-4">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Quantity
                </label>
                <input
                    type="number"                    
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={isOutOfStock}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
                {errors.quantity && (
                    <p className="text-rose-500 text-xs font-medium mt-1">{errors.quantity}</p>
                )}

                <button
                    onClick={() => handleCreateOrder()}                
                    disabled={isOutOfStock || createOrder.isPending }
                    className={`w-full relative overflow-hidden py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:cursor-pointer bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20 active:scale-[0.98] disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none disabled:pointer-events-none`}
                >
                    {createOrder.isPending && <Loader2 size={18} className="animate-spin text-zinc-400" />}
                    {!createOrder.isPending && <ShoppingCart size={18} />}
                    <span>
                        {createOrder.isPending ? 'Processing...' : isOutOfStock ? 'Sold Out' : 'Buy Now'}
                    </span>
                </button>
            </div>
        </div>
    );
}