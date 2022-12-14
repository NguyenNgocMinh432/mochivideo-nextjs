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
            setErrorUsername('T??n hi???n th??? c???n c?? t??? 3-15 k?? t???');
            setUsername('');
        } else {
            setErrorUsername('');
        }
    };

    const handleChangePass = (event) => {
        const value = event.target.value.trim();
        if (value == '' || value.length < 6) {
            setErrorPass('M???t kh???u c???n c?? ??t nh???t 6 k?? t???');
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
            setErrorEmail('Email sai ?????nh d???ng, b???n ki???m tra l???i nh??');
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
                                <p className={ generalStyles.register_title }>B???n mu???n t???o t??i kho???n b???ng c??ch n??o nh????</p>
                                <Image src={mochiLogo} alt="" className= { generalStyles.register_container__img } />
                                <div className={ generalStyles.register_noEmail }>
                                    <div className= { generalStyles.login_noEmail__google } onClick={handleGoogleSignIn}>
                                        <Image src={Googgle} alt="Google" />
                                        <span style={{ marginLeft: "10px" }} >????ng nh???p v???i G+</span>
                                    </div>
                                    <div className={ generalStyles.login_noEmail__face } onClick={handleFacebookSignIn}>
                                        <Image src={Face} alt="Facebook" />
                                        <span style={{ marginLeft: "10px" }} >????ng nh???p v???i Facebook</span>
                                    </div>
                                </div>
                                <p className={ generalStyles.login_OR }>HO???C</p>
                                <div className={ generalStyles.register_container__create }>
                                    <button onClick={showCreateEmail}>T??? t???o t??i kho???n v???i email</button>
                                </div>
                                <div className={ generalStyles.register_container__login }>
                                    <span>B???n ???? c?? t??i kho???n?</span>
                                    <span
                                        onClick={() => {
                                            setShowLogin(true);
                                            setShowRegister(false);
                                        }}
                                        className={ generalStyles.register_container__login__login }
                                    >
                                        ????ng nh???p ngay
                                    </span>
                                </div>
                            </>
                        )}
                        {showCreate && (
                            <>
                                <Image src={backIcon} alt="back" onClick={backCreate} className={ generalStyles.login_close_Image } width= { 30 } height= { 30 } />
                                <p className={ generalStyles.create_title }>C??ng t???o 1 t??i kho???n Mochi n??o</p>
                                <Image src={mochiLogo} alt="" className= { generalStyles.register_container__img } />
                                <div className={ generalStyles.register_container__name }>
                                    <input type="text" placeholder="T??n c???a b???n" onChange={handleChangeUsername} />
                                    {errorUsername && <p className={ generalStyles.error_text }> {errorUsername} </p>}
                                </div>
                                <div className={ generalStyles.register_container__email }>
                                    <input
                                        type="text"
                                        placeholder="Nh???p ch??nh x??c email c???a b???n"
                                        onChange={handleChangeEmail}
                                    />
                                    {errorEmail && <p className={ generalStyles.error_text }> {errorEmail}</p>}
                                </div>
                                <div className={ generalStyles.register_container__password }>
                                    <input
                                        type={selectType}
                                        placeholder="T???o m???t kh???u (d??? nh??? ch??t nh?? ^^)"
                                        onChange={handleChangePass}
                                    />
                                    {errorPass && <p className={ generalStyles.error_text }>{errorPass}</p>}
                                    <p onClick={handleSelectType} className={ generalStyles.login_Email__email__showPass }>
                                        {selectType === 'password' ? 'Hi???n th???' : '???n'}
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
                                        T???o t??i kho???n
                                    </button>
                                </div>
                                <div className={ generalStyles.register_container__footer }>
                                    <span>B???n ???? c?? t??i kho???n ?</span>
                                    <span
                                        onClick={() => {
                                            setShowLogin(true);
                                            setShowRegister(false);
                                        }}
                                        className={ generalStyles.register_container__footer__login }
                                    >
                                        ????ng nh???p
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
                    text={`B???n ???? ????ng nh???p th??nh c??ng v?? c?? th??? l??u t??? v??o s??? tay`}
                    ButtonText1={'H???c ngay th??i'}
                />
            )}
        </>
    );
}

export default Register;
