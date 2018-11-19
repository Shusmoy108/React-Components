const order = [
    {
        delivery: {
            status: "pending",
            name: "anik",
            address: "Banasree",
            phone: "01990522802",
            region: "Dhaka",
            area: "rampura",
            city: "dhaka"
        },
        createdAt: "2018-11-03T11:08:00.290Z",
        pending: true,
        inDesign: false,
        inProduction: false,
        inDelivery: false,
        delivered: false,
        adminId: "5bdd81a133b0ad2d565e1a1c",
        lock: true,
        _id: "5bdd81a133b0ad2d565e1a1c",
        userId: "5bd5c3a149174a1119a5853b",
        orderId: "03/11/18-742J",
        payment: {
            status: "pending",
            method: "cash-on-delivery"
        },
        items: [
            {
                offerAvailable: false,
                offerPercentage: 0,
                _id: "5bcec6d108548821360afd61",
                productId: "5bced0288087f2292aa12963",
                templateId: "5bced0288087f2292aa12964",
                templateName: "color mug",
                designedPicture: "10.jpg",
                productName: "mug",
                details: "This is design 41000",
                quantity: 10,
                total: 10000,
                profitMargin: 75,
                costing: 25,
                aiFile: "a.jpg"
            },
            {
                offerAvailable: true,
                offerPercentage: 15,
                _id: "5bcec6d108548821360afd61",
                productId: "5bced0288087f2292aa12969",
                templateId: "5bced0288087f2292aa12969",
                templateName: "color jug",
                designedPicture: "9.jpg",
                productName: "jug",
                details: "This is design 91000",
                quantity: 90,
                total: 99999,
                profitMargin: 95,
                costing: 5,
                aiFile: "b.jpg"
            }
        ],
        __v: 0
    },
    {
        delivery: {
            status: "pending",
            name: "anik",
            address: "Banasree",
            phone: "01990522802",
            region: "Dhaka",
            area: "rampura",
            city: "dhaka"
        },
        createdAt: "2018-11-03T11:08:00.290Z",
        pending: true,
        inDesign: false,
        inProduction: false,
        inDelivery: false,
        delivered: false,
        lock: false,
        adminId: "",
        _id: "5bdd81a133b0ad2d565e1a1c",
        userId: "5bd5c3a149174a1119a5853b",
        orderId: "03/11/18-742J",
        payment: {
            status: "pending",
            method: "cash-on-delivery"
        },
        items: [
            {
                offerAvailable: true,
                offerPercentage: 15,
                _id: "5bcec6d108548821360afd61",
                productId: "5bced0288087f2292aa12963",
                templateId: "5bced0288087f2292aa12964",
                templateName: "color mug",
                designedPicture: "10.jpg",
                productName: "mug",
                details: "This is design 41000",
                quantity: 10,
                total: 10000,
                profitMargin: 75,
                costing: 25,
                aiFile: "a.jpg"
            },
            {
                offerAvailable: false,
                offerPercentage: 0,
                _id: "5bcec6d108548821360afd61",
                productId: "5bced0288087f2292aa12969",
                templateId: "5bced0288087f2292aa12969",
                templateName: "color jug",
                designedPicture: "9.jpg",
                productName: "jug",
                details: "This is design 91000",
                quantity: 90,
                total: 90000,
                profitMargin: 95,
                costing: 5,
                aiFile: "b.jpg"
            }
        ],
        __v: 0
    }
];

export default order;

// {row.items.map(
//     (template, i) => (
//         <div
//             className={
//                 classes.items
//             }
//             key={i}
//         >
//             <div
//                 className={
//                     classes.flexOne
//                 }
//             >
//                 Product Name
//             </div>
//             <div
//                 className={
//                     classes.flexOne
//                 }
//             >
//                 <img
//                     className={
//                         classes.img
//                     }
//                     src={
//                         "images/" +
//                         template.designedPicture
//                     }
//                     alt={
//                         "images/" +
//                         template.designedPicture
//                     }
//                 />
//             </div>
//             <div
//                 className={
//                     classes.flexOne
//                 }
//             >
//                 <b>
//                     {
//                         template.templateName
//                     }
//                 </b>
//                 <Typography
//                     variant="caption"
//                     gutterBottom
//                 >
//                     {
//                         template.quantity
//                     }
//                 </Typography>
//             </div>

//             <div
//                 className={
//                     classes.flexOne
//                 }
//             >
//                 <b>
//                     {
//                         template.quantity
//                     }
//                 </b>
//                 <Typography
//                     variant="caption"
//                     gutterBottom
//                 >
//                     {
//                         template.profitMargin
//                     }
//                     %
//                 </Typography>
//             </div>
//             <div
//                 className={
//                     classes.flexOne
//                 }
//             >
//                 <Button
//                     variant="outlined"
//                     onClick={() =>
//                         handleLockClick(
//                             row._id
//                         )
//                     }
//                     className={
//                         classes.button
//                     }
//                     size="small"
//                     color="primary"
//                 >
//                     Action
//                 </Button>
//             </div>
//         </div>
//     )
// )}
