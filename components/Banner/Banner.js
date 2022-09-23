import bannerStyles from './_banner.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import imageBanner from '../../assets/images/banner-web.png';
import imageBannerMobile from '../../assets/images/banner-mobile.png';
const Banner = () => {
	return (
		<>
			<div className={bannerStyles.banner_content} id="banner_content">
				<div className={bannerStyles.banner_slider_1}>
					<Link href="">
						<a>
							<Image
								src={imageBanner}
								className={bannerStyles.banner_slider_image}
								alt="MOCHIVIDEO - HỌC TIẾNG ANH MIỄN PHÍ QUA VIDEO VỚI MOCHIMOCHI"
							/>
						</a>
					</Link>
				</div>
				<div className={bannerStyles.banner_slider_mobile}>
					<Link href="">
						<a>
							<Image
								src={imageBannerMobile}
								className={bannerStyles.banner_slider_image}
								alt="MOCHIVIDEO - HỌC TIẾNG ANH MIỄN PHÍ QUA VIDEO VỚI MOCHIMOCHI"
							/>
						</a>
					</Link>
				</div>
				<div className={bannerStyles.banner_title}>
					<h1 className={bannerStyles.banner_title__text}>
						MochiVideo - Học tiếng Anh miễn phí qua video với MochiMochi
					</h1>
				</div>
			</div>
		</>
	);
};

export default Banner;
