import ContentLoader from "react-content-loader";

const ImageLoader = () => (
  <ContentLoader
    speed={1}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 96 82"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="7" y="4" rx="5" ry="5" width="83" height="73" />
  </ContentLoader>
);

export default ImageLoader;

export const PriceLoader = () => (
  <ContentLoader
    speed={1}
    width={"40%"}
    height={"40%"}
    viewBox="0 0 300 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="9" y="7" rx="2" ry="2" width="284" height="25" />
  </ContentLoader>
);
