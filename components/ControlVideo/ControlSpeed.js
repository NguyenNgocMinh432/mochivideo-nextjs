import React, { useState } from 'react';
import PopupSpeed from './PopupSpeed';
import controlStyles from "./_controlVideo.module.scss";

const ControlSpeed = () => {
    const [isSpeed, setSpeed] = useState(false);
    const handleSpeed = () => {
        setSpeed(!isSpeed);
    };
	return (
		<>
			{isSpeed ? (
				<PopupSpeed
					setNumberSpeed={setNumberSpeed}
					setSpeed={setSpeed}
					isNumberSpeed={isNumberSpeed}
				/>
			) : (
				''
			)}
			<div className={` ${controlStyles.mochi__control__speed}`} onClick={handleSpeed}>
				{/* <span>{isNumberSpeed}x</span> */}
                <span>1x</span>
			</div>
		</>
	);
};

export default ControlSpeed;
