import React, { useEffect, useState } from 'react';
import ControlVideo from '../../components/ControlVideo';
import { convertTime } from '../../libs/videos';
import { getSubs } from '../../utils/service/getSubs';
import indexStyles from './index.module.scss';
import Image from 'next/image';
import iconTranslate from "../../assets/images/Translate.png";
const SubVideo = ({ idVideo, res }) => {
	const [data, setData] = useState([]);
	const [heightBoxSub, setHeightBoxSub] = useState(0);

	useEffect(() => {
		let res = getSubs('en', idVideo);
		res.then((res) => {
			setData(res);
		});
	}, []);
	useEffect(() => {
		function handleResize() {
			const heightControl = document.querySelector('#mochi__youtube--control').offsetHeight;
			const widthScreen = window.screen.width;
			const heightScreen = window.screen.height;
			const width = document.querySelector('#mochi__youtube--left').offsetWidth;
			const height =
				widthScreen > 768
					? (Number(width) * 360) / 640 - heightControl
					: heightScreen -
					  54 -
					  heightControl -
					  (Number(width) * 360) / 440 -
					  heightControl;
			setHeightBoxSub(height);
		}

		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<div className={indexStyles.mochi__youtube__subs__main}>
			<div
				className={indexStyles.mochi__youtube__subs}
				id="subs__id"
				style={{ height: `${heightBoxSub}px` }}
				// onScroll={handleScroll}
				// onMouseEnter={handleHoverPaused}
				// onMouseLeave={handleLeaveSubs}
			>
				{data.map((item, index) => {
					return (
						<>
							<div
								key={index}
								style={{
									display: 'flex',
									padding: ' 5px',
									textAlign: 'center',
									alignItems: 'center',
								}}
								className={indexStyles.subs__mochi__videos}
							>
								<span className={ indexStyles.subs__time } 
									// onClick={handleClickTimeStamp} 
									data-time={item.start}>
									{ convertTime(item.start) }
								</span>
								<span className={indexStyles.subs__text}>
									{item.subtitle
										.replace(/<[^>]*>?/gm, '')
										.replaceAll('\n', ' ')
										.split(' ')
										.map((sub, index) => {
											return (
												<span
													key={index}
													className={indexStyles.subs__text__videos}
													style={{
														marginLeft: '5px',
														fontSize: '17px',
														color: 'white',
													}}
													dangerouslySetInnerHTML={{ __html: sub }}
												></span>
											);
										})}
								</span>
								<span className= { indexStyles.sub_translate } onClick={ () => handleSubTranslate(i, item.start) }>
									<Image src={iconTranslate}  alt="" className= { indexStyles.sub_translate_img } width={ 28 }/>
								</span>
							</div>
						</>
					);
				})}
			</div>
			<ControlVideo />
		</div>
	);
};

// export const getStaticProps = async ( idVideo ) => {
// 	const res =  await getSubs("en", idVideo )
// 	return {
// 		props: {
// 			res: res
// 		},
// 	}
// }
export default SubVideo;
