import React, { Dispatch, SetStateAction, useState } from "react";
import { Data, Overlay } from "../../types";
import { catGifs } from "../../assets";
import "./CatGridItem.scss";

type CatGridItemProps = {
  item: Data;
  index: number;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, hoverIndex: number) => void;
  setOverlay: Dispatch<SetStateAction<Overlay>>;
};

const CatGridItem = ({
  item,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
  setOverlay,
}: CatGridItemProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="cat-grid-item__wrapper"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e, index)}
    >
      <div>{item.title}</div>
      {loading && (
        <div className="cat-grid-item__loader">
          <div className="spinner"></div>
        </div>
      )}
      <img
        className={loading ? "hidden" : ""}
        src={catGifs[item?.position]}
        alt={`cat-${index}`}
        onClick={() =>
          setOverlay((prev) => ({
            open: true,
            index: item?.position,
          }))
        }
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};

export default CatGridItem;
