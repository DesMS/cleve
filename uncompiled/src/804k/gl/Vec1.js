class Vec1 {
	#x = 0;
	set x(x = 0) {
		x = parseFloat(x);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#x = x;
		return;
	};
	set pos(pos = [
		0
	]) {
		x = parseFloat(x);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			x = 0;
		}
		this.#x = x;
		return;
	};
	get x(){return this.#x;};
	get pos(){return [this.#x];};
	translate(x = 0) {
		var ex;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
		} else {
			ex = parseFloat(x);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		this.#x += ex;
		return;
	}
	add(vec = new Vec1(0)) {
		this.#x += vec.x;
		return;
	}
	constructor(x = 0) {
		var ex = 0;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
		} else {
			ex = parseFloat(x);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		this.#x = ex;
		return;
	}
}