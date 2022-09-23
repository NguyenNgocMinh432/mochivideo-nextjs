import { useRouter } from 'next/router';
import React from 'react';
import { Spinner } from 'reactstrap';
import Layout from '../../components/Layout/Layout';
import detailStyles from "./index.module.scss";
import SubVideo from './SubVideo';
import YoutubeVideos from './YoutubeVideo';

const DetailVideo = () => {
	const router = useRouter();
	const { idVideo } = router.query;
	console.log(idVideo);
    
    if (router.isFallback) {
		return (
			<Spinner
				animation='border'
				role='status'
				variant='dark'
				className={spinnerStyles.spinnerLg}
			>
				<span className='sr-only'>LOADING ....</span>
			</Spinner>
		)
	}
    
	return (
		<Layout>
			<div className= { detailStyles.mochi__detail__page }>
                <div style={{ color: 'white' }}> {idVideo} </div>
                <div 
                className = { detailStyles.mochi__detail__page__top }
                >
                    <YoutubeVideos idVideo={ idVideo } />
                    <SubVideo idVideo={ idVideo }  />
                </div>
				<div>
					
				</div>
            </div>
		</Layout>
	);
};

export default DetailVideo;
