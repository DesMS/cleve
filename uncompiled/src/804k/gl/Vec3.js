class Vec3 {
	#x = 0;
	#y = 0;
	#z = 0;
	set x(x = 0) {
		x = parseFloat(x);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#x = x;
		return;
	};
	set y(y = 0) {
		y = parseFloat(y);
		if (isNaN(y)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#y = y;
		return;
	};
	set z(z = 0) {
		z = parseFloat(z);
		if (isNaN(z)) {
			console.warn(`X is not a <valid> number`);
			return;
		}
		this.#z = z;
		return;
	};
	set pos(pos = [
		0,
		0,
		0
	]) {
		x = parseFloat(x);
		y = parseFloat(y);
		z = parseFloat(z);
		if (isNaN(x)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			x = 0;
		}
		if (isNaN(y)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			y = 0;
		}
		if (isNaN(z)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			z = 0;
		}
		this.#x = x;
		this.#y = y;
		this.#z = z;
		return;
	};
	get x(){return this.#x;};
	get y(){return this.#y;};
	get z(){return this.#z;};
	get pos(){return [this.#x,this.#y,this.#z];};
	translate(x = 0, y = 0, z = 0) {
		var ex;
		var ey;
		var ez;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
			ez = parseFloat(x[2]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
			ez = parseFloat(z);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		if (isNaN(ez)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			ez = 0;
		}
		this.#x += ex;
		this.#y += ey;
		this.#z += ez;
		return;
	}
	add(vec = new Vec3(0, 0, 0)) {
		this.#x += vec.x;
		this.#y += vec.y;
		this.#z += vec.z;
		return;
	}
	constructor(x = 0, y = 0, z = 0) {
		var ex = 0;
		var ey = 0;
		var ez = 0;
		if (typeof x == `object`) {
			ex = parseFloat(x[0]);
			ey = parseFloat(x[1]);
			ez = parseFloat(x[2]);
		} else {
			ex = parseFloat(x);
			ey = parseFloat(y);
			ez = parseFloat(z);
		}
		if (isNaN(ex)) {
			console.warn(`X is not a <valid> number, setting to default.`);
			ex = 0;
		}
		if (isNaN(ey)) {
			console.warn(`Y is not a <valid> number, setting to default.`);
			ey = 0;
		}
		if (isNaN(ez)) {
			console.warn(`Z is not a <valid> number, setting to default.`);
			ez = 0;
		}
		this.#x = ex;
		this.#y = ey;
		this.#z = ez;
		return;
	}
}