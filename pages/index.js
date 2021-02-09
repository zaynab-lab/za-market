import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadData from "../components/LoadData";
import SlideShow, { ArSlideShow } from "../components/SlideShow";
import { useRouter } from "next/router";
import SnakBar from "../components/SnakBar";
import { langState } from "./menu";

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
  const lang = useRecoilValue(langState);
  const dictionary = { category: { en: "Za-Market", ar: "الفئات" } };
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
    setTimeout(() => setSnak(""), 4000);
  };
  const router = useRouter();
  const { msg } = router.query;
  const { code } = router.query;

  useEffect(() => {
    code && localStorage.setItem("invitedBy", code);
    msg && fire(msg);
    msg && router.push("/");
  }, [code, msg, router]);

  return (
    <>
      <TopBar title={dictionary.category[lang]} cart={true} main={true} />
      <div className="container">
        {/* <OrderBar /> */}
        {lang === "en" ? <SlideShow /> : <ArSlideShow />}
        <div className="imgContainer">
          {lang === "ar" ? (
            <div className="img">
              <img width="200rem" src="/img/png/Flame.png" alt="" />
            </div>
          ) : (
            <></>
          )}
          <div className="img">
            <img width="100rem" src="/img/png/Logo.png" alt="" />
          </div>
          {lang === "en" ? (
            <div className="img">
              <img width="200rem" src="/img/png/bestOffers.png" alt="" />
            </div>
          ) : (
            <></>
          )}
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
        .imgContainer {
          display: flex;
          align-items: space-evenly;
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
