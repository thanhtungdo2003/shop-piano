import axios from "axios";
import { Boxes, PlusSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminProductItem from "./AdminProductitem";
import { useManager } from "./AdminContext";
import { InputAdornment, TextField } from "@mui/material";

function AdminProductListByCate() {
    const { category_slug } = useParams();
    const [products, setProducts] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [keyword, setKeyword] = useState("");
    const productManager = useManager();
    useEffect(() => {
        axios.post("http://localhost:3000/api/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: keyword,
            category_slug: category_slug,
            sort: "newest",
            get_type: "admin"
        }, {withCredentials:true}).then((res) => {

            if (!res.data) return <></>;
            const productsDatas = res.data;
            setCategoryName("");

            setProducts(productsDatas.map((p, index) => {
                const imgNames = JSON.parse(p.product_imgs);
                const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];
                setCategoryName(p.category_name)

                return (<AdminProductItem
                    key={p.product_id}
                    id={p.product_id}
                    displayName={p.display_name}
                    categoryName={p.category_name}
                    price={p.price}
                    categorySlug={p.category_slug}
                    createAt={p.create_at}
                    status={p.status}
                    img={`http://localhost:3000/api/product/get-imgs/product_imgs/` + imageName}
                />)
            }))
        })
    }, [category_slug, productManager.trigger, keyword])
    return (
        <>
            <div className="category-admin-title">
                <div className="titles">
                    <Boxes color="rgb(119, 119, 119)" size="4vh" />
                    <p style={{ flex: "10", fontSize: "2.6vh", width: "50vh", color: "rgb(120, 120, 120)", borderBottom: "3% solid rgb(100, 100, 100)" }}>Danh sách sản phẩm ({categoryName})</p>
                </div>
                <div className="search-bar" style={{ width: "70%" }}>
                    <TextField fullWidth
                        label="Tìm kiếm"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                    />
                </div>
                
            </div>
            <div className="admin-product-items">
                {products}
            </div>
        </>
    )
}
export default AdminProductListByCate;