class Mat4 {
	#mat = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
	get Matrix() {
		return this.#mat;
	}
	set(p, n) {
		n = parseFloat(n);
		p = parseInt(p);
		if (isNaN(n)) {
			console.error(`N must be a number.`);
			return;
		}
		if (isNaN(p)) {
			console.error(`P must be a number.`);
			return;
		}
		if (p > 15 || p < 0) {
			console.error(`P must be inbetween 0 and 15.`);
			return;
		}
		this.#mat[p] = n;
	}
	translate(pos = new Vec3(0, 0, 0)) {
		if (!(pos instanceof Vec3)) {
			console.error(`Pos is not a Vec3.`);
			return;
		}
		this.#mat[12] = this.#mat[0] * pos.x + this.#mat[4] * pos.y + this.#mat[8] * pos.z + this.#mat[12];
		this.#mat[13] = this.#mat[1] * pos.x + this.#mat[5] * pos.y + this.#mat[9] * pos.z + this.#mat[13];
		this.#mat[14] = this.#mat[2] * pos.x + this.#mat[6] * pos.y + this.#mat[10] * pos.z + this.#mat[14];
		this.#mat[15] = this.#mat[3] * pos.x + this.#mat[7] * pos.y + this.#mat[11] * pos.z + this.#mat[15];
		return;
	}
	rotateX(degree = 0) {
		degree = parseInt(degree);
		if (isNaN(degree)) {
			console.error(`Degree is not a number.`);
			return;
		}
		degree = degree * (Math.PI / 180);
		var s = Math.sin(degree),
			c = Math.cos(degree),
			a10 = this.#mat[4],
			a11 = this.#mat[5],
			a12 = this.#mat[6],
			a13 = this.#mat[7],
			a20 = this.#mat[8],
			a21 = this.#mat[9],
			a22 = this.#mat[10],
			a23 = this.#mat[11];
		this.#mat[4] = a10 * c + a20 * s;
		this.#mat[5] = a11 * c + a21 * s;
		this.#mat[6] = a12 * c + a22 * s;
		this.#mat[7] = a13 * c + a23 * s;
		this.#mat[8] = a20 * c - a10 * s;
		this.#mat[9] = a21 * c - a11 * s;
		this.#mat[10] = a22 * c - a12 * s;
		this.#mat[11] = a23 * c - a13 * s;
		return;
	}
	rotateY(degree = 0) {
		degree = parseInt(degree);
		if (isNaN(degree)) {
			console.error(`Degree is not a number.`);
			return;
		}
		degree = degree * (Math.PI / 180);
		var s = Math.sin(degree),
			c = Math.cos(degree),
			a00 = this.#mat[0],
			a01 = this.#mat[1],
			a02 = this.#mat[2],
			a03 = this.#mat[3],
			a20 = this.#mat[8],
			a21 = this.#mat[9],
			a22 = this.#mat[10],
			a23 = this.#mat[11];
		this.#mat[0] = a00 * c - a20 * s;
		this.#mat[1] = a01 * c - a21 * s;
		this.#mat[2] = a02 * c - a22 * s;
		this.#mat[3] = a03 * c - a23 * s;
		this.#mat[8] = a00 * s + a20 * c;
		this.#mat[9] = a01 * s + a21 * c;
		this.#mat[10] = a02 * s + a22 * c;
		this.#mat[11] = a03 * s + a23 * c;
		return;
	}
	rotateZ(degree = 0) {
		degree = parseInt(degree);
		if (isNaN(degree)) {
			console.error(`Degree is not a number.`);
			return;
		}
		degree = degree * (Math.PI / 180);
		var s = Math.sin(degree),
			c = Math.cos(degree),
			a00 = this.#mat[0],
			a01 = this.#mat[1],
			a02 = this.#mat[2],
			a03 = this.#mat[3],
			a10 = this.#mat[4],
			a11 = this.#mat[5],
			a12 = this.#mat[6],
			a13 = this.#mat[7];
		this.#mat[0] = a00 * c + a10 * s;
		this.#mat[1] = a01 * c + a11 * s;
		this.#mat[2] = a02 * c + a12 * s;
		this.#mat[3] = a03 * c + a13 * s;
		this.#mat[4] = a10 * c - a00 * s;
		this.#mat[5] = a11 * c - a01 * s;
		this.#mat[6] = a12 * c - a02 * s;
		this.#mat[7] = a13 * c - a03 * s;
		return;
	}
	scale(scale = new Vec3(1, 1, 1)) {
		if (!(scale instanceof Vec3)) {
			console.error(`Scale is not a Vec3.`);
			return;
		}
		this.#mat[0] *= scale.x;
		this.#mat[1] *= scale.x;
		this.#mat[2] *= scale.x;
		this.#mat[3] *= scale.x;
		this.#mat[4] *= scale.y;
		this.#mat[5] *= scale.y;
		this.#mat[6] *= scale.y;
		this.#mat[7] *= scale.y;
		this.#mat[8] *= scale.z;
		this.#mat[9] *= scale.z;
		this.#mat[10] *= scale.z;
		this.#mat[11] *= scale.z;
		return;
	}
	mul(matrix = new Mat4()) {
		if (!(matrix instanceof Mat4)) {
			console.error(`Matrix is not a Mat4.`);
			return;
		}
		this.#mat[0] *= matrix.Matrix[0];
		this.#mat[1] *= matrix.Matrix[1];
		this.#mat[2] *= matrix.Matrix[2];
		this.#mat[3] *= matrix.Matrix[3];
		this.#mat[4] *= matrix.Matrix[4];
		this.#mat[5] *= matrix.Matrix[5];
		this.#mat[6] *= matrix.Matrix[6];
		this.#mat[7] *= matrix.Matrix[7];
		this.#mat[8] *= matrix.Matrix[8];
		this.#mat[9] *= matrix.Matrix[9];
		this.#mat[10] *= matrix.Matrix[10];
		this.#mat[11] *= matrix.Matrix[11];
		this.#mat[12] *= matrix.Matrix[12];
		this.#mat[13] *= matrix.Matrix[13];
		this.#mat[14] *= matrix.Matrix[14];
		this.#mat[15] *= matrix.Matrix[15];
		return;
	}
	div(matrix = new Mat4()) {
		if (!(matrix instanceof Mat4)) {
			console.error(`Matrix is not a Mat4.`);
			return;
		}
		this.#mat[0] /= matrix.Matrix[0];
		this.#mat[1] /= matrix.Matrix[1];
		this.#mat[2] /= matrix.Matrix[2];
		this.#mat[3] /= matrix.Matrix[3];
		this.#mat[4] /= matrix.Matrix[4];
		this.#mat[5] /= matrix.Matrix[5];
		this.#mat[6] /= matrix.Matrix[6];
		this.#mat[7] /= matrix.Matrix[7];
		this.#mat[8] /= matrix.Matrix[8];
		this.#mat[9] /= matrix.Matrix[9];
		this.#mat[10] /= matrix.Matrix[10];
		this.#mat[11] /= matrix.Matrix[11];
		this.#mat[12] /= matrix.Matrix[12];
		this.#mat[13] /= matrix.Matrix[13];
		this.#mat[14] /= matrix.Matrix[14];
		this.#mat[15] /= matrix.Matrix[15];
		return;
	}
	sub(matrix = new Mat4()) {
		if (!(matrix instanceof Mat4)) {
			console.error(`Matrix is not a Mat4.`);
			return;
		}
		this.#mat[0] -= matrix.Matrix[0];
		this.#mat[1] -= matrix.Matrix[1];
		this.#mat[2] -= matrix.Matrix[2];
		this.#mat[3] -= matrix.Matrix[3];
		this.#mat[4] -= matrix.Matrix[4];
		this.#mat[5] -= matrix.Matrix[5];
		this.#mat[6] -= matrix.Matrix[6];
		this.#mat[7] -= matrix.Matrix[7];
		this.#mat[8] -= matrix.Matrix[8];
		this.#mat[9] -= matrix.Matrix[9];
		this.#mat[10] -= matrix.Matrix[10];
		this.#mat[11] -= matrix.Matrix[11];
		this.#mat[12] -= matrix.Matrix[12];
		this.#mat[13] -= matrix.Matrix[13];
		this.#mat[14] -= matrix.Matrix[14];
		this.#mat[15] -= matrix.Matrix[15];
		return;
	}
	add(matrix = new Mat4()) {
		if (!(matrix instanceof Mat4)) {
			console.error(`Matrix is not a Mat4.`);
			return;
		}
		this.#mat[0] += matrix.Matrix[0];
		this.#mat[1] += matrix.Matrix[1];
		this.#mat[2] += matrix.Matrix[2];
		this.#mat[3] += matrix.Matrix[3];
		this.#mat[4] += matrix.Matrix[4];
		this.#mat[5] += matrix.Matrix[5];
		this.#mat[6] += matrix.Matrix[6];
		this.#mat[7] += matrix.Matrix[7];
		this.#mat[8] += matrix.Matrix[8];
		this.#mat[9] += matrix.Matrix[9];
		this.#mat[10] += matrix.Matrix[10];
		this.#mat[11] += matrix.Matrix[11];
		this.#mat[12] += matrix.Matrix[12];
		this.#mat[13] += matrix.Matrix[13];
		this.#mat[14] += matrix.Matrix[14];
		this.#mat[15] += matrix.Matrix[15];
		return;
	}
	replace(matrix = new Mat4()) {
		if (!(matrix instanceof Mat4)) {
			console.error(`Matrix is not a Mat4.`);
			return;
		}
		this.#mat = matrix.Matrix;
		return;
	}
	invert() {
		var a00 = this.#mat[0], a01 = this.#mat[1], a02 = this.#mat[2], a03 = this.#mat[3],
			a10 = this.#mat[4], a11 = this.#mat[5], a12 = this.#mat[6], a13 = this.#mat[7],
			a20 = this.#mat[8], a21 = this.#mat[9], a22 = this.#mat[10], a23 = this.#mat[11],
			a30 = this.#mat[12], a31 = this.#mat[13], a32 = this.#mat[14], a33 = this.#mat[15],
			b00 = a00 * a11 - a01 * a10,
			b01 = a00 * a12 - a02 * a10,
			b02 = a00 * a13 - a03 * a10,
			b03 = a01 * a12 - a02 * a11,
			b04 = a01 * a13 - a03 * a11,
			b05 = a02 * a13 - a03 * a12,
			b06 = a20 * a31 - a21 * a30,
			b07 = a20 * a32 - a22 * a30,
			b08 = a20 * a33 - a23 * a30,
			b09 = a21 * a32 - a22 * a31,
			b10 = a21 * a33 - a23 * a31,
			b11 = a22 * a33 - a23 * a32,
			det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
		if (!det) {
			console.error(`Unable to invert matrix.`);
			return;
		}
		det = 1.0 / det;
		this.#mat[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		this.#mat[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		this.#mat[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		this.#mat[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		this.#mat[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		this.#mat[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		this.#mat[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		this.#mat[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		this.#mat[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		this.#mat[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		this.#mat[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		this.#mat[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		this.#mat[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		this.#mat[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		this.#mat[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		this.#mat[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
		return;
	}
	reset() {
		this.#mat = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
		return;
	}
	constructor(pos = undefined) {
		if (pos instanceof Vec3) {
			this.translate(pos);
		}
		return;
	}
}