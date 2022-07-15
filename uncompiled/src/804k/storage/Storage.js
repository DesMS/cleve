class Storage {
	static cleve;
	static load() {
		try {
			this.cleve = JSON.parse(window.atob(window.localStorage.getItem(`cleve_save`)));
			if (this.cleve == null || this.cleve == undefined) {
				window.localStorage.setItem(`cleve_save`, window.btoa(`{}`));
				this.cleve = {};
			}
		} catch (err) {
			window.localStorage.setItem(`cleve_save`, window.btoa(`{}`));
			this.cleve = {};
		}
		var antialias;
		if (this.cleve[`antialias`] == undefined || this.cleve[`antialias`] == null) {
			this.cleve[`antialias`] = false;
			antialias = false;
			this.save();
		} else {
			antialias = this.cleve[`antialias`];
		}
		Minecraft.webgloptions[`antialias`] = antialias;
	}
	static save() {
		window.localStorage.setItem(`cleve_save`, window.btoa(JSON.stringify(this.cleve)));
		return;
	}
}