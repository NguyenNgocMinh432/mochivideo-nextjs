import React, { useState } from 'react';
import ControlRewindRight from './ControlRewindRight';
import ControlRewindLeft from './ControlRewindLeft';
import ControlSpeed from './ControlSpeed';
import controlStyles from './_controlVideo.module.scss';
import iconStatusPaused from '../../assets/images/pause.png';
import iconStatusPlay from '../../assets/images/play.png';
import Image from 'next/image';

const ControlVideo = ( { isNumberSpeed, setNumberSpeed } ) => {
    const [ isPaused, setPaused ] = useState(false);
    const handlePlay = () => {
        setPaused(!isPaused);
    }
	return (
		<div className={controlStyles.mochi__youtube__control} id="mochi__youtube--control">
			<ControlSpeed
			 setNumberSpeed={setNumberSpeed} isNumberSpeed={isNumberSpeed}
			/>
			<ControlRewindLeft
			// isSubs={isSubs}
			// setRewind={setRewind}
			// setIsTimeStampVideo={setIsTimeStampVideo}
			/>
			<div
				className={`${controlStyles.mochi__control__play} ${controlStyles.guid__play}`}
				onClick={handlePlay}
			>
				{!isPaused ? (
					<Image src={iconStatusPaused} alt="" width={30} height={32} className={controlStyles.mochi__control__play__img}/>
				) : (
					<Image src={iconStatusPlay} alt="" width={30} height={32} className={controlStyles.mochi__control__play__img} />
				)}
			</div>
			<ControlRewindRight
			// isSubs={isSubs}
			// setRewind={setRewind}
			// setIsTimeStampVideo={setIsTimeStampVideo}
			/>
		</div>
	);
};

export default ControlVideo;
