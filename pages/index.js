import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import OrderBar from "../components/OrderBar";
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadData from "../components/LoadData";
import SlideShow from "../components/SlideShow";
import { useRouter } from "next/router";
import SnakBar from "../components/SnakBar";

export const productsState = atom({
  key: "productList",
  default: []
});
export const categoriesState = atom({
  key: "categoryList",
  default: []
});

export default function IndexPage() {
  const [categoryListInfo, setCategoryListInfo] = useRecoilState(
    categoriesState
  );
  const [categoryList, setCategoryList] = useState(categoryListInfo);
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      setCategoryList(data);
      setCategoryListInfo(data);
    });
  }, [setCategoryList, setCategoryListInfo]);
  const [snak, setSnak] = useState("");
  const fire = (message) => {
    setSnak({ message, show: true });
    setTimeout(() => setSnak(""), 3000);
  };
  const router = useRouter();
  const { msg } = router.query;

  useEffect(() => {
    msg && fire(msg);
    msg && router.push("/");
  }, [msg, router]);

  return (
    <>
      <TopBar title="الفئات" cart={true} main={true} />
      <div className="container">
        {/* <OrderBar /> */}
        <SlideShow />
        <div className="img">
          <img width="160rem" src="/img/png/Logo.png" alt="" />
        </div>
        <CategoryItems categories={categoryList} />
      </div>
      <SnakBar show={snak.show} message={snak.message} />
      <LoadData />
      <style jsx>{`
        .container {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          height: calc(100vh - 3rem);
          overflow: auto;
        }
        .img {
          margin: auto;
        }
      `}</style>
    </>
  );
}

// IndexPage.getInitialProps = async () => {
//   return axios.get("http://localhost:3000/api/categories").then((res) => {
//     const { data } = res;
//     return { categories: data };
//   });
// };
