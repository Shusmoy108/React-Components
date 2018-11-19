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

export function getCategories(cb) {
    axios
        .get("api/admin/products/categories")
        .then(res => {
            cb(null, res.data);
        })
        .catch(err => {
            showErr(err, cb);
        });
}

export function editImage(data, cb) {
    axios({
        method: "put",
        url: "api/admin/products/update/image/" + data.id,
        data: data.bodyFormData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
    })
        .then(response => {
            //handle success
            cb(null, response);
        })
        .catch(err => {
            //handle error
            showErr(err, cb);
        });
}

export function editProductDetails(data, cb) {
    axios({
        method: "put",
        url: "api/admin/products/update/details/" + data.id,
        data: data
    })
        .then(response => {
            //handle success
            cb(null, response);
        })
        .catch(err => {
            //handle error
            showErr(err, cb);
        });
}

export function editProductRating(data, cb) {
    axios({
        method: "put",
        url: "api/admin/products/update/rating/" + data.id,
        data: data
    })
        .then(response => {
            //handle success
            cb(null, response);
        })
        .catch(err => {
            //handle error
            showErr(err, cb);
        });
}

export function addProduct(data, cb) {
    const bodyFormData = new FormData();
    bodyFormData.append("name", data.name);
    bodyFormData.append("category", data.category);
    bodyFormData.append("type", data.type);
    bodyFormData.append("productPage", data.productPage);
    bodyFormData.append("profitMargin", data.profitMargin);
    bodyFormData.append("costing", data.costing);
    bodyFormData.append("offerAvailable", data.offerAvailable);
    bodyFormData.append("offerPercentage", data.offerPercentage);
    bodyFormData.append("hitCount", data.hitCount);
    bodyFormData.append("rating", data.rating);
    // Put file at last
    bodyFormData.append("image", data.file, data.name);
    axios({
        method: "post",
        url: "api/admin/products/insert",
        data: bodyFormData
    })
        .then(response => {
            //handle success
            cb(null, response);
        })
        .catch(err => {
            //handle error
            showErr(err, cb);
        });
}

export function getAllFileNames(data, cb) {
    axios({
        method: "post",
        url: "api/admin/products/getAllFileNames",
        data: data
    })
        .then(response => {
            //handle success
            cb(null, response);
        })
        .catch(err => {
            //handle error
            showErr(err, cb);
        });
}
