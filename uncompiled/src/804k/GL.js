class GL {
	static vs = [
`attribute vec4 position;`,
`attribute vec2 texcoord;`,
`uniform mat4 model;`,
`varying highp vec2 vtexcoord;`,
`void main() {`,
	`gl_Position = model * position;`,
	`vtexcoord = texcoord;`,
`}`
	].join(`\n`);
	static fs = [
`precision highp float;`,
`varying highp vec2 vtexcoord;`,
`uniform vec3 lightDir;`,
`uniform sampler2D sampler;`,
`void main(void) {`,
	`gl_FragColor = texture2D(sampler, vtexcoord);`,
`}`
	].join(`\n`);
	static #lightDir = Vec3.normalize(new Vec3(1, 2, 3));
	static vertexShader;
	static fragmentShader;
	static #md;
	static #ps;
	static #cl;
	static #up;
	static #ld;
	static #vd;
	static #nm;
	static #bcl;
	static #bel;
	static #bnm;
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
		Minecraft.gl.shaderSource(vShader, this.vs);
		Minecraft.gl.shaderSource(fShader, this.fs);
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
		this.vertexShader = vShader;
		this.fragmentShader = fShader;
		Minecraft.program = Minecraft.gl.createProgram();
		Minecraft.gl.attachShader(Minecraft.program, this.vertexShader);
		Minecraft.gl.attachShader(Minecraft.program, this.fragmentShader);
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
		this.#ld = Minecraft.gl.getUniformLocation(Minecraft.program, `lightDir`);
		// this.#nm = Minecraft.gl.getAttribLocation(Minecraft.program, `normal`);
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
		/*
		this.#bnm = Minecraft.gl.createBuffer();
		Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, this.#bnm);
		Minecraft.gl.bufferData(Minecraft.gl.ARRAY_BUFFER, new Float32Array([
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0
		]), Minecraft.gl.STATIC_DRAW);
		*/
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
		if (Minecraft.running == true) {
			Minecraft.gl.clearColor(0.0, 0.0, 0.0, 1.0);
			Minecraft.gl.clearDepth(1.0);
			Minecraft.gl.clear(Minecraft.gl.COLOR_BUFFER_BIT | Minecraft.gl.DEPTH_BUFFER_BIT);
			Minecraft.gl.enable(Minecraft.gl.CULL_FACE);
			Minecraft.gl.enable(Minecraft.gl.DEPTH_TEST);
			Minecraft.gl.depthFunc(Minecraft.gl.LEQUAL);
			Minecraft.gl.useProgram(Minecraft.program);
		} else {
			return;
		}
	}
	static addChunks() {
		if (Minecraft.running == true) {
			for (var i = 0; i < Chunk.blocks.length; i += 1) {
				this.add(Chunk.blocks[i]);
			}
		} else {
			return;
		}
	}
	static add(obj) {
		if (Minecraft.running == true) {
			try {
				if ((obj.lastv == undefined ? [] : obj.lastv).join() != obj.vertex.join() || obj.buffer == undefined) {
					obj.buffer = Minecraft.gl.createBuffer();
					obj.lastv = obj.vertex;
				}
				/*
				Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, this.#bnm);
				Minecraft.gl.vertexAttribPointer(this.#nm, 3, Minecraft.gl.FLOAT, false, 0, 0);
				*/
				Minecraft.gl.uniformMatrix4fv(this.#md, false, new Float32Array(Minecraft.camera.Matrix.slice()));
				// Minecraft.gl.enableVertexAttribArray(this.#nm);
				Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, obj.buffer);
				Minecraft.gl.bufferData(Minecraft.gl.ARRAY_BUFFER, new Float32Array(obj.vertex), Minecraft.gl.STATIC_DRAW);
				Minecraft.gl.enableVertexAttribArray(this.#ps);
				Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, obj.buffer);
				Minecraft.gl.vertexAttribPointer(this.#ps, 3, Minecraft.gl.FLOAT, false, 0, 0);
				Minecraft.gl.enableVertexAttribArray(this.#cl);
				Minecraft.gl.bindBuffer(Minecraft.gl.ARRAY_BUFFER, this.#bcl);
				Minecraft.gl.vertexAttribPointer(this.#cl, 2, Minecraft.gl.FLOAT, false, 0, 0);
				Minecraft.gl.enableVertexAttribArray(this.#cl);
				Minecraft.gl.bindBuffer(Minecraft.gl.ELEMENT_ARRAY_BUFFER, this.#bel);
				Minecraft.gl.activeTexture(Minecraft.gl.TEXTURE0);
				Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, obj.texture);
				Minecraft.gl.uniform1i(this.#up, 0);
				Minecraft.gl.uniform3f(this.#ld, this.#lightDir.x, this.#lightDir.y, this.#lightDir.z);
				Minecraft.gl.drawElements(Minecraft.gl.TRIANGLES, 36, Minecraft.gl.UNSIGNED_SHORT, 0); // TRIANGLES, LINES, POINTS
				return obj;
			} catch (err) {
				alert(err.stack);
				console.error(err);
				Minecraft.running = false;
				return;
			}
		} else {
			return;
		}
	}
}