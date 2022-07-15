class GL {
	static #md;
	static #ps;
	static #cl;
	static #up;
	static #bcl;
	static #bel;
	static #loaded = false;
	static #load = () => {
		Minecraft.width = document.documentElement.clientWidth;
		Minecraft.height = document.documentElement.clientHeight;
		Minecraft.canvas = document.createElement(`canvas`);
		Minecraft.canvas.id = `root`;
		Minecraft.canvas.width = Minecraft.width;
		Minecraft.canvas.height = Minecraft.height;
		Minecraft.canvas.style.width = Minecraft.width;
		Minecraft.canvas.style.height = Minecraft.height;
		document.body.appendChild(Minecraft.canvas);
		Minecraft.canvas = document.getElementById(`root`);
		Minecraft.gl = Minecraft.canvas.getContext(`webgl2`, Minecraft.webgloptions);
		if (Minecraft.gl == null || Minecraft.gl == undefined || !Minecraft.gl) {
			console.warn(`WebGL2 not supported, attempting to use WebGL, expect bugs.`);
			Minecraft.gl = Minecraft.canvas.getContext(`webgl`, Minecraft.webgloptions) || Minecraft.canvas.getContext(`experimental-webgl`, Minecraft.webgloptions);
			if (Minecraft.gl == null || Minecraft.gl == undefined || !Minecraft.gl) {
				var msg = `Neither WebGL nor WebGL2 is supported, exiting`;
				alert(msg);
				console.error(msg)
				Minecraft.running = false;
				return;
			}
		}
		const vShader = Minecraft.gl.createShader(Minecraft.gl.VERTEX_SHADER);
		const fShader = Minecraft.gl.createShader(Minecraft.gl.FRAGMENT_SHADER);
		Minecraft.gl.shaderSource(vShader, Minecraft.vs);
		Minecraft.gl.shaderSource(fShader, Minecraft.fs);
		Minecraft.gl.compileShader(vShader);
		Minecraft.gl.compileShader(fShader);
		if (!Minecraft.gl.getShaderParameter(vShader, Minecraft.gl.COMPILE_STATUS)) {
			var msg = `An error occurred compiling the shaders: ${Minecraft.gl.getShaderInfoLog(vShader)}`;
			alert(msg);
			console.error(msg);
			Minecraft.gl.deleteShader(vShader);
			Minecraft.running = false;
			return;
		}
		if (!Minecraft.gl.getShaderParameter(fShader, Minecraft.gl.COMPILE_STATUS)) {
			var msg = `An error occurred compiling the shaders: ${Minecraft.gl.getShaderInfoLog(fShader)}`;
			alert(msg);
			console.error(msg);
			Minecraft.gl.deleteShader(fShader);
			Minecraft.running = false;
			return;
		}
		Minecraft.vertexShader = vShader;
		Minecraft.fragmentShader = fShader;
		Minecraft.program = Minecraft.gl.createProgram();
		Minecraft.gl.attachShader(Minecraft.program, Minecraft.vertexShader);
		Minecraft.gl.attachShader(Minecraft.program, Minecraft.fragmentShader);
		Minecraft.gl.linkProgram(Minecraft.program);
		if (!Minecraft.gl.getProgramParameter(Minecraft.program, Minecraft.gl.LINK_STATUS)) {
			var msg = `Unable to initialize the shader program: ${Minecraft.gl.getProgramInfoLog(Minecraft.program)}`;
			alert(msg);
			console.error(msg);
			Minecraft.running = false;
			return;
		}
		Minecraft.canvas.addEventListener(`contextmenu`, event => event.preventDefault());
		Minecraft.gl.useProgram(Minecraft.program);
		this.#md = Minecraft.gl.getUniformLocation(Minecraft.program, `model`);
		this.#ps = Minecraft.gl.getAttribLocation(Minecraft.program, `position`);
		this.#cl = Minecraft.gl.getAttribLocation(Minecraft.program, `texcoord`);
		this.#up = Minecraft.gl.getUniformLocation(Minecraft.program, `sampler`);
		this.#bcl = Minecraft.gl.createBuffer();
		Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, this.#bcl);
		Minecraft.gl.bufferData(Minecraft.gl.ARRAY_BUFFER, new Float32Array([
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0,
			0.0, 0.0,
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		]), Minecraft.gl.STATIC_DRAW);
		this.#bel = Minecraft.gl.createBuffer();
		Minecraft.gl.bindBuffer(Minecraft.gl.ELEMENT_ARRAY_BUFFER, this.#bel);
		Minecraft.gl.bufferData(Minecraft.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
			0, 1, 2, 0, 2, 3,
			4, 5, 6, 4, 6, 7,
			8, 9, 10, 8, 10, 11,
			12, 13, 14, 12, 14, 15,
			16, 17, 18, 16, 18, 19,
			20, 21, 22, 20, 22, 23
		]), Minecraft.gl.STATIC_DRAW);
		return;
	}
	static init() {
		if (this.#loaded == false) {
			this.#loaded = true;
			this.#load();
			return;
		} else {
			console.warn(`Already init`);
			return;
		}
	}
	static reload() {
		if(this.#loaded == true) {
			if (Minecraft.canvas.remove) {
				Minecraft.canvas.remove();
			}
			Minecraft.canvas = undefined;
			Minecraft.gl = undefined;
			this.#load();
			return;
		} else {
			console.warn(`Not loaded, unable to reload.`);
			return;
		}
	}
	static #last = [];
	static reuse() {
		for (var i = 0; i < this.#last.length; i += 1) {
			this.add(this.#last[i]);
		}
	}
	static frame() {
		Minecraft.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		Minecraft.gl.clearDepth(1.0);
		Minecraft.gl.viewport(0, 0, Minecraft.width, Minecraft.height);
		Minecraft.gl.enable(Minecraft.gl.DEPTH_TEST);
		Minecraft.gl.enable(Minecraft.gl.CULL_FACE);
		Minecraft.gl.depthFunc(Minecraft.gl.ALWAYS);
		Minecraft.gl.clear(Minecraft.gl.COLOR_BUFFER_BIT | Minecraft.gl.DEPTH_BUFFER_BIT);
		Minecraft.gl.useProgram(Minecraft.program);
		return;
	}
	/*
	static draw(type = Minecraft.gl.TRIANGLES) {
		Minecraft.gl.useProgram(Minecraft.program);
		// 36
		// 
		Minecraft.gl.drawElements(type, 36, Minecraft.gl.UNSIGNED_SHORT, 0);
	}
	*/
	static addChunks(chunks = []) {
		this.#last = [];
		for (var i = 0; i < chunks.length; i += 1) {
			for (var g = 0; g < chunks[i].blocks.length; g += 1) {
				if (chunks[i].blocks[g].texture != undefined) {
					this.#last[this.#last.length] = chunks[i].blocks[g];
					this.add(chunks[i].blocks[g]);
				}
			}
		}
	}
	static add(obj) {
		try {
			var i = 0;
			var cps = new Float32Array(Array.from(obj.vertex, e => {
				var g = i % 3;
				if (g == 0) {
					e += obj.pos.x * 2;
				} else if (g == 1) {
					e += obj.pos.y * 2;
				} else if (g == 2) {
					e += obj.pos.z * 2;
				}
				i += 1;
				return e;
			}));
			var bps = Minecraft.gl.createBuffer();
			Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, bps);
			Minecraft.gl.bufferData(Minecraft.gl.ARRAY_BUFFER, cps, Minecraft.gl.STATIC_DRAW);
			Minecraft.gl.uniformMatrix4fv(this.#md, false, new Float32Array(Minecraft.camera.Matrix));
			Minecraft.gl.enableVertexAttribArray(this.#ps);
			Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, bps);
			Minecraft.gl.vertexAttribPointer(this.#ps, 3, Minecraft.gl.FLOAT, false, 0, 0);
			Minecraft.gl.enableVertexAttribArray(this.#cl);
			Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, this.#bcl);
			Minecraft.gl.vertexAttribPointer(this.#cl, 2, Minecraft.gl.FLOAT, false, 0, 0);
			Minecraft.gl.enableVertexAttribArray(this.#cl);
			Minecraft.gl.bindBuffer(Minecraft.gl.ELEMENT_ARRAY_BUFFER, this.#bel);
			Minecraft.gl.activeTexture(Minecraft.gl.TEXTURE0);
			Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, obj.texture);
			Minecraft.gl.uniform1i(this.#up, 0);
			// 36
			Minecraft.gl.drawElements(Minecraft.gl.TRIANGLES, 36, Minecraft.gl.UNSIGNED_SHORT, 0);
		} catch (err) {
			console.log(obj.texture);
			alert(err.stack);
			console.error(err);
			Minecraft.running = false;
			return;
		}
	}
}