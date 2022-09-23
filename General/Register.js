import React, { useState, useEffect } from 'react';
import generalStyles from "./_general.module.scss";
import ExitPopup from '../assets/images/Exit.png';
import Apple from '../assets/images/apple-logo.png';
import Face from '../assets/images/fb-logo.png';
import Googgle from '../assets/images/google-logo (2).png';
import backIcon from '../assets/images/back icon.png';
import mochiLogo from '../assets/images/Mochi-meomeo2-01.png';
import ModalMochi from '../components/common/Modal/Modal';
import { ApiRegister } from '../Firebase/userApi';
import { ApiLoginSocial } from '../Firebase/userApi';
import { app } from '../Firebase/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import Image from 'next/image';
// import {pauseVideoYoutube} from "~/utils/video";
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
function Register(props) {
    const { toggle, setShowLogin, setShowRegister, showRegister } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [selectType, setSelectType] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPass, setErrorPass] = useState('');
    const [background, setBackground] = useState('no');
    const [showModal, setShowModal] = useState(false);

    const showCreateEmail = () => {
        setShowCreate(true);
    };

    const backCreate = () => {
        setShowCreate(false);
    };

    const handleSelectType = () => {
        if (selectType === 'password') {
            setSelectType('text');
        } else {
            setSelectType('password');
        }
    };

    const handleChangeUsername = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (value.length < 3 || value.length > 15) {
            setErrorUsername('Tên hiển thị cần có từ 3-15 ký tự');
            setUsername('');
        } else {
            setErrorUsername('');
        }
    };

    const handleChangePass = (event) => {
        const value = event.target.value.trim();
        if (value == '' || value.length < 6) {
            setErrorPass('Mật khẩu cần có ít nhất 6 ký tự');
            setPassword('');
        } else {
            setPassword(value);
            setErrorPass('');
        }
    };

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
    const isDisableSubmit = () => {
        return errorUsername || errorEmail || errorPass || !email || !password || !username;
    };

    useEffect(() => {
        if (email && password && username) {
            setBackground('ok');
        } else {
            setBackground('no');
        }
    }, [errorPass, errorEmail, errorUsername]);

    const handleSubmitLogin = async () => {
        if (!isDisableSubmit()) {
            const body = {
                display_name: `${username}`,
                trial_course: 1,
                email: `${email}`,
                password: `${password}`,
                lang: 'vn',
            };
            await ApiRegister(body);
            setShowModal(true);
        }
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider).then(async (result) => {
            await ApiLoginSocial('google', result.user);
            setShowModal(true);
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
    const handleReload = () => {
        toggle();
        window.location.reload();
    };

    useEffect(() => {
        // pauseVideoYoutube();
    }, [])

    return (
        <>
            {showRegister && !showModal && (
                <div className={ generalStyles.register }>
                    <div className={ generalStyles.register_container }>
                        {!showCreate && (
                            <>
                                <Image src={ExitPopup} alt="" onClick={toggle} className= { generalStyles.login_close_Image } 
                                    width= { 30 } height= { 30 }
                                />
                                <p className={ generalStyles.register_title }>Bạn muốn tạo tài khoản bằng cách nào nhỉ?</p>
                                <Image src={mochiLogo} alt="" className= { generalStyles.register_container__img } />
                                <div className={ generalStyles.register_noEmail }>
                                    <div className= { generalStyles.login_noEmail__google } onClick={handleGoogleSignIn}>
                                        <Image src={Googgle} alt="Google" />
                                        <span style={{ marginLeft: "10px" }} >Đăng nhập với G+</span>
                                    </div>
                                    <div className={ generalStyles.login_noEmail__face } onClick={handleFacebookSignIn}>
                                        <Image src={Face} alt="Facebook" />
                                        <span style={{ marginLeft: "10px" }} >Đăng nhập với Facebook</span>
                                    </div>
                                </div>
                                <p className={ generalStyles.login_OR }>HOẶC</p>
                                <div className={ generalStyles.register_container__create }>
                                    <button onClick={showCreateEmail}>Tự tạo tài khoản với email</button>
                                </div>
                                <div className={ generalStyles.register_container__login }>
                                    <span>Bạn đã có tài khoản?</span>
                                    <span
                                        onClick={() => {
                                            setShowLogin(true);
                                            setShowRegister(false);
                                        }}
                                        className={ generalStyles.register_container__login__login }
                                    >
                                        Đăng nhập ngay
                                    </span>
                                </div>
                            </>
                        )}
                        {showCreate && (
                            <>
                                <Image src={backIcon} alt="back" onClick={backCreate} className={ generalStyles.login_close_Image } width= { 30 } height= { 30 } />
                                <p className={ generalStyles.create_title }>Cùng tạo 1 tài khoản Mochi nào</p>
                                <Image src={mochiLogo} alt="" className= { generalStyles.register_container__img } />
                                <div className={ generalStyles.register_container__name }>
                                    <input type="text" placeholder="Tên của bạn" onChange={handleChangeUsername} />
                                    {errorUsername && <p className={ generalStyles.error_text }> {errorUsername} </p>}
                                </div>
                                <div className={ generalStyles.register_container__email }>
                                    <input
                                        type="text"
                                        placeholder="Nhập chính xác email của bạn"
                                        onChange={handleChangeEmail}
                                    />
                                    {errorEmail && <p className={ generalStyles.error_text }> {errorEmail}</p>}
                                </div>
                                <div className={ generalStyles.register_container__password }>
                                    <input
                                        type={selectType}
                                        placeholder="Tạo mật khẩu (dễ nhớ chút nhé ^^)"
                                        onChange={handleChangePass}
                                    />
                                    {errorPass && <p className={ generalStyles.error_text }>{errorPass}</p>}
                                    <p onClick={handleSelectType} className={ generalStyles.login_Email__email__showPass }>
                                        {selectType === 'password' ? 'Hiển thị' : 'Ẩn'}
                                    </p>
                                </div>
                                <div className={ generalStyles.register_container__button }>
                                    <button
                                        className={`login_button__${background}`}
                                        onClick={handleSubmitLogin}
                                        disabled={
                                            errorEmail !== '' || errorPass !== '' || email === '' || password === ''
                                        }
                                    >
                                        Tạo tài khoản
                                    </button>
                                </div>
                                <div className={ generalStyles.register_container__footer }>
                                    <span>Bạn đã có tài khoản ?</span>
                                    <span
                                        onClick={() => {
                                            setShowLogin(true);
                                            setShowRegister(false);
                                        }}
                                        className={ generalStyles.register_container__footer__login }
                                    >
                                        Đăng nhập
                                    </span>
                                </div>
                            </>
                        )}
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
        </>
    );
}

export default Register;
