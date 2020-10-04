const Iteration = require('../modules/Iteration')

describe('Iterations process', () => {
	test('unconfigured', async() => {
		expect(
			await testEnvironment()
		).toBe(
			'1 execution 2 3 4 5 execution 6 7 8 9 10 execution 11 12 13 14 15 execution 16 17 18 19 20 execution'
		)
	})

	function testEnvironment(config) {
		return new Promise(resolve => {
			let index = 1
			let arr = []
			let interval
			const iteration = (new Iteration()).process

			interval = setInterval(() => {
				arr.push(index++)

				/**
				 * After delayed-duration, execute given function
				 */
				iteration(() => arr.push('execution'), 5, config)

				if(index === 21) {
					clearInterval(interval)
					resolve(arr.join(' '))
				}
			}, 10)
		})
	}
})
