import { useEffect, useLayoutEffect, useState } from 'react';

export const handleSetStyleButton = (level) => {
    return <button className={`card__times__right__leve${level}`}>{renderText(level)}</button>;
};

const renderText = (level) => {
    let text = '';
    switch (level) {
        case 1:
            return (text = 'Sơ cấp');
        case 2:
            return (text = 'Trung cấp');
        case 3:
            return (text = 'Cao cấp');
        default:
    }
};
export const handleSetSRC = (id, size) => {
    return `https://img.youtube.com/vi/${id}/${size}`;
};
// export const handleSetTextLength = (text) => {
//     if (text.length > 50) {
//         let text1 = text.slice(0, 50);
//         let lengthText = `${text1}...`
//         return lengthText;
//     }
// };
export const useAudio = (url) => {
    const [audio, setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => {
        setPlaying(!playing);
        setAudio(new Audio(url));
    };

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};
export const getTime = (time) => {
    let getDate = new Date().toDateString();
    let timeStamp = new Date(getDate).getTime();
    let localDate = localStorage.getItem(time);
    let timeStampLocal = new Date(localDate).getTime();
    return {
        status: timeStamp !== timeStampLocal,
        date: getDate
    }
}
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const pauseVideoYoutube = () => {
    const elementVideo = document.getElementById('iframe__yt');
    if (elementVideo) {
        elementVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
}

export const playVideoYoutube = () => {
    const elementVideo = document.getElementById('iframe__yt');
    if (elementVideo) {
        elementVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
}

export const convertDate = (date) => {
    if (date) {
        const dateObject = new Date(date);
        let day = dateObject.getDate() < 10 ? '0' + dateObject.getDate() : dateObject.getDate();

        const month = dateObject.getMonth() + 1 < 10 ? '0' + (dateObject.getMonth() + 1) : dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        return day + '/' + month + '/' + year;
    } else {
        return '';
    }
}

export const convertTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = '00');
    sec < 1 ? (sec = '00') : void 0;

    min.toString().length == 1 ? (min = '0' + min) : void 0;
    sec.toString().length == 1 ? (sec = '0' + sec) : void 0;
    if (hours < 1 && Math.floor(sec) < 10) {
        return min + ':' + '0' + Math.floor(sec);
    } else if (hours < 1) {
        return min + ':' + Math.floor(sec);
    } else if (hours >= 1) {
        return hours + ':' + min + ':' + Math.floor(sec);
    }
};