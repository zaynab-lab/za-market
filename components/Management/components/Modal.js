import { useState } from "react";
import { styles } from "../../../public/js/styles";

export default function Modal({ children, add, setModal, refresh }) {
  const [displayAdd, setDisplayAdd] = useState("none");
  // const [displayEdit, setDisplayEdit] = useState(true);
  return (
    <>
      <div className="modalContainer">
        {add ? (
          <>
            <div className="addmodal">
              <div
                className="addmodal-background"
                onClick={() => {
                  setDisplayAdd("none");
                  refresh();
                }}
              ></div>
              <div className="addmodal-body">{children}</div>
            </div>
            <div
              className="addproductbtn"
              onClick={() => setDisplayAdd("block")}
            >
              +
            </div>
          </>
        ) : (
          <div className="editmodal">
            <div
              className="editmodal-background"
              onClick={() => {
                setModal(false);
              }}
            ></div>
            <div className="editmodal-body">{children}</div>
          </div>
        )}
      </div>
      <style>{`
// .modalContainer{
//   position:absolute;
//   top:0;
//   right:0;
// }

.addproductbtn{
position: absolute;
top:90vh;
left:1rem;
background:${styles.primaryColorLight};
color:white;
width:3rem;
height:3rem;
border-radius:5rem;
display:flex;
justify-content:center;
align-items:center;
font-size:2rem;
}


.addmodal{
position: absolute;
top:0;
display:${displayAdd}
}

.addmodal-background{
width:100vw;
height:100vh;
background:rgba(10, 10, 10, .5);
position: absolute;
top:0;
z-index:5;

}


.addmodal-body{
display:flex;
flex-direction:column;
width:90vw;
height:80vh;
background:white;
position:absolute; 
top:10vh;
right:5vw;
border:1px solid ${styles.primaryColorLight};
border-radius:.5rem;
padding:.5rem;
z-index:6;
overflow:auto;
}

.editmodal{
  position:absolute;
  top:0;
  
  }
  
.editmodal-background{
  width:100vw;
  height:100vh;
  background:rgba(10, 10, 10, .5);
  position: absolute;
  top:0;
  z-index:7;
  }
  
.editmodal-body{
  display:flex;
  flex-direction:column;
  width:90vw;
  height:80vh;
  background:white;
  position:absolute; 
  top:10vh;
  right:5vw;
  border:1px solid ${styles.primaryColorLight};
  border-radius:.5rem;
  padding:.5rem;
  z-index:8;
  overflow:auto;
  }

  

@media only screen and (min-width: 450px) {
  .addmodal-background{
    width:450px;
    }
  .addmodal-body{
    width:400px;
    right:25px;  
  }
  .editmodal-background{
  width:450px;
  }
  .editmodal-body{
  width:400px;
  right:25px;
  }


} 

`}</style>
    </>
  );
}
