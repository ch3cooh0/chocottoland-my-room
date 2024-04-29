import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';
import { useEquipmentSearch } from '../hooks/useEquipmentSearch';
import { Status, Equipments,Equipped,Equipment } from "../../types/global";
import EquipmentCard from "./EquipmentCard";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    category: string;
    equipmentList: Equipment[];
}

const EquipmentSearchModal: React.FC<Props> = ({ isOpen, onRequestClose,category, equipmentList }) => {
    const {
        searchName,
        setSearchName,
        searchCategory,
        setSortKey,
        currentItems,
        pageCount,
        handlePageClick
    } = useEquipmentSearch({ equipmentList, initialCategory: category });

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
                    <select onChange={(e) => setSortKey(e.target.value as keyof Equipment['status'])}>
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
                <div className="equipment-list">
                    {currentItems.map((equipment) => (
                        <EquipmentCard key={equipment.id} equipment={equipment} />
                    ))}
                </div>
            </div>
            <ReactPaginate
                previousLabel={"◁"}
                nextLabel={"▷"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
            <button className="button" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default EquipmentSearchModal;
