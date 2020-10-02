const Restrain = require('../index')

function debounceTest() {
	let interval, index = 0
	const { debounce } = new Restrain()

	interval = setInterval(async() => {
		console.log(index++)

		/**
		 * After not being called for delayed-duration, execute given function
		 */
		debounce(() => console.log('first execution'), 1000 )

		if(index === 20) clearInterval(interval)
	}, 100)
}

throttleTest()
async function throttleTest() {
	let index = 0
	let interval
	const { throttle } = new Restrain()

	interval = setInterval(async() => {
		if(index === 20) clearInterval(interval)
		console.log(index++)

		/**
		 * After delayed-duration, execute given function
		 */
		throttle(() => console.log('execution'), 1000)
	}, 200)
}