import sliderStyles from './_sliderCard.module.scss';
import Slider from 'react-slick';
import CardVideo from '../SliderCard/CardVideo';
import { Fragment, memo } from 'react';

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	initialSlide: 1,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 3000,
	responsive: [
		{
			breakpoint: 1900,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				arrows: true,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				arrows: true,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				initialSlide: 1,
				arrows: true,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
			},
		},
	],
};

const SliderCard = ({ dataSlider }) => {
	return (
		<div>
			<Slider {...settings}>
				{dataSlider.map((item, index) => {
					return (
						<Fragment key={index}>
							<CardVideo data={item} />
						</Fragment>
					);
				})}
			</Slider>
		</div>
	);
};

export default memo(SliderCard);
