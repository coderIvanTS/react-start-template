import React, { useState } from "react"
import { Modal } from "../../../../shared/Modal"
import { addProductApi } from "../../api/request";
import { Category, TAddProductParams } from "../../model/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { LabelWrapper } from "../../../../shared/LabelWrapper";
import s from './AddProductModal.modal.sass';

export interface IAddProductModalProps {
    isOpen: boolean;
    category?: Category,
    onAddCategory: () => void;
    onClose: () => void;
}

export const AddProductModal = ({ isOpen, category, onAddCategory, onClose }: IAddProductModalProps) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },

    } = useForm<TAddProductParams>({
        defaultValues: {
            name: "test",
            price: 0,
        }
    }

    );

    const onSubmit: SubmitHandler<TAddProductParams> = (data) => {
        const newProduct: TAddProductParams = {
            name: data.name,
            price: data.price,
            categoryId: category ? category.id : "unknown"
        }
        addProductApi(newProduct);
        onClose();
    }


    return (
        <>
            {/* Модальное окно */}
            <Modal isOpen={isOpen} onClose={onClose}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <LabelWrapper title={"Имя"} required={true}>
                        <input {...register("name")} />
                    </LabelWrapper>

                    {/* photo */}

                    <LabelWrapper title={"Стоимость"} required={true}>
                        <input {...register("price")} />
                    </LabelWrapper>

                    <LabelWrapper title={"Старая цена"} required={false}>
                        <input {...register("oldPrice")} />
                    </LabelWrapper>

                    <LabelWrapper title={"Описание"} required={false}>
                        <input {...register("desc")} />
                    </LabelWrapper>


                    <LabelWrapper title={"Категория"} required={true}>
                        <input value={category ? category.name : ""} />
                    </LabelWrapper>
                    <div>
                        <button type="button" onClick={onAddCategory}>Выбрать категорию</button>
                    </div>

                    <button className={s.button} type="submit" >Добавить</button>
                </form>

            </Modal>
        </>
    )
}