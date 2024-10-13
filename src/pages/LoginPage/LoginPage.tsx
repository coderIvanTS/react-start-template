import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { profileRegister, saveProfile, saveToken } from "../../store/slices/authAndProfile";
import s from './LoginPage.module.sass';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout } from "../../shared/Layout";

export const LoginPage = () => {
    const token = useAppSelector(state => state.authAndProfile.auth.token);
    const error = useAppSelector(state => state.authAndProfile.error);
    const dispatcher = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: { email: "", password: "" },
    });

    const onConfirm = (email: string, password: string) => {
        dispatcher(profileRegister({ isNewUser: false, email, password }));
    }

    return (
        <Layout>
            <form className={s.formContainerColumn} onSubmit={handleSubmit((data) => {
                onConfirm(data.email, data.password)
            })}>
                <div>
                    Введите почту и пароль
                </div>

                {token &&
                    <div className={s.success}>
                        {'Успешный вход'}
                    </div>}
                {error.isError &&
                    <div className={s.error}>
                        {error.errorMessage}
                    </div>
                }

                <div className={s.containerColumn}>
                    <label>Почта:</label>
                    <input {...register('email')} />
                </div>

                <div className={s.containerColumn}>
                    <label>Пароль:</label>
                    <input {...register('password')} type="password" />
                </div>

                <button className={s.button} type="submit">Войти</button>

                <NavLink to="/register_saga">
                    {'Я новый пользователь'}
                </NavLink >
            </form>

        </Layout>
    )
}