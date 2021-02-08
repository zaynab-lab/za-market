import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";
import { styles } from "../public/js/styles";

export default function SlideShow() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    method: { en: "The", ar: "الطريقة" },
    cheapest: { en: "cheapest", ar: "الأوفر" },
    easiest: { en: "easiest", ar: "الأسهل" },
    funnest: { en: "funnest", ar: "الأمتع" },
    shop: { en: "way for shopping", ar: "للتسوق" }
  };

  return (
    <>
      <div className="container">
        {dictionary.method[lang]}
        <div className="flipContainer">
          <div className="flip">
            <div className="item1">{dictionary.cheapest[lang]}</div>
            <div className="item"></div>
            <div className="item2">{dictionary.easiest[lang]}</div>
            <div className="item"></div>
            <div className="item3">{dictionary.funnest[lang]}</div>
            <div className="item"></div>
          </div>
        </div>
        {dictionary.shop[lang]}
      </div>
      <style jsx>{`
        .container {
          color: #999;
          font-size: 1.4rem;
          font-weight: bold;
          width: 100%;
          padding: 0.5rem 0.8rem;
          padding-bottom: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          height: 2rem;
        }
        .flipContainer {
          overflow: hidden;
        }
        .flip {
          color: white;
          height: 2rem;
          animation-name: flip;
          animation-duration: 6s;
          animation-iteration-count: infinite;
        }
        .flip div {
          padding: 0.2rem 0.4rem;
          margin: 0 0.4rem;
          text-align: center;
        }
        .item {
          height: 1.5rem;
        }
        .item1 {
          background: ${styles.primaryColorLight};
        }
        .item2 {
          background: ${styles.secondaryColor};
        }
        .item3 {
          background: #999;
        }
        @-webkit-keyframes flip {
          0% {
            -webkit-transform: translateY(-9rem);
            transform: translateY(-9rem);
          }
          11% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          33% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          44% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          66% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          77% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
          100% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
        }
        @keyframes flip {
          0% {
            -webkit-transform: translateY(-9rem);
            transform: translateY(-9rem);
          }
          11% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          33% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          44% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          66% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          77% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
          100% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
        }
        @keyframes flip {
          0% {
            -webkit-transform: translateY(-9rem);
            transform: translateY(-9rem);
          }
          11% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          33% {
            -webkit-transform: translateY(-7.3rem);
            transform: translateY(-7.3rem);
          }
          44% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          66% {
            -webkit-transform: translateY(-3.85rem);
            transform: translateY(-3.85rem);
          }
          77% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
          100% {
            -webkit-transform: translateY(-0.3rem);
            transform: translateY(-0.3rem);
          }
        }
      `}</style>
    </>
  );
}

export function ArSlideShow() {
  return (
    <>
      <div className="container">
        الطريقة
        <div className="flip">
          <div>الأسهل</div>
          <div>الأوفر</div>
          <div>الأمتع</div>
        </div>
        للتسوق
      </div>

      <style jsx>{`
        .container {
          color: #999;
          font-size: 1.6rem;
          font-weight: bold;
          width: 100%;
          padding: 0.5rem 0.8rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          min-height: 3.4rem;
        }

        .flip {
          height: 3.2rem;
          overflow: hidden;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .flip > div {
          color: #fff;
          padding: 0.2rem 0.8rem;
          margin: 0 1.2rem;
          height: 3rem;
          margin-bottom: 3rem;
          display: inline-block;
        }

        .flip div:first-child {
          -webkit-animation: show 5s linear infinite;
          animation: show 5s linear infinite;
        }

        .flip div {
          background: ${styles.primaryColorLight};
        }

        .flip div:first-child {
          background: ${styles.secondaryColor};
        }

        .flip div:last-child {
          background: #999;
        }

        @-webkit-keyframes show {
          0% {
            margin-top: -20rem;
          }

          5% {
            margin-top: -12.2rem;
          }

          33% {
            margin-top: -12.2rem;
          }

          38% {
            margin-top: -6.2rem;
          }

          66% {
            margin-top: -6.2rem;
          }

          71% {
            margin-top: -0.2rem;
          }

          99.99% {
            margin-top: -0.2rem;
          }

          100% {
            margin-top: -20px;
          }
        }

        @keyframes show {
          0% {
            margin-top: -20rem;
          }

          5% {
            margin-top: -12.2rem;
          }

          33% {
            margin-top: -12.2rem;
          }

          38% {
            margin-top: -6.2rem;
          }

          66% {
            margin-top: -6.2rem;
          }

          71% {
            margin-top: -0.2rem;
          }

          99.99% {
            margin-top: -0.2rem;
          }

          100% {
            margin-top: -20px;
          }
        }
      `}</style>
    </>
  );
}
