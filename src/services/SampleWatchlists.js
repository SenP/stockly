import { Stock, Watchlist } from './watchlistModel';

export default [
	//#1
	Object.assign(new Watchlist(), {
		id: 1,
		name: 'Technology',
		description: 'technology stocks',
		owner: 'sample',
		stocks: [
			Object.assign(new Stock(), {
				code: 'GOOGL:NASDAQ',
				name: 'Google Inc.',
				unitsOwned: 100,
				avgPrice: 700
			}),
			Object.assign(new Stock(), {
				code: 'MSFT:NASDAQ',
				name: 'Microsoft Corp.',
				unitsOwned: 300,
				avgPrice: 52
			}),
			Object.assign(new Stock(), {
				code: 'AMZN:NASDAQ',
				name: 'Amazon Inc.',
				unitsOwned: 50,
				avgPrice: 750
			}),
			Object.assign(new Stock(), {
				code: 'AAPL:NASDAQ',
				name: 'Apple Inc.',
				unitsOwned: 200,
				avgPrice: 130
			})
		]
	}),

	//#2
	Object.assign(new Watchlist(), {
		id: 2,
		name: 'Financials',
		description: 'Financial stocks',
		owner: 'sample',
		stocks: [
			Object.assign(new Stock(), {
				code: 'BAC:NYSE',
				name: 'Bank of America',
				unitsOwned: 500,
				avgPrice: 13
			}),
			Object.assign(new Stock(), {
				code: 'WFC:NYSE',
				name: 'Wells Fargo',
				unitsOwned: 200,
				avgPrice: 46
			}),
			Object.assign(new Stock(), {
				code: 'JPM:NYSE',
				name: 'J P Morgan Chase',
				unitsOwned: 400,
				avgPrice: 60
			})
		]
	}),

	//3rd
	Object.assign(new Watchlist(), {
		id: 3,
		name: 'Telecom',
		description: 'Telecommunications Services',
		owner: 'sample',
		stocks: [
			Object.assign(new Stock(), {
				code: 'T:NYSE',
				name: 'AT&T',
				unitsOwned: 300,
				avgPrice: 40
			}),
			Object.assign(new Stock(), {
				code: 'VZ:NYSE',
				name: 'Verizon',
				unitsOwned: 200,
				avgPrice: 55
			}),
			Object.assign(new Stock(), {
				code: 'VOD:NASDAQ',
				name: 'Vodafone',
				unitsOwned: 400,
				avgPrice: 27
			})
		]
	})
];
