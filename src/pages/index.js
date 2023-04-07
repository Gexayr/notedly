// Импортируем React и зависимости маршрутизации
import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
// Импортируем общий компонент макета
import Layout from '../components/Layout';
// Импортируем маршруты
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
// Импортируем маршрут signup
import SignUp from './signup';
// Импортируем компонент страницы sign-in
import SignIn from './signin';
// Импортируем компонент маршрута NewNote
import NewNote from './new';
// Импортируем компонент страницы edit
import EditNote from './edit';


import { useQuery, gql } from '@apollo/client';
import {IS_LOGGED_IN} from '../gql/query'

// Добавляем компонент PrivateRoute под компонентом 'Pages'
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    console.log(data)
// Если данные загружаются, выводим сообщение о загрузке
    if (loading) return <p>Loading...</p>;
// Если при получении данных произошел сбой, выводим сообщение об ошибке
    if (error) return <p>Error!</p>;
// Если пользователь авторизован, направляем его к запрашиваемому компоненту
    // В противном случае перенаправляем на страницу авторизации
    return(
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};



// Определяем маршруты
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </Router>
    );
};
export default Pages;