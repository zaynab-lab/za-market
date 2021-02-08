import Head from "next/head";
import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";

const Layout = ({ children }) => {
  const lang = useRecoilValue(langState);
  return (
    <>
      <Head>
        <title>Za Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">{children}</div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          direction: ${lang === "en" ? "ltr" : "rtl"};
          font-family: sans-serif;
          -ms-scroll-chaining: none;
          overscroll-behavior: contain;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        @media only screen and (min-width: 450px) {
          .app {
            width: 450px;
            border: solid black;
            border-width: 0px 1px;
            margin: auto;
            position: relative;
            background-color: white;
            height: 100vh;
          }

          body {
            background-color: #eef1fe;
            background-image: url("../public/img/png/background.png");
            background-repeat: repeat;
          }
        }
      `}</style>
    </>
  );
};

export default Layout;
