// import Image from 'next/image'
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import HotTopic from '../components/HotTopic/HotTopic';
import TitleTopic from '../components/TitleTopic/TitleTopic';
import ListVideos from '../components/ListVideos/ListVideos';
import Login from '../General/Login';

export default function Home() {
	return (
		<>
			<Layout>
				<div className={styles.container}>
					<main className={styles.main}>
						<Banner />
						<HotTopic />
						<ListVideos />
					</main>
				</div>
			</Layout>
		</>
	);
}
export const getStaticProps = () => {
	return {
		props: {
			
		}
	}
}
