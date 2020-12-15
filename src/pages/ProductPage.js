import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProductsAction,
  fetchCategoriesAction,
  fetchbyCategoryAction,
} from "../redux/action";
import Select from "react-select";
import { ProductCard } from "../components";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

class ProductPage extends Component {
  state = {
    selectedCategory: "",
  };

  componentDidMount() {
    const { fetchCategoriesAction, fetchProductsAction } = this.props;
    fetchCategoriesAction();
    fetchProductsAction();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("did update");
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      this.props.fetchbyCategoryAction(this.state.selectedCategory);
    }
  }

  renderCategoryList = () => {
    //[{id: 1, category: "iphone"}]
    //[{value : "iphone", label: "iphone"}]
    let newArr = this.props.categories.map((val) => {
      return { value: val.id, label: val.category };
    });
    return <Select options={newArr} onChange={this.onChangeCategory} />;
  };

  onChangeCategory = (e) => {
    // console.log(e);
    this.setState({
      selectedCategory: e.value,
    });
    console.log(this.state.selectedCategory);
  };

  renderProductList = () => {
    return this.props.productList.map((val) => {
      return (
        <div className="m-2">
          <Link to={`/product-detail?id=${val.id}`}>
            <ProductCard image={val.image} name={val.name} price={val.price} />
          </Link>
        </div>
      );
    });
  };

  render() {
    if (this.props.loading) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-3">
          <div>
            <h5>Categories</h5>
          </div>
          <div>{this.renderCategoryList()}</div>
        </div>
        <div className="col-9" style={{ display: "flex", flexWrap: "wrap" }}>
          {this.renderProductList()}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    categories: state.products.categories,
    productList: state.products.productList,
    loading: state.products.loading,
  };
};

export default connect(mapStatetoProps, {
  fetchCategoriesAction,
  fetchProductsAction,
  fetchbyCategoryAction,
})(ProductPage);
