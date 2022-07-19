class Mouse {
	static #x = 0;
	static #y = 0;
	static get x() {
		return this.#x;
	}
	static get y() {
		return this.#y;
	}
	static click(callback) {
		if (typeof callback != `function`) {
			console.warn(`Callback must be a function.`);
			return;
		}
		var timer = undefined;
		document.addEventListener(`mousedown`, () => {
			if (timer == undefined) {
				timer = setInterval(callback, 1);
			}
		});
		document.addEventListener(`mouseup`, () => {
			if (timer != undefined) {
				clearInterval(timer);
				timer = undefined;
			}
		});
	}
	static move(callback) {
		if (typeof callback != `function`) {
			console.warn(`Callback must be a function.`);
			return;
		}
		document.addEventListener(`mousemove`, callback);
		return;
	}
	static init() {
		document.addEventListener(`mousemove`, e => {
			this.#x = e.x == undefined ? this.#x : e.x;
			this.#y = e.y == undefined ? this.#y : e.y;
		});
		return;
	}
}