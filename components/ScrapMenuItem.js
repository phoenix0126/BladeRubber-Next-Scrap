import React, { useState } from "react";

import { getMyStyle } from "../components/ScrapMenuItem.style";
import useStyle from "../hooks/useStyle";

const Component = ({ onClick = () => null, label = '', id = '' }) => {
	const [isHovered, setIsHovered] = useState(false);
	const { style } = useStyle(getMyStyle, { isHovered }, [isHovered]);

	return (
		<div id={id} style={style.scrapHeaderItem} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			{label}
		</div>
	);
};

export default Component;