import Image from 'next/image';
import Link from 'next/link';
import headerStyles from './header.module.scss';
import mochiLogo from '../../../assets/images/mochi-logo.png';
import { useEffect, useState } from 'react';
import ModalMochi from '../../common/Modal/Modal';
import Login from '../../../General/Login';
import Register from '../../../General/Register';
import logoMochi from '../../../assets/images/notice.png';
import UserInfo from '../../../General/UserInfor';
const mochiDefaultAvt =
	'https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg';

const Header = () => {
	const [show, setShow] = useState(false);
	const [modal, setModal] = useState(false);
	const [isInput, setInput] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [userToken, setToken] = useState('');
	const [userInfor, setInfor] = useState('');

	const [isUser, setUser] = useState(false);

	const toggle = () => {
		setModal(!modal);
		setShowLogin(false);
		setShowRegister(false);
		setShowModal(false);
	};
	const register = () => {
		setShowRegister(true);
		setModal(!modal);
	};
	const login = () => {
		setShowLogin(true);
		setModal(!modal);
	};
	const showPopUpGeneral = () => {
		setShowModal(true);
		setModal(true);
	};

	const spliceUserName = (userName) => {
		if (userName.length > 9) {
			let data = userInfor.display_name.slice(0, 9);
			return data.concat('...');
		} else {
			return userName;
		}
	};

	const handleClickLogin = () => {
		setShow(!show);
		setShowModal(true);
		setModal(true);
	};
	useEffect(() => {
		const userInfor1 = JSON.parse(localStorage.getItem('usemsg'));
		if (userInfor1 !== null) {
			const userToken = userInfor1.user.user_token;
			const userInfor = userInfor1 ? userInfor1.user : 'hello';
			setToken(userToken);
			setInfor(userInfor);
		}
	}, [isUser]);
	return (
		<div className={headerStyles.mochi__header} id="mochi__header">
			<div className={headerStyles.mochi__header__left}></div>
			<div className={headerStyles.mochi__header__center}>
				<ul className={headerStyles.mochi__header__ul}>
					<li className={headerStyles.mochi__logo}>
						<Link href={'/'}>
							<a>
								<Image src={mochiLogo} alt="" />
							</a>
						</Link>
					</li>
					<li className={headerStyles.mochi_login__button}>
						{userToken ? (
							<div
								className={headerStyles.mochi__header__right__userInfor}
								onClick={() => setUser(!isUser)}
							>
								<span>{spliceUserName(userInfor.display_name)}</span>
								<Image
									src={userInfor.avatar ? userInfor.avatar : mochiDefaultAvt}
									alt="img"
									className={headerStyles.mochi__header__right__image}
								/>
							</div>
						) : (
							<div
								className={headerStyles.mochi__header__login}
								onClick={handleClickLogin}
							>
								<div className={headerStyles.button__login}>Đăng nhập</div>
							</div>
						)}
					</li>
				</ul>
			</div>
			<div className={headerStyles.mochi__header__right}>
				{showModal && (
					<ModalMochi
						modal={modal}
						toggle={toggle}
						login={login}
						register={register}
						img={logoMochi}
						text={`Đăng nhập tài khoản học MochiMochi để tra cứu và lưu từ vựng vào sổ tay`}
						ButtonText1={'Đăng nhập'}
						ButtonText2={'Tạo tài khoản mới'}
					/>
				)}
				{isUser && <UserInfo isUser={isUser} setUser={setUser} userInfor={userInfor} />}
				{/* {showLogin && <Login toggle={toggle} setShowRegister = {setShowRegister} />}
                    {showRegister && 
                        <Register toggle={toggle} setShowLogin = {setShowLogin} 
                         setShowRegister = {setShowRegister} showRegister = {showRegister}/>
                    }  */}
			</div>
			{showModal && (
				<ModalMochi
					modal={modal}
					toggle={toggle}
					login={login}
					register={register}
					// img = {LogoMochi}
					text={`Đăng nhập tài khoản học MochiMochi để tra cứu và lưu từ vựng vào sổ tay`}
					ButtonText1={'Đăng nhập'}
					ButtonText2={'Tạo tài khoản mới'}
				/>
			)}
			{showLogin && <Login toggle={toggle} setShowRegister={setShowRegister} />}
			{showRegister && (
				<Register
					toggle={toggle}
					setShowLogin={setShowLogin}
					setShowRegister={setShowRegister}
					showRegister={showRegister}
				/>
			)}
		</div>
	);
};
export default Header;
