import YouTube from 'react-youtube';
import { useEffect, useRef, useState } from 'react';
import youtubeStyles from "./index.module.scss";

function YoutubeVideos({
    title,
    idVideo,
    handleOnPlay,
    handlePaused,
    handlePlaying,
    isTimeStampVideo,
    handleVideoReady,
    isRewind,
    handleRate
}) {
    const [height, setHeight] = useState(() => {
        // const device = localStorage.getItem('device');
        // if ( device !== null ) {
        //     if (device === "mobile") {
        //         return Number(localStorage.getItem('heightVideo'));
        //     } else {
        //         return 0;
        //     }
        // }
    });
    const [width, setWidth] = useState(0);
    const [controlVideo, setControlVideo] = useState(1);
    const handleAutoPlay = () => {
        // let isAutoPlay = localStorage.getItem('isGuide');
        // if (isAutoPlay !== null) {
        //     return 1;
        // } else {
        //     return 0;
        // }
    }
    const opts = {
        height: height,
        width: width,
        playerVars: {
            enablejsapi: 1,
            rel: 0,
            modestbranding: 1,
            autohide: 0,
            autoplay: handleAutoPlay(),
            controls: 0,
            start: isTimeStampVideo,
            loop: 1,
            //controls: controlVideo
        },
     
    };
    const playerRef = useRef();
    // useEffect(() => {
    //     console.log(playerRef);
    //     playerRef.current.onPlayerPlaybackRateChange = (event) => {
    //         console.log(event);
    //     } ;
    // })

    useEffect(() => {
        function handleResize() {
            const width = document.querySelector('#mochi__youtube--left').offsetWidth;
            const height = (Number(width) * 360) / 640;
            setHeight(height);
            setWidth(width);

            const device = localStorage.getItem('device');
            if (device === "mobile") {
                setControlVideo(0);
            } else {
                setControlVideo(1);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
   
    return (
        <div className= { youtubeStyles.mochi__youtube__left } id="mochi__youtube--left">
            <div className= { youtubeStyles.mochi__youtube__video }>
                <YouTube
                    ref={playerRef}
                    className= { youtubeStyles.youtube__video }
                    id="iframe__yt"
                    videoId={idVideo}
                    opts={opts}
                    title=""
                    // onReady={handleOnReady}
                    onPlay={handleOnPlay}
                    onPause={handlePaused}
                    onStateChange={handlePlaying}
                    onReady={handleVideoReady}
                    // onPlaybackRateChange={setPlayBack}
                    // onCanPlay={setPlayBack}
                    // onReady={()=> playerRef.current.seekTo(30,false)}
                />
            </div>
            <div className= { youtubeStyles.mochi__youtube__title }>
                <span>{title}</span>
            </div>
        </div>
    );
}

export default YoutubeVideos;
