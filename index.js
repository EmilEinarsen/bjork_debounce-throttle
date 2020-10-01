function Restrain() {
	let timer
	this.debounce = (func, delay, cancel) => {
		return new Promise((resolve, reject) => {
			
			clearTimeout(timer)
			if(cancel) reject('function canceled')
			
			timer = setTimeout(() => {
				func()
				resolve('function fired')
			}, delay )

		})
	}
	this.throttle = (func, delay, cancel) => {
		return new Promise(resolve => {

			if(cancel) timer = undefined
			if(timer) return

			timer = setTimeout(() => {
				func()
				timer = undefined
				resolve('function fired')
			}, delay)

		})
	}
}

/* 
debounceTest()
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
} */


/* throttleTest()
async function throttleTest() {
	let index = 0
	let interval
	const { throttle } = new Restrain()
	interval = setInterval(async() => {
		if(index === 100) clearInterval(interval)
		index++
		console.log(index)
		const t = await throttle.run(() => {}, 1000)
		console.log(t)
	}, 50)
} */