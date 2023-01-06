import React from "react";
import ScrapMenuItem from "../components/ScrapMenuItem";

import { getMyStyle } from "../components/RubberDataScrapper.style";
import useStyle from "../hooks/useStyle";

const Component = ({texts , onSelectMenu}) => {
  const { style } = useStyle(getMyStyle);

  const selectMenu = (menuTitle) => {
    onSelectMenu(menuTitle);
  }

  return (
    <div style={style.scrapHeader}>
      <ScrapMenuItem  label={texts['scrap-menu-item-data']} onClick={() => selectMenu("rubberData")} />
      <ScrapMenuItem  label={texts['scrap-menu-item-salelink']} onClick={() => selectMenu("rubberSaleLink")} />
    </div>
  );
};

export default Component;