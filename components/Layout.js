import Head from "next/head";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Za Market</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="app">{children}</div>
  </>
);

export default Layout;
