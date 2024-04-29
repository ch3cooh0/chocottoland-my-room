import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { Status, Equipments,Equipped,Equipment } from "../../types/global";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    category: string;
    equipmentList: Equipment[];
}

const EquipmentSearchModal: React.FC<Props> = ({ isOpen, onRequestClose,category, equipmentList }) => {
    const [searchName, setSearchName] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string>(category); 
    const [sortKey, setSortKey] = useState<keyof Equipment['status'] | ''>('');
    const [filteredEquipmentList, setFilteredEquipmentList] = useState<Equipment[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
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

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Equipment Search">
            <h2>Equipment Search</h2>
            <div>
                <label>
                    名前:
                    <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </label>
                <label>
                    部位:
                    <input type="text" value={searchCategory} readOnly />
                </label>
            </div>
            <div>
                <label>
                    ソート条件:
                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value as keyof Equipment['status'])}>
                        <option value="pow">pow</option>
                        <option value="int">int</option>
                        <option value="vit">vit</option>
                        <option value="spd">spd</option>
                        <option value="luk">luk</option>
                        <option value="hp">HP</option>
                        <option value="sp">SP</option>
                        <option value="ATK">ATK</option>
                        <option value="DEF">DEF</option>
                        <option value="MAT">MAT</option>
                        <option value="MDF">MDF</option>
                        <option value="HPR">HPR</option>
                        <option value="SPR">SPR</option>
                        <option value="EXP">EXP</option>
                        <option value="PET">PET</option>
                        <option value="MOV">MOV</option>
                        <option value="DRN">DRN</option>
                    </select>
                </label>
            </div>
            <div>
                <h3>Search Results</h3>
                <ul>
                    {currentItems.map((equipment) => (
                        <li key={equipment.id}>{equipment.name}</li>
                    ))}
                </ul>
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default EquipmentSearchModal;
