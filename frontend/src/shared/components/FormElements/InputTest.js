import React from 'react'
import { useReducer, useEffect } from 'react';

import './Input.css'
import { validate } from '../../util/validators';

function reduce(state, action) {
    switch (action.type) {
        case 'CHANGED':
            return { ...state, value: action.val, isValid: validate(action.val, action.valType) }
        case 'TOUCHED':
            return {...state, isTouched: true}
        default:
            return state
    }
}

const InputTest = (props) => {

    const [state, dispatch] = useReducer(reduce, { value: '', isValid: false, isTouched: false });
    
    const data = {
        id: props.id,
        val: state.value,
        isValid: state.isValid
    };

    // const childrenCallBack = props.childrenCallBack

    useEffect(() => {
        props.childrenCallBack(data);
        console.log(data.isValid);
    }, [state]);

    const element = props.element === 'oneLineInput' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={(event) => dispatch({ type: 'CHANGED', val: event.target.value, valType: props.validators })}
            onBlur={() => dispatch({type: 'TOUCHED'})}
        />
    ) : (
        <textarea
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            rows = {3}
            onChange={(event) => dispatch({ type: 'CHANGED', val: event.target.value, valType: props.validators })}
            onBlur={() => dispatch({type: 'TOUCHED'})}
        />
    )

    return (
        <div className={`form-control ${!state.isValid && state.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}> {props.label} </label>
            {element}
            {!state.isValid && state.isTouched && <p>{ props.errorMessage }</p>}
        </div>
    );
}

export default InputTest