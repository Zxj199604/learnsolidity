import React, { useEffect, useState } from 'react';
import Link from "@docusaurus/Link";
import { Button, Dropdown } from "antd";
import "../../css/component/customNav.scss"
import logo from "../../../static/img/logo-black.png"
import { Divider, Modal } from "antd";
import { useAccount, useConnect } from "wagmi";
import ConnectModal from './connectModal';
import { hashAvatar, nickName } from '../../utils/common';

export const items = (address) => {
    return [
        {
            label: (<a href={`https://decert.me/user/${address}`}>个人中心</a>),
            key: '1',
            icon: '',
        },
        {
            label: (<a href={`https://decert.me/${address}`}>认证</a>),
            key: '2',
            icon: '',
        },
        {
            label: (<p>断开链接</p>),
            key: '3',
            icon: '',
        }
    ]
}

export default function CustomNav(params) {

    const [ isOpen, setIsOpen ] = useState(false);
    const { address, isConnected } = useAccount();
    let [ menu, setMenu ] = useState([]);


    function goDecertme(params) {
        window.location.href = "https://decert.me";
    }
    
    useEffect(() => {
        if (address) {
            menu = items(address);
            setMenu([...menu]);
            console.log(menu);
        }
    },[address])

    return (
        <div className="Header">
            <div className="header-content">
                <div className='nav-left'>
                    <div className="logo" onClick={() => goDecertme()}>
                        <img src={logo} alt="" />
                    </div>
                    <a href="https://decert.me/tutorials">教程</a>
                    <a href="https://decert.me/challenges">挑战</a>
                    <a href="https://decert.me/vitae">认证</a>
                </div>
                <div className='nav-right'>
                    {/* <Button
                        type="ghost"
                        ghost
                        className='lang'
                        onClick={() => {
                            let lang = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';
                            i18n.changeLanguage(lang);
                            localStorage.setItem("decert.lang", lang)
                        }}
                    >
                        {i18n.language === 'zh-CN' ? "中文" : "EN"}
                    </Button> */}
                {
                    isConnected ?
                        // <Dropdown
                        //     placement="bottom" 
                        //     arrow
                        //     // menu={{menu}}
                        //     menu={[
                        //         {
                        //             label: (<a href={`https://decert.me/user/${address}`}>个人中心</a>),
                        //             key: '1',
                        //             icon: '',
                        //         },
                        //         {
                        //             label: (<a href={`https://decert.me/${address}`}>认证</a>),
                        //             key: '2',
                        //             icon: '',
                        //         },
                        //         {
                        //             label: (<p>断开链接</p>),
                        //             key: '3',
                        //             icon: '',
                        //         }
                        //     ]}
                        // >
                            <div className="user">
                                <img src={hashAvatar(address)} alt="" />
                                <p>{nickName(address)}</p>
                            </div>
                        // </Dropdown>
                    :
                    <div>
                        <Button onClick={() => setIsOpen(true)}>链接钱包</Button>
                    </div>
                }
                </div>
            </div>
            <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
                