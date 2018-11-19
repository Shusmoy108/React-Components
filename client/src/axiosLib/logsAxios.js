import axios from "axios";
import showErr from "./errorAxios";

export function getLogs(page, date, adminId, type, cb) {
    axios
        .post("api/admin/logs/" + page, {
            date: date,
            adminId: adminId,
            type: type
        })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getAdminList(cb) {
    axios
        .get("api/admin/adminlist")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getTypes(cb) {
    axios
        .get("api/admin/logs/types")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
