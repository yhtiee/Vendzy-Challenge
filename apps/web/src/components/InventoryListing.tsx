'use client';
import { Package, AlertCircle } from 'lucide-react';
import { useGetInventory } from '../api/inventory/hooks/queries/useInventory';
import { InventoryComponent } from './Inventory';

export function InventoryListingComponent() {
    const { data: products, isLoading, error } = useGetInventory();

    const allProducts = products?.data || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-zinc-200 p-6 h-[380px] animate-pulse flex flex-col">
                        <div className="flex justify-between mb-6">
                            <div className="w-12 h-12 bg-zinc-100 rounded-xl" />
                            <div className="w-16 h-4 bg-zinc-100 rounded" />
                        </div>
                        <div className="h-6 bg-zinc-100 rounded w-3/4 mb-3" />
                        <div className="h-8 bg-zinc-100 rounded w-1/3 mb-auto" />
                        <div className="h-12 bg-zinc-100 rounded-lg w-full mt-4" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-zinc-500">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Connection Lost</h3>
                <p className="text-sm">Failed to load live inventory. Please reload or try again later</p>
            </div>
        );
    }

    if (allProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-zinc-500 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                <div className="bg-zinc-100 p-4 rounded-full mb-4">
                    <Package className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">Inventory Empty</h3>
                <p className="text-sm max-w-xs text-center mt-1">
                    All items have been claimed or the event hasn't started yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product: any) => (
                <InventoryComponent key={product.productId} product={product} />
            ))}
        </div>
    );
}