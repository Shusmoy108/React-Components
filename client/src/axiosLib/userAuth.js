import axios from "axios";

export function signupEmail(name, email, password, cb) {
	console.log(name, email, password);
	axios
		.post("api/user/auth/signup/email", {
			name: name,
			email: email,
			password: password
		})
		.then(res => {
			axios.defaults.headers.common["Authorization"] = res.data.token;
			localStorage.setItem("jwtToken", res.data.token);
			localStorage.setItem("user", res.data.user);
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "server error" }, null);
				return cb(err.response.data, null);
			} else {
				cb({ msg: "Unknown error" }, null);
			}
		});
}

export function signupPhone(name, phone, password, cb) {
	axios
		.post("api/user/auth/signup/phone", {
			name: name,
			phone: phone,
			password: password
		})
		.then(res => {
			axios.defaults.headers.common["Authorization"] = res.data.token;
			localStorage.setItem("jwtToken", res.data.token);
			localStorage.setItem("user", res.data.user);
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "server error" }, null);
				return cb(err.response.data, null);
			} else {
				cb({ msg: "Unknown error" }, null);
			}
		});
}

export function loginEmail(email, password, cb) {
	axios
		.post("api/user/auth/login/email", { email: email, password: password })
		.then(res => {
			axios.defaults.headers.common["Authorization"] = res.data.token;
			localStorage.setItem("jwtToken", res.data.token);
			localStorage.setItem("user", res.data.user);
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "server error" }, null);
				return cb(err.response.data, null);
			} else {
				cb({ msg: "Unknown error" }, null);
			}
		});
}

export function loginPhone(phone, password, cb) {
	axios
		.post("api/user/auth/login/phone", { phone: phone, password: password })
		.then(res => {
			axios.defaults.headers.common["Authorization"] = res.data.token;
			localStorage.setItem("jwtToken", res.data.token);
			localStorage.setItem("user", res.data.user);
			cb(null, res.data);
		})
		.catch(err => {
			if (err.response.status) {
				if (err.response.status === 500)
					return cb({ msg: "server error" }, null);
				return cb(err.response.data, null);
			} else {
				cb({ msg: "Unknown error" }, null);
			}
		});
}

export function getProfile(cb) {
    let token = localStorage.getItem("jwtToken");
    // console.log(token);
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
		axios
			.get("api/user/auth/profile")
			.then(res => {
				localStorage.setItem("user", res.data.user);
				cb(null, res.data);
			})
			.catch(err => {
				if (err.response.status) {
					if (err.response.status === 500)
						return cb({ msg: "server error" }, null);
					return cb(err.response.data, null);
				} else {
					cb({ msg: "Unknown error" }, null);
				}
			});
	} else {
		cb("Not authenticated", null);
	}
}

export function logout(cb) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    cb();
}
