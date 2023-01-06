import React, { useState } from "react";
import RubberDataScrapeer from "../components/RubberDataScrapper";
import RubberSaleLinkScrapper from "../components/RubberSaleLinkScrapper";
import ScrapingMenuBar from "../components/ScrapingMenuBar";

const Page = ({texts}) => {

  const [showItem, setShowItem] = useState('rubberData');

  const selectMenu = (menu) => {
    setShowItem(menu);
  }

  return (
    <>
      <ScrapingMenuBar texts={texts} onSelectMenu={selectMenu} />
      {showItem === "rubberData" && <RubberDataScrapeer texts={texts}/>}
      {showItem === "rubberSaleLink" && <RubberSaleLinkScrapper texts={texts}/>}
    </>
  );
};

export default Page;