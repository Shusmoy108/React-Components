import axios from "axios";
import showErr from "./errorAxios";

export function getTypes(cb) {
    axios
        .get("api/admin//mugstock/gettypes")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getColors(cb) {
    axios
        .get("api/admin//mugstock/getcolors")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function deleteMugStock(id, cb) {
    axios
        .delete("api/admin//mugstock/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getMugStocks(page, type, color, cb) {
    axios
        .post("api/admin/mugstock/all/" + page, { type: type, color: color })
        .then(res => {
           
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function insertMugStock(
    type,
    color,
    available,
    stock,
    costs,

    cb
) {
    axios
        .post("api/admin/mugstock/insert", {
            type: type,
            color: color,
            available: available,
            stock: stock,
            costs: costs,
        })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function updateMugStock(
    id,
    type,
    color,
    available,
    stock,
    costs,
    cb
) {
    axios
        .put("api/admin/mugstock/update/" + id, {
            type: type,
            color: color,
            available: available,
            stock: stock,
            costs: costs
        })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
