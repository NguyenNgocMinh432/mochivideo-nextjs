import React from 'react';
import inforStyles from "./_userInfor.module.scss";
import ExitIcon from '../assets/images/Exit.png';
import AvatarUser from '../assets/images/Mochi-avatar.png';
import UserEmail from '../assets/images/user__email.png';
import UserDate from '../assets/images/User_date.png';
import Meomeo from '../assets/images/Mochi-meomeo2-01.png';
import { delete_cookie } from '../libs/cookie';
import { convertDate } from '../libs/videos';
import UserPremium from '../assets/images/Mochi-avatar.png';
import Image from 'next/image';

const UserInfo = ({ isUser, setUser, userInfor }) => {
    const handleLogout = () => {
        delete_cookie('user_token');
        localStorage.removeItem("usemsg")
        window.location.reload();
    }
    return (
        <div className={ inforStyles.user_info }>
            <div className={ inforStyles.user__container }>
                <div className={ inforStyles.user__title }>
                    <Image src={ExitIcon} alt="" onClick={() => setUser(!isUser)} 
                    width= { 30 }
                    height= { 32 }
                    className= { inforStyles.user__close }
                    />
                    <span>Thông tin tài khoản</span>
                </div>
                <div className={ inforStyles.user__information }>
                    <div className={ inforStyles.user__avt }>
                        <div
                            className={`${ inforStyles.img_outer } ${
                                userInfor.expired_day === null ? 'img_outer_free' : 'img_outer_premium'
                            }`}
                        >
                            <Image src={userInfor.expired_day === null ? AvatarUser : UserPremium} alt="" 
                            width= { 140 }
                            height= { 140 }
                            />
                        </div>
                        {userInfor.expired_day === null ? (
                            <div className={`${ inforStyles.user_level} ${ inforStyles.user_level_free}`}>Free account</div>
                        ) : (
                            <div className={`${ inforStyles.user_level} ${ inforStyles.user_level_premium}`}>Premium account</div>
                        )}
                    </div>
                    <div className={ inforStyles.user__account }>
                        <div className= { inforStyles.user__account__name }>
                            <p>{userInfor.display_name}</p>
                        </div>
                        <div className={ inforStyles.user__account__email }>
                            <Image src={UserEmail} alt="" width={ 20 } height={ 16 } />
                            <span
                                style={{
                                    fontWeight: 700,
                                    marginRight: '5px',
                                    marginLeft: '5px'
                                }}
                            >
                                Email:{' '}
                            </span>
                            <span>{userInfor.email}</span>
                        </div>
                        <div className={ inforStyles.user__account__date }>
                            {userInfor.expired_day !== null ? <Image src={UserDate} alt="" width= {17} height= { 19 }/> : '' }
                            <span
                                style={{
                                    fontWeight: 700,
                                    marginRight: '5px',
                                    marginLeft: '5px'
                                }}
                            >
                                {userInfor.expired_day !== null ? 'Ngày kết thúc:' : ''}{' '}
                            </span>
                            <span>{convertDate(userInfor.expired_day)}</span>
                        </div>
                    </div>
                </div>
                <div className={ inforStyles.user__open__website }>
                    <div className={ inforStyles.open__web__title }>
                        <p>Truy cập website MochiMochi để ôn tập các từ đã lưu</p>
                    </div>
                    <div
                        className={ inforStyles.open__web__btn }
                        onClick={() => {
                            window.open('https://learn.mochidemy.com/', '_blank');
                        }}
                    >
                        Mở website ngay
                    </div>
                </div>
                <div className={ inforStyles.user__logout }>
                    <img src={Meomeo} alt="" />
                    <p
                        className={ inforStyles.btn__logout }
                        onClick={ handleLogout }
                    >
                        Đăng xuất
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
