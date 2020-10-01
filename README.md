# What is this?

A function [Restrain](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L1) containing two restrictive Promise-based functions: [debounce](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L4) and [throttle](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L21). These utilizes __setInterval__ and __clearInterval__ too restrict rapide execution of a given function.

## Install
Use npm to install Restrain

```bash
npm i bjork_restrain
```

## Usage
```js
import Restrain from 'bjork_restrain'
const { debounce, throttle } = new Restrain()

debounce(func, delay)
throttle(func, delay)
```

#### Debounce
Delay execution of _func_ (function) until **idle** for the _delay_ (ms).

>**Cancel**
Inaddition to __func__ and __delay__ a third param, __cancel__ (bool), can be pased. Resulting in __func__ never being executed.
***

>**Promise:**
After successfully function call or cancelation, debounce returns a corresponding Promise.
***

```js
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
```

#### Throttle
Restrain execution of _func_ (function) too one every _delay_ (ms).

>**Cancel**
Inaddition to __func__ and __delay__ a third param, __cancel__ (bool), can be pased. Resulting __func__ being forcefully executed.
***

>**Promise:**
After successfully executing __func__ or cancelation, throttle returns a corresponding Promise.
***

```js
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
```