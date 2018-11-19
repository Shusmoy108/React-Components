import axios from "axios";
import showErr from "./errorAxios";

export function getProducts(cb) {
    axios
        .get("api/admin/products/all")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function editOffer(data, cb) {
    axios({
        method: "put",
        url: "api/admin/products/update/dimensions/" + data.id,
        data: {
            profitMargin: data.profitMargin,
            offerAvailable: data.offerAvailable,
            offerPercentage: data.offerPercentage
        }
    })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function getTag(cb) {
    axios
        .get("api/admin/tags/all")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function addTag(
    name,
    offerAvailable,
    offerPercentage,
    profitMargin,
    cb
) {
    axios
        .post("api/admin/tags/insert", {
            name,
            offerAvailable,
            offerPercentage,
            profitMargin
        })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function deleteTag(id, cb) {
    axios
        .get("api/admin/tags/delete/" + id)
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
export function updateTag(
    id,
    tagname,
    offeravailable,
    offerrpercentage,
    profitmargin,
    cb
) {
    axios
        .put("api/admin//tag/update/dimensions/" + id, {
            name: tagname,
            offerAvailable: offeravailable,
            offerPercentage: offerrpercentage,
            profitMargin: profitmargin
        })
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}
