import React, { FC, useEffect, useState } from "react"
import { ViewProduct } from "../ViewProduct/ViewProduct";
import s from './ViewProductList.module.sass';
import { addProductApi, getProductsApi, putProductApi } from "./api/request";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { addToShop } from "../../store/slices/productSlice";
import { Category, Product, Sorting, TAddProductParams, TUpdateProductParams } from "./model/types/types";
import { AddProductModal } from "./ui/AddProductModal/AddProductModal";
import { CategoryModal } from "./ui/CategoryModal";

interface IViewProductListProps {
    isEditMode: boolean;
}

export const ViewProductList = ({ isEditMode }: IViewProductListProps) => {
    const MAX_ON_PAGE = 10;
    const sort: Sorting = { type: 'ASC', field: 'id' };

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [productList, setProductList] = useState<Product[]>([]);

    // Модальное окно - добавления товара
    const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);

    // Модальное окно - выбора\добавления категории
    const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>()

    useEffect(() => {

        const init = async () => {
            const response = await getProductsApi(MAX_ON_PAGE, pageNumber, sort);
            if(response.data){
                setProductList(response.data)
            }
        }

        init();
    }, []);

    const handleNextPage = async () => {

        const response = await getProductsApi(MAX_ON_PAGE, pageNumber + 1, sort);
        if(response.data){
            setProductList(prev => prev.concat(...response.data))
        }

        setPageNumber(prev => prev + 1);
    }

    const handleAddProduct = () => {
        setIsOpenAddProductModal(true)
    }

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setIsOpenAddCategoryModal(false);
        setIsOpenAddProductModal(true);
    }

    const handleSaveChanges = (product: TUpdateProductParams) => {
        putProductApi(product)
    }

    return (
        <div className={s.viewProduct}>

            {isEditMode &&
                <button type="button" onClick={handleAddProduct}>
                    {'Добавить новый продукт'}
                </button>
            }
            {
                productList.map((p, index) =>
                    <ViewProduct
                        product={p}
                        key={p.id}
                        isLast={index === productList.length - 1}
                        isEditMode={isEditMode}
                        onSaveChanges={handleSaveChanges}
                        nextPage={handleNextPage}
                    />)
            }

            {/* Модальное окно - добавления товара */}
            <AddProductModal
                isOpen={isOpenAddProductModal}
                category={selectedCategory}
                onAddCategory={() => {
                    setIsOpenAddProductModal(false)
                    setIsOpenAddCategoryModal(true)
                }}
                onClose={() => {
                    setIsOpenAddProductModal(false)
                }}
            />

            {/* Модальное окно - выбора\добавления категории */}
            <CategoryModal
                isOpen={isOpenAddCategoryModal}
                onConfirm={handleSelectCategory}
                onClose={() => {
                    setIsOpenAddCategoryModal(false);
                    setIsOpenAddProductModal(true);
                }}
            />
        </div>
    )
}
