import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import {SIGNUP_USER} from '../gql/mutation'
import UserForm from '../components/UserForm';

const SignUp = props => {
    // Устанавливаем состояние формы по умолчанию
    const [values, setValues] = useState();

    // Обновляем состояние при вводе пользователем данных
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
// Обновляем заголовок документа
        document.title = 'Sign Up — Notedly';
    });

    // Apollo Client
    const client = useApolloClient();
    //Добавляем хук мутации
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
// Сохраняем JWT в localStorage
            localStorage.setItem('token', data.signUp);
            console.log(data.signUp);
            // Обновляем локальный кэш
            client.writeData({ data: { isLoggedIn: true } });
            // Перенаправляем пользователя на домашнюю страницу
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* Если данные загружаются, отображаем сообщение о загрузке */}
            {loading && <p>Loading...</p>}
            {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};
export default SignUp;