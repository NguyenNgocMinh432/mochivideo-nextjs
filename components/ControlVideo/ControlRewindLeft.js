import React from 'react';
import Image from 'next/image';
import rewindLeft from '../../assets/images/RewindRight.png';
import rewindStyles from './_controlVideo.module.scss';

const ControlRewindLeft = () => {
	return (
		<>
			<div
				className={`${rewindStyles.mochi__control__rewind} ${rewindStyles.rewind__left}`}
				// onClick={handleRewindLeft}
			>
				<Image src={rewindLeft} alt="" width={16} height={16} />
			</div>
		</>
	);
};

export default ControlRewindLeft;
