import React, { useEffect, useState } from "react";
import { Data, Overlay } from "../../types";
import CatGridItem from "../../components/cat-grid-item/CatGridItem";
import "./CatGrid.scss";
import { catGifs } from "../../assets";

const CatGrid = () => {
  const [data, setData] = useState<Array<Data>>();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overlay, setOverlay] = useState<Overlay>({
    open: false,
    index: 0,
  });

  useEffect(() => {
    fetchData();

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverlay({
          ...overlay,
          open: false,
        });
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const fetchData = () => {
    fetch("https://example.com/data")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const saveData = (data: Array<Data>) => {
    fetch("https://example.com/save", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      fetchData();
    }).catch((e: Error) => {
      console.log(e.message);
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropEvent = (e: React.DragEvent, hoverIndex: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== hoverIndex) {
      handleDrop(dragIndex, hoverIndex);
    }
    setDragIndex(null);
  };

  const handleDrop = (dragIndex: number, hoverIndex: number) => {
    if (data) {
      const updatedItems = [...data];
      const [draggedItem] = updatedItems?.splice(dragIndex, 1);
      updatedItems?.splice(hoverIndex, 0, draggedItem);
      // setData(updatedItems);
      saveData(updatedItems);
    }
  };

  return (
    <>
      <div className="cat-grid__wrapper">
        {data?.map((item, index) => (
          <CatGridItem
            key={`cat-thumbnail-${index}`}
            item={item}
            index={index}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDropEvent}
            setOverlay={setOverlay}
          />
        ))}
      </div>
      {overlay?.open && (
        <div
          className="cat-grid__overlay"
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
            className="cat-grid__overlay-image"
          />
        </div>
      )}
    </>
  );
};

export default CatGrid;
