import { Dispatch, SetStateAction } from "react";
import { Overlay } from "../../types";
import { catGifs } from "../../assets";
import "./CatOverlay.scss";

type OverlayProps = {
  overlay: Overlay;
  setOverlay: Dispatch<SetStateAction<Overlay>>;
};

const CatOverlay = ({ overlay, setOverlay }: OverlayProps) => {
  return (
    <div
      className="cat-overlay__overlay"
      onClick={() =>
        setOverlay({
          ...overlay,
          open: false,
        })
      }
    >
      <img
        src={catGifs[overlay?.index]}
        alt="Enlarged"
        className="cat-overlay__overlay-image"
      />
    </div>
  );
};

export default CatOverlay;
