import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //getcat
    const getCategories = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/categories/get-category`
            );
            setCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
    return categories;
};