import Banner from "../../../layout/Banner";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import Category from "./Category";
import Outstanding_Product from "./Outstanding_Product";
import Policy from "./Policy";
import Product_Collection from "./Product_Collection";
import Sale from "./Sale";

const homePage = () => {
    return <>
        <Header></Header>
        <Banner></Banner>
        <Category></Category>
        <Sale></Sale>
        <Outstanding_Product></Outstanding_Product>
        <Product_Collection></Product_Collection>
        <Policy></Policy>
        <Footer></Footer>
    </>
}
export default homePage;