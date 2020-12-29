import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { styles } from "../../../public/js/styles";

export default function CreateSelect({ placeholder, initOptions, url, name }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(initOptions);
  const [activeOne, setActiveOne] = useState(0);
  const [search, setSearch] = useState(initOptions);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, options.length + 1);
  }, [options]);

  return (
    <>
      <div className="search">
        <input
          value={text}
          placeholder={placeholder}
          onChange={(e) => {
            setActiveOne(0);
            setShow(true);
            setText(e.target.value);
            setSearch(
              options.filter((obj) => {
                return obj.toLowerCase().includes(e.target.value.toLowerCase());
              })
            );
          }}
          onKeyDown={(e) => {
            switch (e.keyCode) {
              case 40:
                setActiveOne(
                  activeOne === search.length - 1 ? 0 : activeOne + 1
                );

                show &&
                  search.length > 0 &&
                  itemsRef.current[
                    activeOne === search.length - 1 ? 0 : activeOne + 1
                  ].scrollIntoView();
                break;
              case 38:
                setActiveOne(
                  activeOne === 0 ? search.length - 1 : activeOne - 1
                );
                show &&
                  search.length > 0 &&
                  itemsRef.current[
                    activeOne === 0 ? search.length - 1 : activeOne - 1
                  ].scrollIntoView();
                break;
              case 13:
                search.length > 0 && setText(search[activeOne]);
                setShow(false);
                setActiveOne(0);
                if (search.length === 0 && text.length > 3) {
                  setOptions([...options, text]);
                  axios.post(
                    url,
                    { [name]: text },
                    { "content-type": "application/json" }
                  );
                }
                break;
              default:
                return;
            }
          }}
          onClick={() => setShow(!show)}
          onBlur={() =>
            setTimeout(() => {
              setShow(false);
            }, 10)
          }
        />

        <div className="boxContainer">
          {show && (
            <div className="box">
              {search.map((obj, index) => (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`option ${index === activeOne && "active"}`}
                  onClick={() => {
                    setText(obj);
                    setActiveOne(index);
                  }}
                >
                  {obj}
                </div>
              ))}

              {text.length > 3
                ? !options.includes(text) && (
                    <div
                      className={`option ${search.length === 0 && "active"}`}
                      onClick={() => {
                        setOptions([...options, text]);
                        axios.post(
                          url,
                          { [name]: text },
                          { "content-type": "application/json" }
                        );
                      }}
                    >
                      اضف {`"${text}"`}
                    </div>
                  )
                : search.length === 0 && <noOption>No Option</noOption>}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .search {
          direction: rtl;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          margin: 0.3rem auto;
        }
        input {
          width: 100%;
          font-size: 1.1rem;
          padding: 0.5rem 0.8rem;
          outline: none;
          border-radius: 0.3rem;
          border: 1px solid grey;
        }
        input:focus {
          border: 1px solid ${styles.primaryColor};
        }

        .boxContainer {
          position: absolute;
          top: 2.4em;
          z-index: 3;
          width: 100%;
          background: white;
        }

        .box {
          width: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid grey;
          margin: 0.3rem auto;
          border-radius: 0.3rem;
          max-height: 6rem;
          scroll-behavior: smooth;
          overflow: auto;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .box::-webkit-scrollbar {
          display: none;
        }

        .option {
          padding: 0.3rem;
          border-bottom: 1px solid lightgray;
        }

        .options:last-child {
          border-bottom: none;
        }

        .active {
          background: ${styles.secondaryColor};
          color: white;
          border-radius: ${activeOne === 0 && "0.3rem 0.3rem"} 0 0;
        }

        .noOption {
          padding: 0.3rem;
        }
      `}</style>
    </>
  );
}
