import React, { Fragment, useEffect } from 'react';
import listStyles from './_listVideos.module.scss';
import TitleTopic from '../TitleTopic/TitleTopic';
import { getDataVideos } from '../../libs/getDataVideos';
import { dataBase as data } from '../../state/data';
import SliderCard from '../SliderCard/Slidercard';

const ListVideos = () => {
	// useEffect(() => {
	//     getDataVideos();
	// }, )

	return (
		<div className={listStyles.list__videos__topics}>
			{data.map((item, index) => {
				return (
					<Fragment key={item.id}>
						<TitleTopic title={item.title} id={item.id} />
						<SliderCard dataSlider={item.data} />
					</Fragment>
				);
			})}
		</div>
	);
};

export default ListVideos;
