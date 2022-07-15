class Key {
	static #keys = {};
	static addKey(num, callback) {
		num = parseInt(num);
		if (isNaN(num)) {
			console.error(`Num must be a number.`);
			return;
		}
		if (typeof callback != `function`) {
			console.error(`Callback must be a function.`);
			return;
		}
		this.#keys[num] = {
			a: undefined,
			b: callback
		};
		return;
	}
	static init() {
		document.addEventListener(`keydown`, (e) => {
			e.preventDefault();
			var a = e.keyCode;
			var b = this.#keys[a];
			if (b != undefined && b != null) {
				if (b[`a`] == undefined) {
					b[`a`] = setInterval(b[`b`], 1);
				}
			}
		});
		document.addEventListener(`keyup`, (e) => {
			e.preventDefault();
			var a = e.keyCode;
			var b = this.#keys[a];
			if (b != undefined && b != null) {
				clearInterval(b[`a`]);
				b[`a`] = undefined;
			}
		});
	}
}