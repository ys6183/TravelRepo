import React from 'react'
import { useReducer,useCallback } from 'react';

import InputTest from '../../shared/components/FormElements/InputTest';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css'

function formReducer(state, action) {
    switch (action.type) {
        case 'FORMCHANGED':
            let iterator = true;
            for (const id in state.children) {
                if (id === action.id) {
                    iterator = iterator && action.isValid
                } else {
                    iterator = iterator && state.children[id].isValid
                }
            }
            return {
                ...state,
                children: {
                    ...state.children,
                    [action.id]: {
                        val: action.val,
                        isValid: action.isValid
                    }
                },
                isValid: iterator
            }
    }
}

const NewPlaceTest = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        children: {
            title: {
                val: '', 
                isValid: false
            },
            description: {
                val: '', 
                isValid: false
            }
        },
        isValid: false});

    const callBackHandler = useCallback((dataFromChild) => {
        dispatch({type:'FORMCHANGED', id:dataFromChild.id, val:dataFromChild.val, isValid:dataFromChild.isValid})
    },[])

    // const callBackHandler = (dataFromChild) => {
    //     dispatch({type:'FORMCHANGED', id:dataFromChild.id, val:dataFromChild.val, isValid:dataFromChild.isValid})
    // }

    return (
        <>
            <form className='place-form'>
                <InputTest
                    element='oneLineInput'
                    id='title'
                    label='Title'
                    type='text'
                    placeholder='enter title here'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorMessage='Please enter a valid title'
                    childrenCallBack={ callBackHandler}
                />
                <InputTest
                    element='textarea'
                    id='description'
                    label='Description'
                    type='text'
                    placeholder='enter description here'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorMessage='Please enter a valid description (at least 5 characters).'
                    childrenCallBack={ callBackHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
            
            
        </>
    );
}

export default NewPlaceTest