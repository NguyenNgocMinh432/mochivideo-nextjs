import { useState } from 'react';
import { dataBase as data } from '../state/data';

const RandomIndex = (data) => {
	return Math.floor(Math.random() * data.length);
};

// let newUrl = window.location.pathname;
// let isParam = newUrl.slice(7, 18);

export const getDataVideos = () => {
	for (let i = 0; i < data.length; i++) {
		let randomNumber = RandomIndex(data);
		localStorage.setItem('isDataSugest', data[randomNumber].title);
		localStorage.setItem('isArrSugest', JSON.stringify(data[randomNumber].data));
		let arr = data[i].data;
		for (let j = 0; j < arr.length; j++) {
			if (arr[j].source === isParam) {
				localStorage.setItem('isTitleVideo', data[i].title);
				localStorage.setItem('isUrlSubs', arr[j].sub);
				localStorage.setItem('isTitleYt', arr[j].title);
				localStorage.setItem('isDes', arr[j].description);
				localStorage.setItem('isLevel', arr[j].level);
				break;
			}
		}
	}
};
