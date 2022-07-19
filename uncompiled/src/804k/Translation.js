class Translation {
	static lang = `en_us`;
	static translations = {};
	static initLang(lang = `en_us`, cb = () => { }) {
		const file = new XMLHttpRequest();
		file.open(`GET`, `assets/minecraft/lang/${lang}.lang`, false);
		file.onreadystatechange = function () {
			if (file.readyState === 4) {
				if (file.status === 200 || file.status == 0) {
					Translation.translations = {};
					var langf = file.responseText.split(`\n`);
					for (var i = 0; i < langf.length; i += 1) {
						if (langf[i] != ``) {
							Translation.translations[langf[i].split(`=`)[0].toString()] = langf[i].split(`=`)[1].toString();
						}
					}
				} else {
					console.warn(`Language "${lang}" is not a valid language.`);
				}
				setTimeout(cb);
			}
			return;
		}
		file.send(null);
		return;
	}
	static getString(string) {
		return this.translations[string] == undefined ? string : this.translations[string];
	}
}