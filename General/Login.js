import React, { useEffect, useState } from 'react';
import generalStyles from './_general.module.scss';
import ExitPopup from '../assets/images/Exit.png';
import Apple from '../assets/images/apple-logo.png';
import Face from "../assets/images/fb-logo.png";
import Googgle from "../assets/images/google-logo (2).png";
import mochiLogo from '../assets/images/Mochi-chuc-mung-01 1.png';
import mochiLogo1 from '../assets/images/Mochi-meomeo2-01.png';
import Image from "next/image";
import ModalMochi from "../components/common/Modal/Modal"
import { ApiLoginSocial, ApiLogin } from "../Firebase/userApi";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	OAuthProvider,
} from 'firebase/auth';
import { app } from '../Firebase/firebase-config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
facebookProvider.addScope('email');
facebookProvider.setCustomParameters({
	display: 'popup',
});
appleProvider.addScope('email');
appleProvider.addScope('name');

const Login = ( props ) => {
	const { toggle, setShowRegister } = props;
	const [selectType, setSelectType] = useState('password');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorPass, setErrorPass] = useState('');
	const [background, setBackground] = useState('no');
	const [isClass,setClass] = useState('login_button__no')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showForgotPass, setShowForgotPass] = useState(false);
	const handleChangeEmail = (event) => {
		const value = event.target.value.trim();
		const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		if (value == '' || !regex.test(value)) {
			setErrorEmail('Email sai định dạng, bạn kiểm tra lại nhé');
			setEmail('');
		} else {
			setEmail(value);
			setErrorEmail('');
		}
	};

	const handleChangePass = (event) => {
		const value = event.target.value.trim();
		if (value == '' || value.length < 6) {
			setErrorPass('Mật khẩu phải chứa ít nhất 6 ký tự');
			setPassword('');
		} else {
			setPassword(value);
			setErrorPass('');
		}
	};

	const handleSelectType = () => {
		if (selectType === 'password') {
			setSelectType('text');
		} else {
			setSelectType('password');
		}
	};

	useEffect(() => {
		if (email && password) {
			setBackground('ok');
			setClass('login_button__ok')
		} else {
			setBackground('no');
			setClass('login_button__no')
		}
	}, [errorPass, errorEmail]);

	const handleSubmitLogin = async () => {
		const disabled = errorEmail || errorPass || !email || !password;
		// TH thoa man dieu kien Login
		if (!disabled) {
			const data = {
				email: `${email}`,
				password: `${password}`,
				device_type: 1,
			};
			await ApiLogin(data);
		}
		let error = JSON.parse(window.localStorage.getItem('usemsg'));
		if (error.code == 1) {
			setShowModal(true);
		} else {
			if (error.lang.search('password') !== -1) {
				setErrorPass(error.msg);
			} else {
				setErrorEmail(error.msg);
			}
		}
	};

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, googleProvider)
			.then(async (result) => {
                console.log("user", result.user);
				await ApiLoginSocial('google', result.user);
				setShowModal(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleFacebookSignIn = () => {
		signInWithPopup(auth, facebookProvider)
			.then(async (result) => {
				await ApiLoginSocial('facebook', result.user);
				setShowModal(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleAppleSignIn = () => {
		signInWithPopup(auth, appleProvider)
			.then(async (result) => {
				await ApiLoginSocial('apple', result.user);
				setShowModal(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const showPopUpForgotPass = () => {
		setShowForgotPass(true);
	};

	const inboxMochi = () => {
		window.open('https://www.facebook.com/Mochidemy');
	};
	const handleReload = () => {
		toggle();
		window.location.reload();
	};

	useEffect(() => {
		// pauseVideoYoutube();
	}, []);

	return (
		<>
			{
            !showModal && !showForgotPass 
            && 
            (
				<div className={ generalStyles.login }>
					<div className={ generalStyles.login_container }>
						<Image src={ExitPopup} alt="" onClick={toggle} width= { 30 } height= { 32 } className={ generalStyles.login_close_img } />
						<div className={ generalStyles.login_title }> Đăng nhập để học ngay nhé </div>
						<div className={ generalStyles.login_noEmail}>
							<div className= { generalStyles.login_noEmail__google } onClick={handleGoogleSignIn}>
								<Image src={Googgle} alt="Google" />
								<span style={{ marginLeft: "10px" }}>Đăng nhập với G+</span>
							</div>
							<div className={ generalStyles.login_noEmail__face} onClick={handleFacebookSignIn}>
								<Image src={Face} alt="Facebook" />
								<span style={{ marginLeft: "10px" }} >Đăng nhập với Facebook</span>
							</div>
							<div className={ generalStyles.login_noEmail__apple } onClick={handleAppleSignIn}>
								<Image src={Apple} alt="Apple" />
								<span style={{ marginLeft: "10px" }} >Đăng nhập với Apple</span>
							</div>
						</div>
						<p className={ generalStyles.login_OR }>HOẶC</p>
						<div className= { generalStyles.login_Email }>
							<div className= { generalStyles.login_Email__email }>
								<input
									type="text"
									placeholder="Nhập email tài khoản học"
									className= { generalStyles.login_Email__email__input }
									onChange={handleChangeEmail}
								/>
								{errorEmail && <p className= { generalStyles.error_text }>{errorEmail}</p>}
							</div>
							<div className={ generalStyles.login_Email__email }>
								<input
									type={selectType}
									placeholder="Nhâp mật khẩu tài khoản học"
									className={ generalStyles.login_Email__email__pass}
									onChange={handleChangePass}
								/>
								<p
									onClick={handleSelectType}
									className= { generalStyles.login_Email__email__showPass }
								>
									{selectType === 'password' ? 'Hiển thị' : 'Ẩn'}
								</p>
								{errorPass && <p className={ generalStyles.error_text }>{errorPass}</p>}
							</div>
						</div>
						<div className= { generalStyles.login_button }>
							<button
								className={ generalStyles.isClass }
								onClick={handleSubmitLogin}
								disabled={
									errorEmail !== '' ||
									errorPass !== '' ||
									email === '' ||
									password === ''
								}
							>
								Đăng nhập
							</button>
						</div>
						<div className={ generalStyles.login_forgot_pass } onClick={showPopUpForgotPass}>
							<span>Quên mật khẩu?</span>
						</div>
						<div className={ generalStyles.login_register }>
							<span>Chưa có tài khoản?</span>
							<span
								className= { generalStyles.login_register__open}
								onClick={() => setShowRegister(true)}
							>
								Tạo tài khoản học mới
							</span>
						</div>
					</div>
				</div>
			)}
			{showModal && (
				<ModalMochi
					login={handleReload}
					modal={showModal}
					toggle={handleReload}
					img={mochiLogo}
					text={`Bạn đã đăng nhập thành công và có thể lưu từ vào sổ tay`}
					ButtonText1={'Học ngay thôi'}
				/>
			)}
			{showForgotPass && (
				<ModalMochi
					modal={showForgotPass}
					toggle={toggle}
					img={mochiLogo1}
					login={inboxMochi}
					text={`Bạn hãy inbox cho Mochi để được hỗ trợ đổi mật khẩu nhé `}
					ButtonText1={'Chat với Mochi'}
				/>
			)}
		</>
	);
};

export default Login;
