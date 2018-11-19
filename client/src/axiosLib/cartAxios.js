import axios from "axios";
import showErr from "./errorAxios";

export function getAllCarts(page, cb) {
    axios
        .get(`api/admin/cart/all/${page}`)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
