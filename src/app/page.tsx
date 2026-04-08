import PremiumChart from '@/components/PremiumChart';
import AISummary from '@/components/AISummary';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-8 text-black">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 mb-8 mt-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          DAT.co Indicator Dashboard
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center px-4">
          Tracking the <span className="font-semibold text-orange-600">Premium to NAV (Net Asset Value)</span> for MicroStrategy (MSTR) compared to Bitcoin (BTC).
        </p>
        <hr className="my-8 border-gray-200" />
        <div className="w-full">
          <PremiumChart />
        </div>
      </div>
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 mb-12 border-l-[6px] border-indigo-400">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">AI-Generated Insights (Bonus)</h2>
        <AISummary />
      </div>
    </main>
  );
}
