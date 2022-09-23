import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import sliderStyles from './_sliderCard.module.scss';
import { handleSetStyleButton } from '../../libs/videos';
import mochiClock from '../../assets/images/clock_mochi.png';
import { useRouter } from 'next/router';

const CardVideo = ({ data }) => {
	const URLROOT = process.env.NEXT_PUBLIC_URL_VIDEO;
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [mouseDown, setMouseDown] = useState(0);
	const [isScroll, setScroll] = useState(false);
	const router = useRouter();

	const NavigateVideo = (id) => {
		router.push({
			pathname: '/video/[idVideo]',
			query: {
				idVideo: id,
			},
			fallback: false,
		});
	};

	const handleMouseUp = (e, id) => {
		setTimeout(() => {
			const mouseUp = e.pageY;
			if (mouseUp === mouseDown) {
				NavigateVideo(id);
			}
		}, 200);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [isScroll]);

	useEffect(() => {
		const w = document.querySelector('#mochi__videos--card').offsetWidth;
		setWidth(w);
		setHeight(Math.round((w * 180) / 320));
	}, []);
	return (
		<>
			<div
				className={sliderStyles.mochi__videos__card}
				id="mochi__videos--card"
				onMouseUp={(e) => handleMouseUp(e, data.source)}
				onMouseDown={(e) => setMouseDown(e.pageY)}
			>
				<div className={sliderStyles.mochi__video__img_outer}>
					<Image
						src={'/thumb/' + data.source + '.jpg'}
						alt=""
						width={350}
						height={180}
						layout="intrinsic"
						className={sliderStyles.mochi__videos__card__img}
					/>
				</div>
				<div
					className={sliderStyles.mochi__videos__card__title}
					onClick={() => NavigateVideo(data.source)}
				>
					<p>{data.title}</p>
				</div>
				<div className={sliderStyles.mochi__videos__times}>
					<div className={sliderStyles.card__times__left}>
						<Image src={mochiClock} width={18} height={20} alt="" />
						<span>{data.time}</span>
					</div>
					<div className={sliderStyles.card__times__right}>
						{handleSetStyleButton(data.level)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CardVideo;
