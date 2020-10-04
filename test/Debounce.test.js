const Debounce = require('../modules/Debounce')

describe('Debounce process', () => {
	test('unconfigured', async() => {
		expect(
			await testEnvironment()
		).toBe(
			'1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 execution'
		)
	})

	function testEnvironment(config) {
		return new Promise(resolve => {
			let index = 1
			let arr = []
			let interval
			const debounce = (new Debounce()).process

			interval = setInterval(() => {
				arr.push(index++)

				/**
				 * After delayed-duration, execute given function
				 */
				debounce(() => arr.push('execution'), 15, config)

				if(index === 21) {
					clearInterval(interval)
					
					setTimeout(() => resolve(arr.join(' ')), 100)
				}
			}, 10)
		})
	}
})
