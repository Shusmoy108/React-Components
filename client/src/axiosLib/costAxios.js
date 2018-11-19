import axios from "axios";
import showErr from "./errorAxios";

export function getProducts(cb) {
    axios
        .get("api/admin/costs/sublimeprint/getproducts")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getSublimeprintCost(cb) {
    axios
        .get("api/admin/costs/sublimeprint/all")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function getUvprintCost(cb) {
    axios
        .get("api/admin/costs/uvprint/all")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function insertUvprintCost(product, costs, cb) {

    axios
        .post("api/admin/costs/uvprint/insert", { product: product, costs: costs })
        .then(res => {

            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function updateUvprintCost(id, product, costs, cb) {
    axios
        .put("api/admin/costs/uvprint/update/" + id, { product: product, costs: costs })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function deleteUvprintCost(id, cb) {
    axios
        .delete("api/admin/costs/uvprint/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function insertSublimeprintCost(product, costs, cb) {
    axios
        .post("api/admin/costs/sublimeprint/insert", { product: product, costs: costs })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}



export function updateSublimeprintCost(id, product, costs, cb) {
    axios
        .put("api/admin/costs/sublimeprint/update/" + id, { product: product, costs: costs })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function deleteSublimeprintCost(id, cb) {
    axios
        .delete("api/admin/costs/sublimeprint/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}


export function getKeyringprintCost(cb) {
    axios
        .get("api/admin/costs/keyringprint/all")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}


export function deleteKeyringprintCost(id, cb) {
    axios
        .delete("api/admin/costs/keyringprint/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}


export function insertKeyringprintCost(product, type, costs, cb) {
    axios
        .post("api/admin/costs/keyringprint/insert", { product: product, type: type, costs: costs })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}


export function updateKeyringprintCost(id, product, type, costs, cb) {
    axios
        .put("api/admin/costs/keyringprint/update/" + id, { product: product, type: type, costs: costs })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}