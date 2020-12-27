import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={1}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 97 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="7" y="6" rx="5" ry="5" width="83" height="73" />
    <rect x="26" y="88" rx="2" ry="2" width="47" height="8" />
  </ContentLoader>
);

export default MyLoader;
