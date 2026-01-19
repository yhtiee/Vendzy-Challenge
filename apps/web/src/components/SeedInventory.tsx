'use client';
import { Database, RefreshCcw } from 'lucide-react';
import { useSeedInventory } from '../api/inventory/hooks/mutations/useManageInventory';

export function SeedInventory() {
    const seed = useSeedInventory()

    const handleSeed = async () => {
        seed.mutate();
    };

    return (
        <button
            onClick={handleSeed}            
            disabled={seed.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm disabled:opacity-50 hover:cursor-pointer"
        >
            <RefreshCcw size={16} className={seed.isPending ? 'animate-spin' : ''} />
            {seed.isPending ? 'Seeding...' : 'Seed Inventory'}
        </button>
    );
}