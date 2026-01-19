import { InventoryListingComponent } from "../src/components/InventoryListing";
import { SeedInventory } from "../src/components/SeedInventory";

export default function FlashSalePage() {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200/60 pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                  Live Event
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
                Vendzy Flash Sale
              </h1>
              <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                Real-time inventory reservation. Secure your items before they vanish.
              </p>
            </div>
            
            <div className="flex items-center">
              <SeedInventory />
            </div>
          </header>

          <main>
            <InventoryListingComponent />
          </main>
        </div>
      </div>
    );
}