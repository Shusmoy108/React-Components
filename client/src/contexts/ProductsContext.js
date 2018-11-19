import React, { Component } from "react";
import {
    editImage,
    getProducts,
    editProductDetails,
    editProductRating,
    addProduct,
    getAllFileNames,
    getCategories
} from "../axiosLib/productsAxios";
import {
    updateProductDetailsOnId,
    updateRatingOnProductId,
    insertNewProduct
} from "../validators/productValidators";

const ProductsContext = React.createContext();

export class ProductsProvider extends Component {
    state = {
        products: [],
        searchProducts: [],
        selectedProduct: [],
        fileNames: [],
        categories: [],
        search: false,
        page: 0,
        dialogValue: 0,
        rowsPerPage: 5,
        selectedImage: "",
        error: {},
        dialogOpen: false,
        editDialogOpen: false,
        ratingDialogOpen: false,
        addDialogOpen: false,
        file: "",
        name: "",
        pname: "",
        pcategory: "",
        ptype: "",
        ppage: "",
        poffer: false,
        ppercentage: "",
        pprofit: "",
        pcosting: "",
        phit: "",
        prating: ""
    };

    ////////////
    //Here
    ///////////
    setError = err => {
        this.setState({ error: err });
    };

    ////////////
    //Multiple Global
    ///////////
    handleChange = name => event => {
        // console.log(name, event.target.value);
        if (name === "poffer")
            return this.setState({ poffer: !this.state.poffer });
        this.setState({
            [name]: event.target.value
        });
    };

    // for all dialogs
    handleDialogOpen = (row, dialog) => {
        if (dialog === "image")
            this.setState({
                dialogOpen: true,
                name: row.name,
                selectedImage: row._id,
                error: {}
            });
        else if (dialog === "edit")
            this.setState({
                editDialogOpen: true,
                pname: row.name,
                pcategory: row.category,
                ptype: row.type.toString(),
                ppage: row.productPage,
                selectedImage: row._id,
                error: {}
            });
        else if (dialog === "rating")
            this.setState({
                ratingDialogOpen: true,
                selectedImage: row._id,
                prating: row.rating,
                error: {}
            });
        else if (dialog === "add")
            this.setState({
                addDialogOpen: true,
                selectedImage: row._id,
                error: {}
            });
    };

    //closing all dialogs
    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
            editDialogOpen: false,
            ratingDialogOpen: false,
            addDialogOpen: false,
            file: "",
            name: "",
            pname: "",
            pcategory: "",
            ptype: "",
            ppage: "",
            poffer: false,
            ppercentage: "",
            pprofit: "",
            pcosting: "",
            phit: "",
            prating: "",
            error: {}
        });
    };

    ///////////
    // ProductsTable.js
    ///////////
    // asxios call
    getAllProducts = () => {
        let that = this;
        getProducts((err, data) => {
            if (err) {
                this.setState({ errors: err });
            } else {
                let searchProducts = [];
                data.products.map(item =>
                    searchProducts.push({ label: item.name })
                );
                that.setState({
                    products: data.products,
                    searchProducts: searchProducts
                });
            }
        });
    };

    getAllCategories = () => {
        let that = this;
        getCategories((err, data) => {
            if (err) {
                this.setState({ errors: err });
            } else {
                let categories = [];
                data.categories.map(item => categories.push({ label: item }));
                that.setState({
                    categories: categories
                });
            }
        });
    };

    handleSearch = (event, data) => {
        event.preventDefault();
        let temp = [];
        this.state.products.forEach(
            (item, i) => (item.name === data ? (temp[0] = item) : null)
        );

        if (temp.length > 0)
            this.setState({ selectedProduct: temp, search: true, error: {} });
        else this.setState({ error: { msg: "Product not found" } });
    };

    // Back Button Handling
    handleBack = () => {
        this.setState({
            selectedProduct: [],
            search: false,
            error: {}
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    ///////////
    //EditImage.js
    ///////////
    handleDialogValueChange = (event, dialogValue) => {
        this.setState({ dialogValue });
    };

    ///////////
    //UploadImage.js
    ///////////
    handleFileChange = e => {
        this.setState({
            file: e.target.files[0]
        });
    };

    handleImageSubmit = e => {
        e.preventDefault();

        if (this.state.file === "") {
            return this.setState({ error: { msg: "No image has selected" } });
        }

        const bodyFormData = new FormData();
        bodyFormData.append("image", this.state.file, this.state.name);
        bodyFormData.append("upload", "true");

        let id = this.state.selectedImage;
        let data = {
            bodyFormData: bodyFormData,
            id: id
        };
        editImage(data, (err, result) => {
            if (err) {
                this.setError(err);
            } else {
                let newProducts = this.state.products;
                const imageLinkHover =
                    result.data.updatedProduct.imageLinkHover;

                this.state.products.map(
                    (item, i) =>
                        item._id === this.state.selectedImage
                            ? (newProducts[i].imageLinkHover = imageLinkHover)
                            : null
                );

                this.setState({
                    products: newProducts,
                    error: {},
                    selectedImage: "",
                    name: "",
                    file: ""
                });
                this.state.search
                    ? this.setState({
                          selectedProduct: [result.data.updatedProduct]
                      })
                    : (newProducts = []);
                this.handleDialogClose();
            }
        });
    };

    ///////////
    //ShowAllImages.js
    ///////////
    getFileNames = () => {
        getAllFileNames({ name: "images/products" }, (err, data) => {
            if (err) {
                this.setState({ errors: err });
            } else {
                // console.log(err, data);
                this.setState({
                    fileNames: data.data
                });
            }
        });
    };

    handleImageReplace = image => {
        const bodyFormData = new FormData();
        bodyFormData.append("upload", "false");
        bodyFormData.append("name", image);

        let id = this.state.selectedImage;
        let data = {
            bodyFormData: bodyFormData,
            id: id
        };
        editImage(data, (err, result) => {
            if (err) {
                this.setError(err);
            } else {
                let newProducts = this.state.products;
                const imageLinkHover =
                    result.data.updatedProduct.imageLinkHover;

                this.state.products.map(
                    (item, i) =>
                        item._id === this.state.selectedImage
                            ? (newProducts[i].imageLinkHover = imageLinkHover)
                            : null
                );

                this.setState({
                    products: newProducts,
                    error: {},
                    selectedImage: "",
                    name: ""
                });
                this.state.search
                    ? this.setState({
                          selectedProduct: [result.data.updatedProduct]
                      })
                    : (newProducts = []);
                this.handleDialogClose();
            }
        });
    };

    ///////////
    //EditProduct.js
    ///////////
    handleEditSubmit = e => {
        e.preventDefault();

        const data = {
            id: this.state.selectedImage,
            name: this.state.pname,
            category: this.state.pcategory,
            type: this.state.ptype.split(",").map(item => item.trim()),
            productPage: this.state.ppage
        };

        let { errors, isValid } = updateProductDetailsOnId(data);

        //Check Validation
        if (!isValid) {
            this.setError(errors);
        } else {
            editProductDetails(data, (err, result) => {
                // console.log(err, result, "res");
                if (err) {
                    this.setError(err);
                } else {
                    let newProducts = this.state.products;

                    this.state.products.map(
                        (item, i) =>
                            item._id === this.state.selectedImage
                                ? (newProducts[i] = result.data.updatedProduct)
                                : null
                    );

                    this.setState({
                        products: newProducts,
                        pname: "",
                        pcategory: "",
                        ptype: "",
                        ppage: "",
                        selectedImage: "",
                        error: {}
                    });
                    this.state.search
                        ? this.setState({
                              selectedProduct: [result.data.updatedProduct]
                          })
                        : (newProducts = []);
                    this.handleDialogClose();
                }
            });
        }
    };

    ///////////
    //EditRating.js
    ///////////
    handleRatingSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.selectedImage,
            rating: this.state.prating
        };

        let { errors, isValid } = updateRatingOnProductId(data);

        //Check Validation
        if (!isValid) {
            this.setError(errors);
        } else {
            editProductRating(data, (err, result) => {
                if (err) {
                    this.setError(err);
                } else {
                    let newProducts = this.state.products;

                    this.state.products.map(
                        (item, i) =>
                            item._id === this.state.selectedImage
                                ? (newProducts[i] = result.data.updatedProduct)
                                : null
                    );

                    this.setState({
                        products: newProducts,
                        prating: "",
                        selectedImage: "",
                        error: {}
                    });
                    this.state.search
                        ? this.setState({
                              selectedProduct: [result.data.updatedProduct]
                          })
                        : (newProducts = []);
                    this.handleDialogClose();
                }
            });
        }
    };

    ///////////
    //AddProduct.js
    ///////////
    handleAddSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.pname,
            category: this.state.pcategory,
            type: this.state.ptype,
            file: this.state.file,
            productPage: this.state.ppage,

            profitMargin: this.state.pprofit,
            costing: this.state.pcosting,

            offerAvailable: this.state.poffer,
            offerPercentage: this.state.poffer ? this.state.ppercentage : "",

            hitCount: this.state.phit,
            rating: this.state.prating
        };

        let { errors, isValid } = insertNewProduct(data);

        //Check Validation
        if (!isValid) {
            this.setError(errors);
        } else {
            addProduct(data, (err, result) => {
                // console.log(err, result, "res");
                if (err) {
                    this.setError(err);
                } else {
                    let searchProducts = [];
                    let newProduct = this.state.products;
                    newProduct.push(result.data.newProduct);
                    newProduct.forEach(item =>
                        searchProducts.push({ label: item.name })
                    );

                    this.setState({
                        products: newProduct,
                        searchProducts: searchProducts,
                        pname: "",
                        pcategory: "",
                        ptype: "",
                        ppage: "",
                        poffer: "",
                        ppercentage: "",
                        pprofit: "",
                        pcosting: "",
                        phit: "",
                        prating: "",
                        error: {}
                    });
                    this.state.search
                        ? this.setState({
                              selectedProduct: [result.data.newProduct]
                          })
                        : (err = "");

                    this.handleDialogClose();
                }
            });
        }
    };

    handleCategoryChange = value => {
        this.setState({ pcategory: value });
    };

    render() {
        const { children } = this.props;

        const {
            setError,
            handleDialogOpen,
            handleDialogClose,
            getAllProducts,
            handleChangePage,
            handleChangeRowsPerPage,
            handleDialogValueChange,
            handleFileChange,
            handleImageSubmit,
            handleImageReplace,
            handleEditSubmit,
            handleChange,
            handleRatingSubmit,
            handleAddSubmit,
            handleSearch,
            handleBack,
            getFileNames,
            handleCategoryChange,
            getAllCategories
        } = this;

        return (
            <ProductsContext.Provider
                value={{
                    ...this.state,
                    setError,
                    handleDialogOpen,
                    handleDialogClose,
                    getAllProducts,
                    handleChangePage,
                    handleChangeRowsPerPage,
                    handleDialogValueChange,
                    handleFileChange,
                    handleImageSubmit,
                    handleEditSubmit,
                    handleChange,
                    handleRatingSubmit,
                    handleAddSubmit,
                    handleSearch,
                    handleBack,
                    getFileNames,
                    handleImageReplace,
                    handleCategoryChange,
                    getAllCategories
                }}
            >
                {children}
            </ProductsContext.Provider>
        );
    }
}

export const ProductsConsumer = ProductsContext.Consumer;
