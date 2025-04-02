import React, { useEffect, useRef, useState } from "react";
import Button from "@atlaskit/button";
import Logo from "../components/logo";
import {TextField} from "@mui/material"
import SearchIcon from "@atlaskit/icon/glyph/search"
import Cart from "../components/cart";
import ShopFooter from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import { getLengthCart, getUri } from "../js/site";
import axios from "axios";
import userIcon from "../lib/profile-user.png"
import { toast, ToastContainer } from "react-toastify";
import { Box, ChevronDown, Contact, Droplet, Facebook, LogOutIcon, Phone, PhoneCall, Search, SearchCheckIcon, Settings2Icon, ShoppingBagIcon, User, UserCog2Icon, UserCogIcon, UserPen, X, Youtube } from "lucide-react";

import Swal from "sweetalert2";

import CateItem from "./cateitem";
import { ProductProvider } from "./ProductsContext";


function MainLayout() {
    const [lengthCart, setLengthCart] = useState(0);
    const nav = useNavigate();
    const [accountNav, setAccountNav] = useState(<></>)
    const [userMenuStage, setUserMenuStage] = useState("hide");
    const [trigger, setTrigger] = useState(0);
    const [query, setQuery] = useState("");

    const logout = () => {
        Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Đăng xuất tài khoản",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3000/api/user/logout", {}, { withCredentials: true }).then((res) => {
                    if (res.data.statusCode === 200) {
                        setTrigger(trigger + 1)
                    }
                }).catch((err) => {
                    toast.success("Lỗi khi đăng xuất", { position: "top-right" })
                })
            }
        }).catch(err => {
            toast.error(err.status + " Lỗi");
        })

    }
    useEffect(() => {
        const timer = setInterval(() => { setLengthCart(getLengthCart()) }, 700)
        return () => clearTimeout(timer);
    });
    const checkPerm = (userData) => {
        console.log(userData)
        const rawPerms = userData.permissions;
        if (rawPerms) {
            const perms = JSON.parse(rawPerms);
            if (["op", "admin", "*"].some(role => perms.includes(role))) {
                return (<>
                    <div className="manager-nav-item" onClick={() => nav("/manager")}>
                        <UserCog2Icon color="rgb(220, 171, 10)" className="user-menu-item-icon" size={24} /><p style={{ color: "rgb(220, 171,10)" }}>Trang quản lý</p>
                    </div>
                </>)
            }
        }
        return <></>
    }

    const [cateItems, setCateItem] = useState([]);
    useEffect(() => {
        axios.get(`${getUri()}/category/get-all`)
            .then((res) => {
                const categorys = res.data;
                setCateItem(categorys.map((cate, index) => {
                    return <CateItem id={cate.category_id} slug={cate.category_slug} content={cate.category_name} />
                }))
            }).catch(err => {
                toast.error(err.status + " Lỗi");
            })
    }, [])
    useEffect(() => {
        const rawUser = localStorage.getItem('shop-fashion-user-data');
        if (rawUser) {
            axios.post("http://localhost:3000/api/user/auth", {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    const userData = res.data.user;
                    localStorage.setItem('shop-fashion-user-data', JSON.stringify(userData));
                    setAccountNav(<>
                        <div className="user-nav" style={{ margin: "auto 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", position: "relative" }}>
                            
                            <div style={{ width: "130px", height: "50px", cursor: "pointer" }} onClick={() => { setUserMenuStage(userMenuStage === "hide" ? "show" : "hide") }}>
                                <div style={{ height: "25px", display: "flex", gap: "5px", alignItems: "center" }}>
                                    <p style={{ color: "rgb(59, 59, 59)", fontWeight: "550" }}>Toài khoản</p>
                                    <div style={{ width: "24px", height: "24px" }}>
                                        <ChevronDown/>
                                    </div>
                                </div>
                                <div style={{ height: "25px", fontSize: "14px", color: "rgb(98, 98, 98)" }}>
                                    {userData.username}
                                </div>
                            </div>
                            <div className="user-menu-contaner">
                               
                                {checkPerm(userData)}
                                <div className="user-menu-item" onClick={logout}>
                                    <LogOutIcon color="rgb(191, 59, 59)" className="user-menu-item-icon" size={24} /><p style={{ color: "rgb(196, 39, 39)" }}>Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            }).catch((err) => {
                console.log(err);
                setAccountNav(<>
                    <button style={{ color: "white", width: "150px", cursor: "pointer", height: "40px", backgroundColor: "transparent", fontSize: "16px", fontWeight: "550", outline: "none", border: "none" }} onClick={() => {
                        nav("/account");
                    }}>Tài khoản</button>
                </>)
            })
        } else {
            setAccountNav(<>
                <button style={{ color: "white", width: "150px", cursor: "pointer", height: "40px", backgroundColor: "transparent", fontSize: "16px", fontWeight: "550", outline: "none", border: "none" }} onClick={() => {
                    nav("/account");
                }}>Tài khoản</button>
            </>)
        }
    }, [trigger])
    const search = (query) => {
        nav("/search_query/" + query);
    }
    const keyDownHandle = (e) => {
        if (e.key === "Enter") {
            const keyword = e.target.value;
            search(keyword);
        }
    }
    return (
        <>
            <ProductProvider>

                <ToastContainer />
                <div id="container" className="container">
                    <header>
                        <div className="header-container">
                            <div className="option-header">
                                <div className="option-header-content">
                                    <Logo />
                                    <button className="open-search-box-btn"><SearchIcon /></button>
                                    <div className="search-box">
                                        <Search/>
                                        <input onKeyDown={keyDownHandle} placeholder="nhập nội dung cần tìm..." id="search-textbox"
                                            style={{ display: "flex", alignItems: "center", borderRadius: "10px" }}
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    {accountNav}

                                    <Cart value={lengthCart} />
                                </div>
                            </div>
                            
                            <div className="nav-header">
                                <div className="nav-container">
                                    <div className="nav-left">
                                        <ul>
                                            <li><a href="/">TRANG CHỦ</a></li>
                                            <li className="category-nav"><a href="/">DANH MỤC</a>
                                                <div className="cate-menu">
                                                    <div className="cate-container">
                                                        <div style={{ fontWeight: "550", marginBottom: "10px", fontSize: "18px" }}>DANH MỤC SẢN PHẨM</div>
                                                        <div className="cates">
                                                            {cateItems}
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>
                                            <li><a href="/product">SẢN PHẨM</a></li>
                                            <li><a>BLOG</a></li>
                                        </ul>
                                    </div>
                                    <div className="nav-right">
                                        <ul>
                                            <li><a href="mailto:musiccocert@gmail.com">musiccocert@gmail.com</a></li>
                                            <li><a>Hà Nội: 0389055070</a></li>
                                            <li><a>Hưng Yên: 0389055070</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                    <footer>
                        <ShopFooter />
                    </footer>
                    <div className="contacts-container">
                        <PhoneCall size="auto" color="white" />
                        <div className="contact-item facebook">
                            <Facebook size="auto" color="white" />
                        </div>
                        <div className="contact-item youtube">
                            <Youtube size="auto" color="white" />
                        </div>
                        <div className="contact-item phone">
                            <PhoneCall size="auto" color="white" />
                        </div>
                    </div>
                </div>
            </ProductProvider>

        </>
    )
}
export default MainLayout;