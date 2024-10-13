import React, { useState } from "react"
import { Layout } from "../../shared/Layout"
import { useAppSelector } from "../../store/hooks"
import s from './ProfilePage.module.sass'
import { useForm } from "react-hook-form"
import { postProfileApi } from "../../entities/Register/api/request"
import { isTErrorResponse, TServerError } from "../../shared/fetchHelpers/typeGuards"

export const ProfilePage = () => {
    const profile = useAppSelector(state => state.authAndProfile.profile);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit } = useForm({
        defaultValues: { ...profile }
    });

    return (
        <Layout>
            <form onSubmit={handleSubmit((data) => {

                postProfileApi(data)
                    .then((response) => {
                        setSuccessMessage('Профиль сохранен')
                    })
                    .catch((error: unknown) => {
                        if (isTErrorResponse(error)) {
                            let allErrors = "";
                            error.response.data.errors.forEach((e: TServerError) => allErrors += e.message)
                            setErrorMessage(allErrors)
                        } else {
                            //unknownError
                        }
                    });

            })}>
                <div className={s.containerColumn}>
                    <div>
                        Профиль пользователя
                    </div>

                    {errorMessage &&
                        <div>{errorMessage}</div>
                    }
                    {successMessage &&
                        <div>{successMessage}</div>
                    }


                    <div className={s.containerRow}>
                        <div>Имя:</div>
                        <input {...register('name')} />
                    </div>

                    <div className={s.containerRow}>
                        <div>Почта:</div>
                        <input {...register('email')} />
                    </div>

                    <div className={s.containerRow}>
                        <div>Дата регистрации:</div>
                        <input {...register('signUpDate')} disabled={true} />
                    </div>

                    {/* <div className={s.containerRow}>
                    <div>Роль в системе:</div>
                    {profile.role}
                </div> */}

                </div>

                <button type="submit">Сохранить</button>
            </form>
        </Layout >
    )
}