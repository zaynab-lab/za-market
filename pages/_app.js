import "../css/styles.css";
import Layout from "../components/Layout";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
