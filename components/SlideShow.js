import { styles } from "../public/js/styles";

export default function SlideShow() {
  return (
    <>
      <div className="container">
        الطريقة
        <div className="flip">
          <div>الأوفر</div>
          <div>الأسهل</div>
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
