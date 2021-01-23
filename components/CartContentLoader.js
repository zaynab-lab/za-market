import ContentLoader from "react-content-loader";

const ImageLoader = () => (
  <ContentLoader
    speed={1}
    width={"100%"}
    height={"100%"}
    viewBox="-18 0 40 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="20" height="20" />
  </ContentLoader>
);

export default ImageLoader;

export const NameLoader = () => (
  <ContentLoader
    speed={1}
    width={"50%"}
    height={"20%"}
    viewBox="0 0 200 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="400" height="20" />
  </ContentLoader>
);
export const PriceLoader = () => (
  <ContentLoader
    speed={1}
    width={"20%"}
    height={"15%"}
    viewBox="0 0 60 15"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="2" ry="2" width="80" height="20" />
  </ContentLoader>
);
