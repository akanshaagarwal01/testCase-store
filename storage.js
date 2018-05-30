(function() {
	class Storage {
		getItem(key) {
			return localStorage.getItem(key);
		};
		setItem(key, value) {
			localStorage.setItem(key, value);
		};  
	}
  
  window.Storage = Storage;
})();