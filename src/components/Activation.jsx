import api from "../services/api";
import React, { useState } from 'react'
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";
import './reglogstyle.css'

function Activation(props) {
    const [activation, setActivation] = useState(() => {
        return {
            name: "",
            description: "",
            start: "",
            finish: ""
        }
    })
    const [successful, setSuccesful] = useState(false)
    const [message, setMessage] = useState('')

    const changeInputActivation = event => {
        event.persist()
        setActivation(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    const submitChackin = event => {
        event.preventDefault();
    
        AuthService.activate(
            activation.name,
            activation.description,
            activation.start,
            activation.finish
        ).then(
            () => {
                props.router.navigate("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setSuccesful(false)
                setMessage(resMessage)
                console.log(activation.username,
                    activation.password,
                    activation.email,
                    activation.role)
            }
        );
        // AuthService.login(
        //     register.username,
        //     register.password
        // ).then(
        //     () => {
        //         this.props.router.navigate("/profile");
        //         window.location.reload();
        //     },
        //     error => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();
        //         setLoading(false)
        //         setMessage(resMessage)
        //         console.log(register.username,
        //             register.password)
        //     }
        // );

    }
    return (
        // <div className='regroot'>
        //     <div className='regrootblock'>
        //         <div className='regblock'>
        //             <div className='leftblock'>
        //                 <div className='leftinner'>
        //                     <h1 className='lefttitle'>Ещё нет аккаунта?</h1>
        //                     <p className='lefttext'>Зарегестрируйтесь, чтобы воспользоваться всеми функциями сайта</p>
        //                     <Link to={"/register"}>
        //                         <button className='leftbtn'>РЕГИСТРАЦИЯ</button>
        //                     </Link>
        //                 </div>
        //             </div>
        //             <div className='rightblock'>
        //                 <div className='rightinner'>
        //                     <div className='rightregblock'>
        //                         <h1 className='righttitle'>Войти</h1>
        //                     </div>
        //                     <div className='rightregblock'>
        //                         <form className='regform'>
        //                             <input className='reginput' placeholder='Логин'
        //                                 type="username"
        //                                 id="username"
        //                                 name="username"
        //                                 value={register.username}
        //                                 onChange={changeInputRegister}
        //                             />
        //                             <input className='reginput' placeholder='Пароль'
        //                                 type="password"
        //                                 id="password"
        //                                 name="password"
        //                                 value={register.password}
        //                                 onChange={changeInputRegister}
        //                             />
        //                             <div className='regbtnblock'>
        //                                 <button type="submit" onClick={submitChackin} className='rightbtn'>ВХОД</button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='activationroot'>
            <div className='activationblock'>
                <h3 className='activationtext'>Заполните информацию о себе, чтобы продолжить</h3>
                <div>
                    <form className='activationform'>
                        <input className='reginput' placeholder='Имя'
                            type="text"
                            id="name"
                            name="name"
                            value={activation.name}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput' placeholder='О себе'
                            type="text"
                            id="description"
                            name="description"
                            value={activation.description}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput' placeholder='Начало рабочего дня'
                            type="text"
                            id="start"
                            name="start"
                            value={activation.start}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput' placeholder='Конец раюочего дня'
                            type="text"
                            id="finish"
                            name="finish"
                            value={activation.finish}
                            onChange={changeInputActivation}
                        />
                        <div className="activationbtnblock">
                            <button className='leftbtn'>Назад</button>
                            <button className='rightbtn' 
                            type="submit" 
                            onClick={submitChackin}>Проодолжить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Activation);