import React from "react";
import orderLib from "axiosLib/orderAxios";
export const OrderContext = React.createContext();

export class OrderProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryStatus: "",
            date: "",
            userId: "",
            orderId: "",
            productId: "",
            templateId: "",
            loading: true,
            lock: "",
            expanded: [],

            pendingPage: 1,
            inDesignPage: 1,
            inProductionPage: 1,
            inDeliveryPage: 1,
            deliveredPage: 1,

            pendingOrders: [],
            inDesignOrders: [],
            inProductionOrders: [],
            inDeliveryOrders: [],
            deliveredOrders: [],

            lockedPendingOrders: [],
            lockedInDesignOrders: [],
            lockedInProductionOrders: [],
            lockedInDeliveryOrders: [],
            lockedDeliveredOrders: []
        };
    }

    ///////////
    //Here
    ////////
    resetCollapse = (length = this.state.expanded.length) => {
        let initial = [];
        for (let i = 0; i < length; i++) initial[i] = false;
        this.setState({ expanded: initial });
    };

    componentDidMount() {
        //for testing ->
        window.oc = this;
        // set after recieve data
        this.resetCollapse(() => {}, 30);
        // all axios calls
        let queryObject = {
            lock: false
        };
        orderLib.getLockedOrders((err, data) => {
            if (err) {
                console.log(err, "getlockedorders");
                let call = [];
                call.push(
                    this.loadPendingOrders(queryObject, this.state.pendingPage)
                );
                call.push(
                    this.loadInDesignOrders(
                        queryObject,
                        this.state.inDesignPage
                    )
                );
                call.push(
                    this.loadInProductionOrders(
                        queryObject,
                        this.state.inProductionPage
                    )
                );
                call.push(
                    this.loadInDeliveryOrders(
                        queryObject,
                        this.state.inDeliveryPage
                    )
                );
                call.push(
                    this.loadDeliveredOrders(
                        queryObject,
                        this.state.deliveredPage
                    )
                );
                Promise.all(call)
                    .then((result) => {
                        this.setState({ loading: false });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.divideLockedOrdersIntoAlottedArrays(
                    err,
                    data.orders,
                    () => {
                        let call = [];
                        call.push(
                            this.loadPendingOrders(
                                queryObject,
                                this.state.pendingPage
                            )
                        );
                        call.push(
                            this.loadInDesignOrders(
                                queryObject,
                                this.state.inDesignPage
                            )
                        );
                        call.push(
                            this.loadInProductionOrders(
                                queryObject,
                                this.state.inProductionPage
                            )
                        );
                        call.push(
                            this.loadInDeliveryOrders(
                                queryObject,
                                this.state.inDeliveryPage
                            )
                        );
                        call.push(
                            this.loadDeliveredOrders(
                                queryObject,
                                this.state.deliveredPage
                            )
                        );
                        Promise.all(call)
                            .then((result) => {
                                this.setState({ loading: false });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                );
            }
        });
    }

    loadPendingOrders = (queryObject, page) => {
        let that = this;
        orderLib.getPendingOrders(queryObject, page, (err, data) => {
            if (!err && data.orders.length) {
                that.setState({ pendingOrders: data.orders });
            } else {
                console.log("pending:", err);
            }
        });
    };

    loadInDesignOrders = (queryObject, page) => {
        let that = this;
        orderLib.getInDesignOrders(queryObject, page, (err, data) => {
            if (!err && data.orders.length) {
                that.setState({ inDesignOrders: data.orders });
            } else {
                console.log("indesign:", err);
            }
        });
    };

    loadInProductionOrders = (queryObject, page) => {
        let that = this;
        orderLib.getInProductionOrders(queryObject, page, (err, data) => {
            if (!err && data.orders.length) {
                that.setState({ inProductionOrders: data.orders });
            } else {
                console.log("inProduction:", err);
            }
        });
    };

    loadInDeliveryOrders = (queryObject, page) => {
        let that = this;
        orderLib.getInDeliveryOrders(queryObject, page, (err, data) => {
            if (!err && data.orders.length) {
                that.setState({ inDeliveryOrders: data.orders });
            } else {
                console.log("inDelivery:", err);
            }
        });
    };

    loadDeliveredOrders = (queryObject, page) => {
        let that = this;
        orderLib.getDeliveredOrders(queryObject, page, (err, data) => {
            if (!err && data.orders.length) {
                that.setState({ deliveredOrders: data.orders });
            } else {
                console.log("delivered:", err);
            }
        });
    };

    divideLockedOrdersIntoAlottedArrays = (err, orders, cb) => {
        if (err) cb();
        else {
            let pending = this.state.lockedPendingOrders,
                inDesign = this.state.lockedInDesignOrders,
                inProduction = this.state.lockedInProductionOrders,
                inDelivery = this.state.lockedInDeliveryOrders,
                delivered = this.state.lockedDeliveredOrders;

            orders.forEach((elem) => {
                if (elem.pending === true) {
                    pending.push(elem);
                } else if (elem.inDesign === true) {
                    inDesign.push(elem);
                } else if (elem.inProduction === true) {
                    inProduction.push(elem);
                } else if (elem.inDelivery === true) {
                    inDelivery.push(elem);
                } else if (elem.delivered === true) {
                    delivered.push(elem);
                }
            });

            this.setState(
                {
                    lockedPendingOrders: pending,
                    lockedInDesignOrders: inDesign,
                    lockedInProductionOrders: inProduction,
                    lockedInDeliveryOrders: inDelivery,
                    lockedDeliveredOrders: delivered
                },
                cb()
            );
        }
    };

    getOrderIdList = () => {
        orderLib.getOrderIdList(async (err, data) => {
            if (!err) {
                await this.setState({
                    orderIdList: data.orderIdList
                });
                console.log("orderIdList : ", this.state.orderIdList);
            } else {
                console.log(err);
            }
        });
    };

    confirmPending = (orderId) => {
        orderLib.confirmFromPending(orderId, async (err, data) => {
            if (!err) {
                let confirmedOrder = data.order;
                let allPendingOrders = this.state.lockedPendingOrders;
                let allInDesignOrders = this.state.inDesignOrders;
                allPendingOrders = allPendingOrders.filter(
                    (elem) => elem.orderId !== orderId
                );
                allInDesignOrders.push(confirmedOrder);
                await this.setState({
                    lockedPendingOrders: allPendingOrders,
                    inDesignOrders: allInDesignOrders
                });
                console.log(this.state.pendingOrders);
                console.log(this.state.inDesignOrders);
            } else {
                console.log(err);
            }
        });
    };

    confirmInDesign = (orderId) => {
        orderLib.confirmInDesign(orderId, async (err, data) => {
            // console.log(data.order, "@production");
            if (!err) {
                let confirmedOrder = data.order;
                let allInDesignOrders = this.state.lockedInDesignOrders;
                let allInProductionOrders = this.state.inProductionOrders;
                allInDesignOrders = allInDesignOrders.filter(
                    (elem) => elem.orderId !== orderId
                );
                allInProductionOrders.push(confirmedOrder);
                await this.setState({
                    lockedInDesignOrders: allInDesignOrders,
                    inProductionOrders: allInProductionOrders
                });
                console.log(this.state.inDesignOrders);
                console.log(this.state.inProductionOrders);
            } else {
                console.log(err);
            }
        });
    };

    confirmInProduction = (orderId) => {
        orderLib.confirmInProduction(orderId, async (err, data) => {
            if (!err) {
                let confirmedOrder = data.order;
                let allInProductionOrders = this.state.lockedInProductionOrders;
                let allInDeliveryOrders = this.state.inDeliveryOrders;
                allInProductionOrders = allInProductionOrders.filter(
                    (elem) => elem.orderId !== orderId
                );
                allInDeliveryOrders.push(confirmedOrder);
                await this.setState({
                    lockedInProductionOrders: allInProductionOrders
                    // inProductionOrders: allInProductionOrders
                });
                console.log(this.state.inProductionOrders);
                console.log(this.state.inDeliveryOrders);
            } else {
                console.log(err);
            }
        });
    };

    confirmInDelivery = (orderId) => {
        orderLib.confirmInDelivery(orderId, async (err, data) => {
            if (!err) {
                let confirmedOrder = data.order;
                let allInDeliveryOrders = this.state.lockedInDeliveryOrders;
                let allDeliveredOrders = this.state.deliveredOrders;
                allInDeliveryOrders = allInDeliveryOrders.filter(
                    (elem) => elem.orderId !== orderId
                );
                allDeliveredOrders.push(confirmedOrder);
                await this.setState({
                    lockedInDeliveryOrders: allInDeliveryOrders,
                    deliveredOrders: allDeliveredOrders
                });
                console.log(this.state.inDeliveryOrders);
                console.log(this.state.deliveredOrders);
            } else {
                console.log(err);
            }
        });
    };

    handleLockOrder = (orderId) => {
        orderLib.lockOrder(orderId, async (err, data) => {
            if (!err) {
                let lockedOrder = [];
                lockedOrder.push(data.order); //had to do this because divideLockedOrdersIntoAlottedArrays expectes array of orders
                //remove order from the orderlist
                let orderArrayKey = data.order.pending
                    ? "pendingOrders"
                    : data.order.inDesign
                    ? "inDesignOrders"
                    : data.order.inProduction
                    ? "inProductionOrders"
                    : data.order.inDelivery
                    ? "inDeliveryOrders"
                    : "deliveredOrders";
                //remove the order from particular order array
                let newOrderArray = this.state[orderArrayKey].filter(
                    (elem) => elem.orderId !== orderId
                );
                await this.setState({
                    [orderArrayKey]: newOrderArray
                });
                console.log(this.state[orderArrayKey]);
                //set the locked order into alotted array
                this.divideLockedOrdersIntoAlottedArrays(err, lockedOrder, () =>
                    console.log(err)
                );
            } else {
                console.log(err);
            }
        });
    };

    handleUnlockOrder = (orderId) => {
        orderLib.unlockOrder(orderId, async (err, data) => {
            if (!err) {
                let unlockedOrder = data.order;
                let { lockArrayKey, orderArrayKey } = data.order.pending
                    ? {
                          lockArrayKey: "lockedPendingOrders",
                          orderArrayKey: "pendingOrders"
                      }
                    : data.order.inDesign
                    ? {
                          lockArrayKey: "lockedInDesignOrders",
                          orderArrayKey: "inDesignOrders"
                      }
                    : data.order.inProduction
                    ? {
                          lockArrayKey: "lockedInProductionOrders",
                          orderArrayKey: "inProductionOrders"
                      }
                    : data.order.inDelivery
                    ? {
                          lockArrayKey: "lockedInDeliveryOrders",
                          orderArrayKey: "inDeliveryOrders"
                      }
                    : {
                          lockArrayKey: "lockedDeliveredOrders",
                          orderArrayKey: "deliveredOrders"
                      };
                let newOrderArray = this.state[orderArrayKey];
                let newLockArray = this.state[lockArrayKey].filter(
                    (elem) => elem.orderId !== orderId
                );
                //push order to determined orders
                newOrderArray.push(unlockedOrder);
                this.setState({
                    [orderArrayKey]: newOrderArray,
                    [lockArrayKey]: newLockArray
                });
            } else {
                console.log(err);
            }
        });
    };

    deleteFullOrder = (data) => {
        orderLib.deleteFullOrder(data.orderId, async (err, result) => {
            console.log(data, "@Deleted");
            if (!err) {
                let lockArrayKey = data.pending
                    ? "lockedPendingOrders"
                    : data.inDesign
                    ? "lockedInDesignOrders"
                    : data.inProduction
                    ? "lockedInProductionOrders"
                    : data.inDelivery
                    ? "lockedInDeliveryOrders"
                    : "lockedDeliveredOrders";
                let newLockArray = this.state[lockArrayKey].filter(
                    (elem) => elem.orderId !== data.orderId
                );
                this.setState({
                    [lockArrayKey]: newLockArray
                });
            } else {
                console.log(err);
            }
        });
    };

    deleteItemFromOrder = (orderId, itemId) => {
        orderLib.deleteItemFromOrder(orderId, itemId, async (err, data) => {
            if (!err) {
                let orderAfterDeletion = data.order;
                let lockArrayKey = data.order.pending
                    ? "lockedPendingOrders"
                    : data.inDesign
                    ? "lockedInDesignOrders"
                    : data.inProduction
                    ? "lockedInProductionOrders"
                    : data.inDelivery
                    ? "lockedInDeliveryOrders"
                    : "lockedDeliveredOrders";
                let newOrderArray = this.state[lockArrayKey].map((elem) =>
                    elem.orderId === orderId ? orderAfterDeletion : elem
                );
                this.setState({
                    [lockArrayKey]: newOrderArray
                });
                // console.log(newOrderArray);
            } else {
                console.log(err);
            }
        });
    };

    changeDeliveryStatus = async (status) => {
        // console.log("changing to :", status);
        await this.setState({
            deliveryStatus: status
        });
        // console.log(this.state.deliveryStatus);
    };

    ///////////
    //Order.js
    ////////
    handleExpandClick = (i) => {
        // console.log(i, this.state.expanded);
        let newExpanded = this.state.expanded;
        newExpanded[i] = !newExpanded[i];
        this.setState({ expanded: newExpanded });
    };

    handleLockClick = (id) => {
        console.log(id, "handleLock");
    };

    handleActionClick = (id) => {
        console.log(id, "handleAction");
    };

    render() {
        // console.log(this.state, "@state");
        const {
            func,
            changeDeliveryStatus,
            handleLockClick,
            handleActionClick,
            handleExpandClick,
            confirmInDesign,
            confirmInProduction,
            confirmInDelivery,
            resetCollapse,
            deleteFullOrder,
            handleLockOrder,
            confirmPending,
            deleteItemFromOrder,
            handleUnlockOrder
        } = this;
        return (
            <OrderContext.Provider
                value={{
                    ...this.state,
                    func,
                    changeDeliveryStatus,
                    handleLockClick,
                    handleActionClick,
                    resetCollapse,
                    confirmInDesign,
                    confirmInProduction,
                    confirmInDelivery,
                    handleExpandClick,
                    handleLockOrder,
                    confirmPending,
                    deleteItemFromOrder,
                    handleUnlockOrder,
                    deleteFullOrder
                }}
            >
                {this.props.children}
            </OrderContext.Provider>
        );
    }
}

export const OrderConsumer = OrderContext.Consumer;
