// hooks/useEquipmentSearch.ts
import { useState, useEffect } from 'react';
import { Equipment } from "../../types/global";

interface UseEquipmentSearchProps {
    equipmentList: Equipment[];
    initialCategory: string;
}

interface UseEquipmentSearchReturn {
    searchName: string;
    setSearchName: (value: string) => void;
    searchCategory: string;
    setSortKey: (key: keyof Equipment['status'] | '') => void;
    currentItems: Equipment[];
    pageCount: number;
    handlePageClick: (data: { selected: number }) => void;
}

export const useEquipmentSearch = ({ equipmentList, initialCategory }: UseEquipmentSearchProps): UseEquipmentSearchReturn => {
    const [searchName, setSearchName] = useState<string>('');
    const [searchCategory] = useState<string>(initialCategory);
    const [sortKey, setSortKey] = useState<keyof Equipment['status'] | ''>('');
    const [filteredEquipmentList, setFilteredEquipmentList] = useState<Equipment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemsPerPage] = useState<number>(10);

    useEffect(() => {
        setCurrentPage(0);
        const filtered = equipmentList.filter(equipment =>
            (searchName === '' || equipment.name.includes(searchName)) &&
            equipment.category === searchCategory
        );
        const sorted = sortKey ? filtered.sort((a, b) => (a.status[sortKey] ?? 0) - (b.status[sortKey] ?? 0)) : filtered;
        setFilteredEquipmentList(sorted);
    }, [searchName, searchCategory, sortKey, equipmentList]);
    

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredEquipmentList.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredEquipmentList.length / itemsPerPage);

    return { searchName, setSearchName, searchCategory, setSortKey, currentItems, pageCount, handlePageClick };
}
