import axios from "axios";
import showErr from "./errorAxios";

//section:1 getting data from server
const getPendingOrders = (queryObject, page, cb) => {
  console.log("queryObjectInAxios:", queryObject);
  axios
    .post(`api/admin/orders/search/pending/${page}`, queryObject)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const getInDesignOrders = (queryObject, page, cb) => {
  console.log("queryObjectInAxios:", queryObject);
  axios
    .post(`api/admin/orders/search/indesign/${page}`, queryObject)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const getInProductionOrders = (queryObject, page, cb) => {
  console.log("queryObjectInAxios:", queryObject);
  axios
    .post(`api/admin/orders/search/inproduction/${page}`, queryObject)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const getInDeliveryOrders = (queryObject, page, cb) => {
  console.log("queryObjectInAxios:", queryObject);
  axios
    .post(`api/admin/orders/search/indelivery/${page}`, queryObject)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};
const getDeliveredOrders = (queryObject, page, cb) => {
  console.log("queryObjectInAxios:", queryObject);
  axios
    .post(`api/admin/orders/search/delivered/${page}`, queryObject)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const getLockedOrders = cb => {
  axios
    .get(`api/admin/orders/locked/all`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const getOrderIdList = cb => {
  axios
    .get(`api/admin/orders/search/orderidlist`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

//section 2 : confirming different orders
const confirmFromPending = (orderId, cb) => {
  axios
    .put(`api/admin/orders/pending/confirm/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const confirmInDesign = (orderId, cb) => {
  axios
    .put(`api/admin/orders/indesign/confirm/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const confirmInProduction = (orderId, cb) => {
  axios
    .put(`api/admin/orders/inproduction/confirm/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const confirmInDelivery = (orderId, cb) => {
  axios
    .put(`api/admin/orders/indelivery/confirm/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

//section 3 : locking unlocking
const lockOrder = (orderId, cb) => {
  axios
    .put(`api/admin/orders/lock/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const unlockOrder = (orderId, cb) => {
  axios
    .put(`api/admin/orders/unlock/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

//section 4 : deleting section
const deleteFullOrder = (orderId, cb) => {
  axios
    .delete(`api/admin/orders/delete/full/${orderId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

const deleteItemFromOrder = (orderId, itemId, cb) => {
  axios
    .delete(`api/admin/orders/delete/item/${orderId}/${itemId}`)
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      showErr(err, cb);
    });
};

export default {
  getPendingOrders,
  getInDesignOrders,
  getInProductionOrders,
  getInDeliveryOrders,
  getDeliveredOrders,
  getOrderIdList,
  confirmFromPending,
  confirmInDesign,
  confirmInProduction,
  confirmInDelivery,
  lockOrder,
  unlockOrder,
  getLockedOrders,
  deleteFullOrder,
  deleteItemFromOrder
};
