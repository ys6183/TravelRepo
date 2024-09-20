import React, { useState, useContext } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'
const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true); 
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)
    
    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else { 
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLogin(prevMode => !prevMode);
    }
    
    const authSubmitHandler = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
        auth.login();
    }

    return (
        <Card className='authentication'>
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLogin &&
                    <Input
                        element='input'
                        id='name'
                        type='text'
                        label='Your Name'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter a name'
                        onInput={ inputHandler }
                    />
                }
                <Input
                    element='input'
                    id='email'
                    type='emial'
                    label='E-mail'
                    validators={[VALIDATOR_EMAIL()]}
                    errorText='pleace enter valid email'
                    onInput={ inputHandler}
                />
                <Input
                    element='input'
                    id='password'
                    type='password'
                    label='Password'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='pleace enter valid password (at lease 5 characters)'
                    onInput={ inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    {isLogin?'LOGIN':'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={ switchModeHandler }>SWITCH TO {isLogin?'SIGNUP':'LOGIN'}</Button>
        </Card>
    );
}

export default Auth