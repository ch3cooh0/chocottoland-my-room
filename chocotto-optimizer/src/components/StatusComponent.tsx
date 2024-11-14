import React from "react";
import { TotalStatus } from "../../types/types";

interface StatusComponentProps {
    totalStatus: TotalStatus;
}

const StatusComponent: React.FC<StatusComponentProps> = ({
  totalStatus,
}) => {
  return (
    <div>
      <h2>ステータス合計値</h2>
      <div className="status-table">
        <div className="status-table-row">
          <p>HP: {totalStatus.hp}</p>
          <p>SP: {totalStatus.sp}</p>
        </div>
        <div className="status-table-row">
          <p>POW: {totalStatus.pow}</p>
          <p>INT: {totalStatus.int}</p>
          <p>VIT: {totalStatus.vit}</p>
          <p>SPD: {totalStatus.spd}</p>
          <p>LUK: {totalStatus.luk}</p>
        </div>
        <div className="status-table-row">
          <p>ATK: {totalStatus.atk}</p>
          <p>DEF: {totalStatus.def}</p>
          <p>MAT: {totalStatus.mat}</p>
          <p>MDF: {totalStatus.mdf}</p>
        </div>
        <div className="status-table-row">
          <p>HPR: {totalStatus.hpr}</p>
          <p>SPR: {totalStatus.spr}</p>
          <p>EXP: {totalStatus.exp}</p>
          <p>PET: {totalStatus.pet}</p>
          <p>MOV: {totalStatus.mov}</p>
          <p>DRN: {totalStatus.drn}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusComponent;
