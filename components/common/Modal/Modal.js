import React, { useState } from 'react';
import Image from "next/image";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import modalStyles from "./_modal.module.scss";
import iconClose from "../../../assets/images/Exit.png";

function ModalMochi(props) {
    const { modal, toggle, login, register, img, text, ButtonText1, ButtonText2 } = props;
    const handleClickPopup = (value) => {
        if (value === 'Đăng nhập') {
            return (
                <div className= { modalStyles.modal__button }>
                    <span onClick={login} dangerouslySetInnerHTML={{ __html: ButtonText1 }}></span>
                </div>
            );
        }
        if (value === 'Nâng cấp ngay') {
            return (
                <div className= { modalStyles.modal__button }>
                    <span onClick={() => window.open('https://mochidemy.com/extension/', '_blank')} dangerouslySetInnerHTML={{ __html: ButtonText1 }}></span>
                </div>
            );
        }
        if (value === 'Ôn tập ngay') {
            return (
                <div className= { modalStyles.modal__button }>
                    <span
                        onClick={() => {
                            window.open('https://learn.mochidemy.com/', '_blank');
                        }}
                        dangerouslySetInnerHTML={{ __html: ButtonText1 }}
                    >
                    </span>
                </div>
            );
        }
        if (value === 'Mở website ngay') {
            return (
                <div className= { modalStyles.modal__button }>
                    <span
                        onClick={() => {
                            window.open('https://learn.mochidemy.com/', '_blank');
                        }}
                        dangerouslySetInnerHTML={{ __html: ButtonText1 }}
                    >
                    </span>
                </div>
            );
        }
        if (value === 'Học ngay thôi') {
            return (
                <div className= { modalStyles.modal__button }>
                    <span onClick={login}
                    dangerouslySetInnerHTML={{ __html: ButtonText1 }}
                    ></span>
                </div>
            );
        }
    };
    return (
        <div>
            <Modal isOpen={ modal } toggle={toggle} {...props}>
                <Image
                    // src={LogoMochi}
                    // src={}
                    alt=""
                    style={{
                        width: '230px',
                        height: '190px',
                        position: 'absolute',
                        top: '-110px',
                        left: '52%',
                        transform: 'translateX(-50%)',
                        zIndex: '1111111',
                    }}
                    className= { modalStyles.modal__mochi__logo }
                />
                <Image src={iconClose} alt="" width={ 24 } height= { 24 } className={ modalStyles.mochi__close } onClick={toggle} />
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <p className= { modalStyles.modal_text }>{text}</p>
                </ModalBody>
                <ModalFooter>
                    {/* {ButtonText1 && 
                    <div className={ modalStyles.modal__button }>
                        <span onClick={login}
                        >{ButtonText1}</span>
                    </div>
                    } */}
                    {handleClickPopup(ButtonText1)}
                    {ButtonText2 && (
                        <div className= { modalStyles.modal__button_register }>
                            <span onClick={register}>{ButtonText2}</span>
                        </div>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalMochi;
