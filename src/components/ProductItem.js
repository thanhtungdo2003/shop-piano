import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
const container = () => { return <div></div> }
const ContainerStyled = styled.div`
    background-color:rgb(255, 255, 255);
    margin: 10px 0px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.13);
    cursor: pointer;
    color: rgb(26, 26, 26);
    .product-item-prop{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowarp;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    &:hover{
        transition-duration: 0.3s;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.17);
    }
    &:active{
        transition-duration: 0.3s;
        box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.17);
    }
`;
function ProductItem({ id, displayName, categoryName, price, img, categorySlug }) {
    const nav = useNavigate();

    const handlerClick = (e) => {
        nav(`/${categorySlug}/${e.currentTarget.id}`);
        window.scrollTo(0, 0); // Cuộn lên đầu trang

    }
    return (
        <>
            <ContainerStyled onClick={handlerClick} id={id}>
                <div className="product-item-img-container" style={{
                    maxWidth:"100%", maxHeight:"200px", padding:"10px", overflow:"hidden"
                }}>
                    <img className="product-item-img" src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{backgroundColor:"#333", padding:"10px", position:"relative"}}>
                    <div className="product-item-prop" style={{ fontSize: "18px", color:"white" }}>{displayName}</div>
                    <div >
                        <div className="product-item-prop" style={{ fontSize: "12px", color: "#ddd" }}>{categoryName}</div>
                        <div className="product-item-prop" style={{ fontSize: "23px", fontWeight: "550", color: "rgb(255, 255, 255)" }}>{"đ " + price.toLocaleString('de-DE')}</div>
                    </div>
                    <div style={{position:"absolute", right:"10px", bottom:"10px"}}>
                        <button style={{
                            width:"50px",
                            height:"50px",
                            borderRadius:"50%",
                            cursor:"pointer"
                        }}>
                            <ShoppingCart/>+
                        </button>
                    </div>

                </div>
            </ContainerStyled>
        </>
    )
}
export default ProductItem;