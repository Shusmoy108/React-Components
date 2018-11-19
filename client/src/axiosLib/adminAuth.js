import axios from "axios";
import showErr from './errorAxios';

// 1. Logging in on username LOG
// @POST api/admin/auth/login/username PUBLIC
// @METHOD loginUsername VALIDATION
// (username* password*)
// @RESPONSE --- {admin: admin, accessToken: accessToken}
// @LOG (admin logged in, login, adminid, admin)

const loginUsername = (username, password, cb) => {
	axios
		.post("api/admin/auth/login/username", { username, password })
		.then(res => {
			axios.defaults.headers.common["Authorization"] = res.data.token;
			localStorage.setItem("jwtToken", res.data.token);
			localStorage.setItem("admin", res.data.admin);
			cb(null, res.data);
		})
		.catch(err => {
			showErr(err, cb);
		});
}

// 2. Change password on password LOG
// @POST api/admin/auth/changepassword/username PUBLIC
// @METHOD changePasswordOnPassword VALIDATION
// (username* oldpassword* newpassword)
// @RESPONSE --- {admin: admin}
// @LOG (admin changed password, change password, adminid, admin)

const changePasswordOnPassword = (username, oldPassword, newPassword, cb) => {
	axios
		.post("api/admin/auth/changepassword/username", { username, oldPassword, newPassword })
		.then(res => {
			cb(null, res.data);
		})
		.catch(err => {
			showErr(err, cb);
		});
}

// 3. Admin list
// @GET api/admin/adminlist PRIVATE ADMIN
// @METHOD getAdminList
// @RESPONSE --- {admins: admins}

const getAdminList = (cb) => {
    axios.get("api/admin/adminlist").then(res => {
        cb(null, res.data);
    }).catch(err => {
        showErr(err, cb);
    })
}

const getProfile = (cb) => {
    let token = localStorage.getItem("jwtToken");
    // console.log(token);
	if (token) {
		axios.defaults.headers.common["Authorization"] = token;
		axios
			.get("api/admin/auth/profile")
			.then(res => {
				localStorage.setItem("admin", res.data.admin);
				cb(null, res.data);
			})
			.catch(err => {
				showErr(err, cb);
			});
	} else {
		cb("Not authenticated", null);
	}
}

const logout = (cb) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("admin");
    delete axios.defaults.headers.common["Authorization"];
    cb();
}

export default {
    loginUsername,
    changePasswordOnPassword,
    getAdminList,
    getProfile,
    logout
}