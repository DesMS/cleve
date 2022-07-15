class Camera extends Mat4 {
	#x = 0;
	#y = 0;
	#z = 0;
	#cx = 0;
	#cy = 0;
	#cz = 0;
	#pcx = 0;
	#pcy = 0;
	#pcz = 0;
	#fov = 70.0;
	#near = 0.0;
	#far = 100.0;
	get cx() {
		return this.#cx;
	}
	get cy() {
		return this.#cy;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get z() {
		return this.#z;
	}
	camRotateX(deg) {
		this.#cx += deg;
		if (this.#cx < -90) {
			this.#cx = -90;
		} else if (this.#cx > 90) {
			this.#cx = 90;
		}
	}
	camRotateY(deg) {
		this.#cy += deg;
	}
	camRotateZ(deg) {
		this.#cz += deg;
	}
	camResetX(deg) {
		this.#pcx = this.#cx;
		this.#cx = deg;
	}
	camResetY(deg) {
		this.#pcy = this.#cy;
		this.#cy = deg;
	}
	camResetZ(deg) {
		this.#pcz = this.#cz;
		this.#cz = deg;
	}
	camSaveX() {
		this.#pcx = this.#cx;
	}
	camSaveY() {
		this.#pcy = this.#cy;
	}
	camSaveZ() {
		this.#pcz = this.#cz;
	}
	camRestoreX() {
		this.#cx = this.#pcx;
	}
	camRestoreY() {
		this.#cy = this.#pcy;
	}
	camRestoreZ() {
		this.#cz = this.#pcz;
	}
	camTranslate(pos = new Vec3(0, 0, 0)) {
		this.#x += pos.x;
		this.#y += pos.y;
		this.#z += pos.z;
	}
	get camMatrix() {
		this.calculate();
		return this.Matrix;
	}
	camReset() {
		var f = 1.0 / Math.tan(this.#fov / 2),
			nf = 1 / (this.#near - this.#far);
		this.set(0, f / (Minecraft.width / Minecraft.height));
		this.set(1, 0);
		this.set(2, 0);
		this.set(3, 0);
		this.set(4, 0);
		this.set(5, f);
		this.set(6, 0);
		this.set(7, 0);
		this.set(8, 0);
		this.set(9, 0);
		this.set(10, (this.#far + this.#near) * nf);
		this.set(11, -1);
		this.set(12, 0);
		this.set(13, 0);
		this.set(14, (2 * this.#far * this.#near) * nf);
		this.set(15, 0);
		return;
	}
	calculate() {
		this.camReset();
		this.rotateX(this.#cx);
		this.rotateY(this.#cy);
		this.rotateZ(this.#cz);
		this.translate(new Vec3(this.#x, this.#y - 1.72, this.#z));
		return;
	}
	constructor(pos = undefined, fov = 70.0, near = 0.0, far = 100.0) {
		super();
		fov = parseFloat(fov);
		near = parseFloat(near);
		far = parseFloat(far);
		if (isNaN(fov)) {
			console.warn(`Fov is NOT valid, setting to default.`);
			fov = 70.0;
		}
		if (isNaN(near)) {
			console.warn(`Near is NOT valid, setting to default.`);
			near = 0.0;
		}
		if (isNaN(far)) {
			console.warn(`Far is NOT valid, setting to default.`);
			far = 100.0;
		}
		fov = fov * (Math.PI / 180);
		var f = 1.0 / Math.tan(fov / 2),
			nf = 1 / (near - far);
		this.set(0, f / (Minecraft.width / Minecraft.height));
		this.set(1, 0);
		this.set(2, 0);
		this.set(3, 0);
		this.set(4, 0);
		this.set(5, f);
		this.set(6, 0);
		this.set(7, 0);
		this.set(8, 0);
		this.set(9, 0);
		this.set(10, (far + near) * nf);
		this.set(11, -1);
		this.set(12, 0);
		this.set(13, 0);
		this.set(14, (2 * far * near) * nf);
		this.set(15, 0);
		if (pos instanceof Vec3) {
			this.#x = pos.x;
			this.#y = pos.y;
			this.#z = pos.z;
		}
		this.#far = far;
		this.#near = near;
		this.#fov = fov;
		return;
	}
}