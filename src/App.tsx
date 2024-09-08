import "./stylesheets/styles.scss";
import CatGrid from "./containers/cat-grid/CatGrid";
import SaveData from "./containers/save-data/SaveData";
import { useState } from "react";
import { SaveType } from "./types";

function App() {
  const [save, setSave] = useState<SaveType>({
    active: false,
    time: Date.now(),
    data: null,
  });

  return (
    <>
      <SaveData isSaving={save.active} lastSaved={save.time} />
      <CatGrid save={save} setSave={setSave} />
    </>
  );
}

export default App;
