# What is this?

A function [Restrain](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L1) containing two restrictive Promise-based functions: [debounce](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L4) and [throttle](https://github.com/EmilEinarsen/bjork_restrain/blob/330d8e45f9078e65e4f1c62e4d743c591670a583/Restrain.js#L21). These utilize __setInterval__ and __clearInterval__ too restrict rapid function execution.


## Install
Use npm to install Restrain.

```bash
> npm i bjork_restrain
```


## Usage
In essence, throttle creates ripples of function executions, contrasting debounce which cancels them until left idle.
```js
import Restrain from 'bjork_restrain'
const { debounce, throttle } = new Restrain()

debounce(func, delay)
throttle(func, delay)
```
<br>

### Debounce
Delay execution of _func_ (function) until **idle** for the duration of _delay_ (ms).

>**Cancel** <br>
In addition to __func__ and __delay__ a third param, __cancel__ (bool), can be passed. Resulting in debouncing __func__ never being executed.

>**Promise** <br>
After successfully execution or cancelation, decounce resolves with a corresponding message.<br>

#### Test
Simulates a static spamming situation. For example, button spamming.
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


### Throttle
Restrain execution of _func_ (function) to one every _delay_ (ms).

>**Cancel**<br>
In addition to __func__ and __delay__ a third param, __cancel__ (bool), can be passed. 
Effectivly, canceling current timeout, allowing it to be replaced.

>**Promise**<br>
After successfully executing __func__, throttle resolves with a message.<br>

#### Test
Simulates a static spamming situation. For example, event listing to scroll or resize.
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