import { Fragment, useEffect, useState } from 'react';

import { dataBase } from '../../state/data/index';
import { get } from '../../utils/service/BaseApi';
import hotTopicStyles from './_hottopic.module.scss';

const HotTopic = () => {
	const [offset, setOffset] = useState(0);
	const [activeTopic, setActiveTopic] = useState('');
	const data = dataBase;

	useEffect(() => {
		const homeTopicRef = document.getElementById('home-topic');
		if (offset > 0) {
			const homeTopicTitle = document.getElementById('home-topic-title');
			const headerHeight = document.getElementById('mochi__header').offsetHeight;
			const bannerHeight = document.getElementById('banner_content').offsetHeight;

			if (offset >= bannerHeight) {
				homeTopicTitle.classList.add('title_scroll_hide');
				homeTopicRef.classList.add('home_topic_fixed');
			} else {
				homeTopicTitle.classList.remove('title_scroll_hide');
				homeTopicRef.classList.remove('home_topic_fixed');
			}
		}
	}, [offset]);

	useEffect(() => {
		const onScroll = () => {
			setOffset(window.pageYOffset);
		};
		// clean up code
		window.removeEventListener('scroll', onScroll);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollTop = (e) => {
		const dataAttribute = e.target.dataset.id;
		const topicScrollTo = document.getElementById(dataAttribute);
		const homeTopicHight = document.getElementById('home-topic').offsetHeight;
		const headerHeight = document.getElementById('mochi__header').offsetHeight;
		const topicScrollToTopDistance = topicScrollTo.getBoundingClientRect();

		window.scroll({
			top: topicScrollToTopDistance.y + offset - headerHeight - homeTopicHight,
			behavior: 'smooth',
		});

		setActiveTopic(e.target.dataset.id);
	};

	return (
		<>
			<div className={hotTopicStyles.home_topic} id="home-topic">
				<h2 className={hotTopicStyles.home_topic_title} id="home-topic-title">
					VIDEO TIẾNG ANH THEO CHỦ ĐỀ
				</h2>
				<ul className={hotTopicStyles.home_topic_inner}>
					{data.map((item, index) => {
						return (
							<Fragment key={item.id}>
								<li
									className={hotTopicStyles.home_topic_item}
									data-id={item.id}
									onClick={scrollTop}
								>
									{item.title}
								</li>
							</Fragment>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default HotTopic;
