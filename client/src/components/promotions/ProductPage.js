import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SearchEngine from "./SearchEngine";
import Grid from "@material-ui/core/Grid";
import ProductTable from "./ProductTable";
import { getProducts } from "../../axiosLib/promotionsAxios";
import FormHelperText from "@material-ui/core/FormHelperText";
import BackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {},
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
let tagname = [];
class ProductPage extends React.Component {
  state = {
    value: 0,
    addbool: false,
    tagname: [],
    products: [],
    searchProduct: [],
    searchBool: false,
    errors: {}
  };

  //handle Products Change
  handleProductsChange = (position, changedValue) => {
    let newProducts = this.state.products;
    newProducts[position] = changedValue;
    this.setState({ products: newProducts });
    if (this.state.searchBool) {
      this.setState({ searchProduct: [newProducts[position]] });
    }
  };

  handleClickOpen = () => {
    this.setState({ addbool: true });
  };

  handleClose = () => {
    this.setState({ addbool: false });
  };
  handleAdd = (tagname, offeravailable, offerpercentage, profitmargin) => {
    console.log(tagname, offeravailable, offerpercentage, profitmargin, "add");
  };
  ////
  // Search Handling
  ////
  handleSearch = e => {
    let index = this.state.products.findIndex(item => item.name === e);
    if (index > -1) {
      this.setState({
        searchProduct: [this.state.products[index]],
        searchBool: true,
        errors: {}
      });
    } else {
      this.setState({ errors: { msg: "Data Not Found" } });
    }
  };

  // Back Button Handling
  handleBack = () => {
    this.setState({
      searchProduct: [],
      searchBool: false,
      errors: {}
    });
  };

  componentDidMount = () => {
    let that = this;
    tagname = [];
    getProducts((err, data) => {
      if (err) {
        this.setState({ errors: err });
      } else {
        data.products.map(item => tagname.push({ label: item.name }));
        that.setState({ tagname: tagname, products: data.products });
      }
    });
  };
  render() {
    let productTable;
    if (this.state.searchBool) {
      productTable = (
        <ProductTable
          products={this.state.searchProduct}
          handleProductsChange={this.handleProductsChange}
        />
      );
    } else {
      productTable = (
        <ProductTable
          products={this.state.products}
          handleProductsChange={this.handleProductsChange}
        />
      );
    }
    return (
      <div>
        <Grid container style={{ margin: "3% 0% 0%" }}>
          <Grid item sm={1} />
          <Grid item sm={2}>
            {this.state.searchBool ? (
              <Button variant="outlined" onClick={this.handleBack}>
                <BackIcon />
              </Button>
            ) : null}
          </Grid>
          <Grid item sm={4}>
            <FormHelperText style={{ color: "red", fontSize: 17 }}>
              {this.state.errors.msg}
            </FormHelperText>
          </Grid>
          <Grid item sm={4}>
            <SearchEngine
              options={this.state.tagname}
              search={this.handleSearch}
              searchField={"Product"}
            />
          </Grid>
          <Grid item sm={1} />
        </Grid>
        {productTable}
      </div>
    );
  }
}

ProductPage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProductPage);
