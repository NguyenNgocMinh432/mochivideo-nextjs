import titleStyles from './_titletopic.module.scss';
import Image from 'next/image';
import ImageStar from '../../assets/images/star.png';

const TitleTopic = ({ title, id }) => {
	return (
		<>
			<div className={titleStyles.suggest__title__topic}>
				<Image
					src={ImageStar}
					alt="star"
					className={titleStyles.suggest__topic__image}
					width={36}
				/>
				<h3 className={titleStyles.suggest__title} id={id}>
					{title ? title : 'Chủ đề đang được cập nhật'}
				</h3>
			</div>
		</>
	);
};
export default TitleTopic;
