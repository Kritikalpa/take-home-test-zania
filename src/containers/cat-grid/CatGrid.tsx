import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Data, Overlay, SaveType } from "../../types";
import CatGridItem from "../../components/cat-grid-item/CatGridItem";
import "./CatGrid.scss";
import CatOverlay from "../../components/CatOverlay/CatOverlay";

type CatGridProps = {
  save: SaveType;
  setSave: Dispatch<SetStateAction<SaveType>>;
};

const CatGrid = ({ save, setSave }: CatGridProps) => {
  const [data, setData] = useState<Array<Data>>();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overlay, setOverlay] = useState<Overlay>({
    open: false,
    index: 0,
  });
  const [shouldSave, setShouldSave] = useState(false);

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

    const saveInterval = setInterval(() => {
      setShouldSave(true);
    }, 1000 * 5);

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.clearInterval(saveInterval);
    };
  }, []);

  useEffect(() => {
    if (shouldSave && JSON.stringify(save?.data) !== JSON.stringify(data)) {
      saveData(data as Array<Data>);
    }
    setShouldSave(false);
  }, [shouldSave]);

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
    setSave((prev) => ({
      ...prev,
      active: true,
    }));
    fetch("https://example.com/save", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setTimeout(() => {
          setSave({
            active: false,
            time: Date.now(),
            data: data,
          });
          fetchData();
        }, 1000);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setSave((prev) => ({
          ...prev,
          active: false,
        }));
      });
  };

  const handleDragStart = (index: number) => {
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
      setData(updatedItems);

      // ENABLE THESE TO SAVE ON EVERY ACTION

      // setSave((prev) => ({
      //   ...prev,
      //   active: true,
      // }));
      // saveData(updatedItems);
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
        <CatOverlay overlay={overlay} setOverlay={setOverlay} />
      )}
    </>
  );
};

export default CatGrid;
