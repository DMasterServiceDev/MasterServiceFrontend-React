import React, { useState } from 'react'
import AuthService from "../services/auth.service";
import { withRouter } from '../common/with-router';
import './auth.css'

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
    }
    return (
        <div className='activationroot'>
            <div className='activationblock'>
                <h3 className='activationtext'>Заполните информацию о себе, чтобы продолжить</h3>
                <div>
                    <form className='activationform'>
                        <input className='reginput regactivationinput' placeholder='Имя'
                            type="text"
                            id="name"
                            name="name"
                            value={activation.name}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput regactivationinput' placeholder='О себе'
                            type="text"
                            id="description"
                            name="description"
                            value={activation.description}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput regactivationinput' placeholder='Начало рабочего дня'
                            type="text"
                            id="start"
                            name="start"
                            value={activation.start}
                            onChange={changeInputActivation}
                        />
                        <input className='reginput regactivationinput' placeholder='Конец рабочего дня'
                            type="text"
                            id="finish"
                            name="finish"
                            value={activation.finish}
                            onChange={changeInputActivation}
                        />
                        <div className="activationbtnblock">
                            <button className='leftbtn leftauthbtn'>Назад</button>
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