import React from 'react';
import Image from 'next/image';
import rewindRight from '../../assets/images/rewindRight.png';
import rewindStyles from './_controlVideo.module.scss';

const ControlRewindRight = () => {
	return (
		<>
			<div
				className={`${rewindStyles.mochi__control__rewind} ${rewindStyles.rewind__right}`}
				// onClick={handleRewindRight}
			>
				<Image src={rewindRight} alt="" width={16} height={16} />
			</div>
		</>
	);
};

export default ControlRewindRight;
