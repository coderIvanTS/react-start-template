import React, { useEffect } from "react"
import { Modal } from "../../../../shared/Modal"
import { addProductApi } from "../../api/request";
import { Category, TAddProductParams } from "../../model/types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { LabelWrapper } from "../../../../shared/LabelWrapper";
import { z } from 'zod';
import s from './AddProductModal.modal.sass';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(3, { message: 'Минимальная длина имени товара 3 символа' }),
    photo: z.string().nullable(),
    desc: z.string().nullable(),
    oldPrice: z.preprocess((p) => {
        const res = p === '' ? undefined : Number(p);
        return res;
    }, z.number().optional()),
    price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive({ message: 'Укажите стоимость товара' })),
    categoryId: z.string({ message: 'Обязательно для заполнения' }),
});

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
        resolver: zodResolver(schema),
        defaultValues: {
            name: "Имя продукта",
            price: 0,
        },
    }
    );

    useEffect(() => {
        if (category && category.id) {
            setValue('categoryId', category.id);
        }
    }, [category]);

    const onSubmit: SubmitHandler<TAddProductParams> = (data) => {
        const newProduct: TAddProductParams = {
            name: data.name,
            price: data.price,
            categoryId: category ? category.id : "unknown",
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
                    {errors.name && <p className={s.red}>{errors.name.message}</p>}

                    <LabelWrapper title={"Фото"} required={true}>
                        <input {...register("photo")} />
                    </LabelWrapper>
                    {errors.photo && <p className={s.red}>{errors.photo.message}</p>}

                    <LabelWrapper title={"Стоимость"} required={true}>
                        <input {...register("price")} />
                    </LabelWrapper>
                    {errors.price && <p className={s.red}>{errors.price.message}</p>}

                    <LabelWrapper title={"Старая цена"} required={false}>
                        <input {...register("oldPrice")} />
                    </LabelWrapper>
                    {errors.oldPrice && <p className={s.red}>{errors.oldPrice.message}</p>}

                    <LabelWrapper title={"Описание"} required={false}>
                        <input {...register("desc")} />
                    </LabelWrapper>
                    {errors.desc && <p className={s.red}>{errors.desc.message}</p>}


                    <LabelWrapper title={"Категория"} required={true}>
                        {category ? category.name : ""}
                    </LabelWrapper>
                    {errors.categoryId && <p className={s.red}>{errors.categoryId.message}</p>}

                    <div>
                        <button type="button" onClick={onAddCategory}>Выбрать категорию</button>
                    </div>

                    <button className={s.button} type="submit" >Добавить</button>
                </form>

            </Modal>
        </>
    )
}