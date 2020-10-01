export default function Restrain() {

	let debounceTimer
	this.debounce = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {
			
			clearTimeout(debounceTimer)
			if(cancel) reject('function canceled')
			
			debounceTimer = setTimeout(() => {
				func()
				resolve('function fired')
			}, delay )

		})
	}

	
	let throttleTimer
	let init = true
	this.throttle = (func, delay, cancel) => {
		return new Promise(resolve => {

			if(cancel) throttleTimer = undefined
			if(throttleTimer) return
			if(init) {
				init = false
				func()
				resolve('function fired')
			}
			this.debounce(() => init = true, delay)

			throttleTimer = setTimeout(() => {
				func()
				throttleTimer = undefined
				resolve('function fired')
			}, delay)
		})
	}
}


function debounceTest() {
	let index = 0
	let interval
	const { debounce } = new Restrain()

	interval = setInterval(async() => {

		index++
		console.log(index)

		debounce(() => {
			console.log('first fire')
		}, 1000 ).then(()=>console.log('then fire'))

		if(index === 50) clearInterval(interval)
	}, 10)
}
async function throttleTest() {
	let index = 0
	let interval
	const { throttle } = new Restrain()

	interval = setInterval(async() => {

		if(index === 100) clearInterval(interval)
		index++
		console.log(index)

		const t = await throttle(() => {}, 1000)

		console.log(t)
	}, 50)
}