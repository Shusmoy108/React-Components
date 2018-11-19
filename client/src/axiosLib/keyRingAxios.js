import axios from "axios";
import showErr from "./errorAxios";

export function getTypes(cb) {
    axios
        .get("api/admin//keyringstock/gettypes")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getShapes(cb) {
    axios
        .get("api/admin//keyringstock/getshapes")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function deleteKeyRingStock(id, cb) {
    axios
        .delete("api/admin//keyringstock/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getKeyRingStocks(page, type, shape, cb) {
    axios
        .post("api/admin/keyringstock/all/" + page, { type: type, shape: shape })
        .then(res => {

            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function insertKeyRingStock(
    type,
    shape,
    available,
    stock,
    costs,

    cb
) {
    axios
        .post("api/admin/keyringstock/insert", {
            type: type,
            shape: shape,
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
export function updateKeyRingStock(
    id,
    type,
    shape,
    available,
    stock,
    costs,
    cb
) {
    axios
        .put("api/admin/keyringstock/update/" + id, {
            type: type,
            shape: shape,
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
