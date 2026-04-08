import { NextResponse } from 'next/server';
import yahooFinanceModule from 'yahoo-finance2';

// In some module resolution setups, the default export is .default
const YahooFinance = yahooFinanceModule.default || yahooFinanceModule;
const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const period2 = new Date();
    const period1 = new Date();
    period1.setFullYear(period1.getFullYear() - 1);
    const queryOptions = { period1, period2, interval: '1d' };

    const [mstrData, btcData] = await Promise.all([
      yahooFinance.chart('MSTR', queryOptions),
      yahooFinance.chart('BTC-USD', queryOptions)
    ]);

    const mstrBtcHoldings = 214400; 
    const mstrSharesOutstanding = 177000000; 

    const btcMap = new Map();
    btcData.quotes.forEach(item => {
      btcMap.set(item.date.toISOString().split('T')[0], item.close);
    });

    const result = mstrData.quotes.map(mstrDay => {
      const dateKey = mstrDay.date.toISOString().split('T')[0];
      const btcPrice = btcMap.get(dateKey);
      
      if (!btcPrice) return null;

      const navTotal = mstrBtcHoldings * btcPrice;
      const navPerShare = navTotal / mstrSharesOutstanding;
      const premium = ((mstrDay.close - navPerShare) / navPerShare) * 100;

      return { date: dateKey, mstrPrice: mstrDay.close, btcPrice, navPerShare, premium };
    }).filter(item => item !== null);

    return NextResponse.json(result);
  } catch (error) {
    const errObj = error instanceof Error ? error.stack : String(error);
    require('fs').writeFileSync('api-error.log', errObj);
    return NextResponse.json({ error: 'Failed to fetch financial data' }, { status: 500 });
  }
}
