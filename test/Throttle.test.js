const Throttle = require('../modules/Throttle')

describe('Throttle process', () => {
	test('unconfigured', async() => {
		expect(
			await testEnvironment()
		).toBe(
			'1 execution 2 3 4 5 6 7 8 9 10 11 12 13 14 execution 15 16 17 18 19 20 21 22 23 24 25 26 27 28 execution 29 30'
		)
	})

	function testEnvironment(config) {
		return new Promise(resolve => {
			let index = 1
			let arr = []
			let interval
			const throttle = (new Throttle()).process

			interval = setInterval(() => {
				arr.push(index++)

				/**
				 * After delayed-duration, execute given function
				 */
				throttle(() => arr.push('execution'), 1000, config)

				if(index === 31) {
					clearInterval(interval)
					resolve(arr.join(' '))
				}
			}, 75)
		})
	}
})
