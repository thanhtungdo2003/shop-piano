import axios from "axios";
import { useEffect, useState } from "react";
import { getUri } from "../js/site";
import { toast } from "react-toastify";
import logoPng from '../lib/logo_music.png'
import { Facebook, Locate, MapPin, Phone, Youtube } from "lucide-react";

function ShopFooter() {
    const [cateItems, setCateItem] = useState([]);
    useEffect(() => {
        axios.get(`${getUri()}/category/get-all`)
            .then((res) => {
                const categorys = res.data;
                setCateItem(categorys.map((cate, index) => {
                    return <a style={{ cursor: "pointer" }}>{cate.category_name}, </a>;
                }))
            }).catch(err => {
                toast.error(err.status + " Lỗi máy chủ");
            })
    }, [])
    return (
        <>
            <div className="scrollback-container">
                <a href="#container"><button>Lên trên cùng</button></a>
            </div>
            <div class="footer-2">
                <div class="footer-gioithieu">
                    <div>MUSIC CONCERT</div>
                    <span>
                        <img src={logoPng} style={{width:"100px", borderRadius:"20px"}}/>
                    </span>
                </div>
                <div class="footer-top">
                    
                </div>
                <div class="footer-location">
                    <div>LIÊN HỆ VỚI CHÚNG TÔI</div>
                    <div>
                        <div>
                            <Facebook/> <a href="mailto:shopp@gmail.com">shopp@gmail.com</a>
                        </div>
                        <div>
                            <Youtube/> <a href="https://youtube.com/shopmusic">https://youtube.com/shopmusic</a>
                        </div>
                        <div>
                            <Phone/> 02893474634 VN
                        </div>
                        <div>
                            <MapPin/> MusicConcert-HaNoi-VietNam
                        </div>
                    </div>
                </div>
                <div class="footer-category">
                    <div>DANH MỤC</div>
                    <div>
                        {cateItems}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShopFooter;