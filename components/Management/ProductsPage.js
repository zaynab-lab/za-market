import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import EditProduct from "./components/EditProduct";
import ProductCard from "./components/ProductCard";
import CategoryList from "./components/CategoryList";

export default function ProductsPage() {
  const [roles, setRoles] = useState("");
  const [selected, setSelected] = useState("Vegetables");
  const [productList, setProductsList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get(`/api/products/Vegetables`).then((res) => {
      const { data } = res;
      setProductsList(data);
    });
  }, [setRoles]);

  const select = (selected) => {
    axios.get(`/api/products/${selected}`).then((res) => {
      const { data } = res;
      setProductsList([]);
      setProductsList(data);
      setSelected(selected);
    });
  };
  const setActionById = async (id, action, state, callback) => {
    switch (action) {
      case "appear":
        axios
          .put(
            `/api/products/id/${id}`,
            { [action]: !state },
            { "content-type": "application/json" }
          )
          .then((res) => {
            const { data } = res;
            data === "done" && callback(!state);
          });
        break;
      case "exist":
        axios
          .put(
            `/api/products/id/${id}`,
            { [action]: !state },
            { "content-type": "application/json" }
          )
          .then((res) => {
            const { data } = res;
            data === "done" && callback(!state);
          });

        break;
      case "edit":
        setCurrentProduct(state);
        setModal(true);
        break;
      case "delete":
        setProductsList([]);
        setProductsList(await productList.filter((obj) => obj._id !== id));
        setModal(false);
        break;
      case "update":
        setProductsList([]);
        setProductsList(
          await productList.map((obj) => {
            return obj._id !== id ? obj : { obj, ...state };
          })
        );
        setModal(false);
        break;
      default:
        axios.get(`/api/products/${selected}`).then((res) => {
          const { data } = res;
          setProductsList([]);
          setProductsList(data);
        });
    }
  };
  return (
    <>
      {roles.includes("productsManager") && (
        <div className="container">
          <CategoryList selected={selected} select={select.bind(this)} />
          <>
            {productList.map((obj, index) => (
              <ProductCard
                setActionById={setActionById.bind(this)}
                key={index}
                product={obj}
              />
            ))}
          </>

          {modal && (
            <Modal
              add={false}
              setModal={setModal}
              children={
                <EditProduct
                  product={currentProduct}
                  refresh={setActionById.bind(this)}
                  GM={roles.includes("GM")}
                />
              }
            />
          )}

          <Modal
            add={true}
            refresh={setActionById}
            children={<EditProduct add={true} />}
          />
        </div>
      )}

      <style jsx>{`
        .container {
          height: calc(100vh - 6.1rem);
          overflow: auto;
        }
      `}</style>
    </>
  );
}
