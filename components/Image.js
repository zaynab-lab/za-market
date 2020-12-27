import { useState } from "react";

export default function ({ name, img, id, category, setFile }) {
  const [filesrc, setFilesrc] = useState(`/img/png/${name}.png`);
  const [hasImg, setHasImg] = useState(img);
  return (
    <>
      <div>
        <label id="imglabel" htmlFor="imgInput">
          {hasImg ? (
            <img
              id="img"
              src={`https://storage.googleapis.com/za-market/Products/${category}/${id}.png`}
              alt=""
            />
          ) : (
            <img id="img" src={filesrc} alt="" />
          )}
        </label>

        <input
          type="file"
          id="imgInput"
          name="img"
          onChange={(e) => {
            setHasImg(false);
            var file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              reader.readyState === 2 && setFilesrc(reader.result);
            };
            if (file && file.size < 200000) {
              reader.readAsDataURL(file);
              var blob = file.slice(0, file.size);
              var newFile = new File([blob], "file");
              setFilesrc(newFile);
              setFile(file);
            } else if (file && file.size > 200000) {
              alert("لا يمكن أن يتجاوز حجم الصورة 200k");
            } else {
              setFilesrc(`/img/png/${name}.png`);
              img && setHasImg(true);
              setFile("");
            }
          }}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>

      <style jsx>{`
        #imgInput {
          opacity: 0;
          position: absolute;
          z-index: -1;
          width: 5rem;
        }
        #imglabel,
        #img {
          cursor: pointer;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border: 1px var(--grey-dark-2) solid;
          font-size: 2rem;
          height: 8rem;
          width: 8rem;
          opacity: 90%;
          border-radius: 10rem;
          -webkit-border-radius: 10rem;
          -moz-border-radius: 10rem;
          -ms-border-radius: 10rem;
          -o-border-radius: 10rem;
          padding: 0.2rem;
        }
      `}</style>
    </>
  );
}
