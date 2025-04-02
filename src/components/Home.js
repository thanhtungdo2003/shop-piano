import React, { useEffect, useState } from "react";
import Slideshow from "./SlideShow";
import ProductItem from "./ProductItem";

import uri, { getUri } from "../js/site";
import axios from "axios";
import { ArrowUpFromDot, Atom, BadgeCheck, Boxes, Check, CheckCircle, Clock, FlaskConical, FlaskConicalOff, HandCoins, HeartHandshake, Menu, Music, WineOff } from "lucide-react";
import slide1 from '../lib/banner-663886bc4edc3.jpg';
import slide2 from '../lib/banner-t-t-677fc5a6ce12c.png';
import imgStory1 from '../lib/story_img_1.jpg';
import imgStory2 from '../lib/story_img_2.jpg';
import { toast } from "react-toastify";
import { useProduct } from "./ProductsContext";
import { useNavigate } from "react-router-dom";
const slides = [
    slide1, slide2
];

function Home() {
    const [newProducts, setNewProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [bestSaleProducts, setBestSaleProducts] = useState([]);
    const { categorySlug, setCategorySlug } = useProduct();
    const nav = useNavigate();
    useEffect(() => {
        axios.get(`${getUri()}/category/get-all`)
            .then((res) => {
                const categorys = res.data;
                setCategorys(categorys)
            }).catch(err => {
                toast.error(err.status + " Lỗi");
            })
    }, [])
    useEffect(() => {
        axios.post(getUri() + "/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: "",
            sort: "newest",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                const productsDatas = res.data;

                setNewProducts(productsDatas.map((p, index) => {
                    const imgNames = JSON.parse(p.product_imgs);
                    const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                    return (<ProductItem
                        key={p.product_id}
                        id={p.product_id}
                        displayName={p.display_name}
                        categoryName={p.category_name}
                        price={p.price}
                        categorySlug={p.category_slug}
                        img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                    />)
                }))
            }).catch(err => {

            })

        //
        axios.post(getUri() + "/products-get-by-params", {
            row: 10,
            page: 1,
            keyword: "",
            sort: "bestsale",
            get_type: "user",
            category_slug: ""
        }, { withCredentials: true })
            .then((res) => {
                if (!res.data) return <></>;
                setBestSaleProducts(res.data)
            }).catch(err => {

            })
    }, [])
    return (
        <>
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>

                <div className="slide-show">
                    <Slideshow images={slides} />
                </div>
                <div className="category-container">
                    <div className="category-header">
                        <Menu /> DANH MỤC SẢN PHẨM
                    </div>
                    <div className="categorys-container">
                        {categorys.map((cate, index) => {
                            return <div className="category-item" onClick={(e) => {
                                setCategorySlug(cate.category_slug);
                                nav("/" + cate.category_slug);
                                window.scrollTo(0, 0);

                            }}>
                                <Music /> <span>{cate.category_name}</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className="mini-slide">
                <div>
                    <img src={imgStory1} />
                </div>
                <div>
                    <span>
                        Vào đầu thế kỷ 18, trong một xưởng chế tạo nhạc cụ nhỏ tại Florence, Ý, Bartolomeo Cristofori âm thầm làm việc với một ý tưởng có thể thay đổi âm nhạc mãi mãi. Ông không hài lòng với đàn harpsichord, thứ nhạc cụ phổ biến thời bấy giờ nhưng không thể điều chỉnh âm lượng theo lực nhấn phím. Ông muốn tạo ra một cây đàn có thể vừa nhẹ nhàng như làn gió, vừa mạnh mẽ như tiếng sấm. Sau nhiều năm thử nghiệm, ông chế tạo ra một nhạc cụ mới với cơ chế búa gõ vào dây, cho phép nghệ sĩ điều khiển sắc thái âm thanh chỉ bằng lực ngón tay. Ban đầu, phát minh của ông không được chú ý, nhưng theo thời gian, nó dần thay thế harpsichord, mở ra một kỷ nguyên mới cho âm nhạc. Cây đàn ấy được gọi là "pianoforte", về sau đơn giản hơn thành "piano", và trở thành một trong những nhạc cụ quan trọng nhất trong lịch sử nhân loại.
                    </span>
                </div>
            </div>
            <div className="product-container newproduct-container">
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM MỚI</p>
                    </div>
                </div>
                <div className="products">
                    {newProducts}
                </div>
            </div>
            <div className="mini-slide">

                <div>
                    <span>
                        Giữa những chiến trường khốc liệt của thế kỷ 19, tiếng đàn guitar vang lên giữa những người lính mệt mỏi, như một nguồn an ủi giữa bom đạn và chia ly. Đàn guitar, dù nhỏ bé, luôn hiện diện trong các cuộc chiến, từ những trại lính ở châu Âu cho đến những khu rừng rậm ở Mỹ Latin. Người lính mang theo cây đàn bên mình như một người bạn đồng hành, dùng nó để hát về quê hương, tình yêu và những nỗi nhớ xa xôi. Trong Thế chiến thứ hai, nhiều binh sĩ Mỹ cũng mang theo guitar để giải khuây, những bài hát blues và folk trở thành sợi dây kết nối giữa những con người xa lạ, bị cuốn vào vòng xoáy của lịch sử. Đàn guitar không chỉ là một nhạc cụ, mà còn là một biểu tượng của tinh thần con người, vang lên ngay cả trong những thời khắc đen tối nhất của chiến tranh.                    </span>
                </div>
                <div>
                    <img src={imgStory2} />
                </div>
            </div>
            <div className="product-container bestproduct-container">
                <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "30px" }}>
                    <div className="product-container-title">
                        <p>SẢN PHẨM NỔI BẬT</p>
                    </div>

                </div>
                <div className="products">
                    {bestSaleProducts.map((p, index) => {
                        const imgNames = JSON.parse(p.product_imgs);
                        const imageName = imgNames.find(i => i.startsWith('1-'))?.split('-')[1] || imgNames[0].split('-')[1];

                        return (<ProductItem
                            key={p.product_id}
                            id={p.product_id}
                            displayName={p.display_name}
                            categoryName={p.category_name}
                            price={p.price}
                            categorySlug={p.category_slug}
                            img={getUri() + `/product/get-imgs/product_imgs/` + imageName}
                        />)
                    })}
                </div>
            </div>
        </>
    )
}
export default Home;