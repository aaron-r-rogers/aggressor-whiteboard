import { useState } from "react";
import styles from  "./TransponderTable.module.css";

type TransponderTableRow = {
    signal: string;
    target: string;
    centerRxIF: string;
    bw: string;
    chanPwr: string;
    modType: string;
    fecRate: string;
    dataRate: string;
    centerRxRF: string;
};

const TransponderTable: React.FC = () => {
    const [rows, setRows] = useState<TransponderTableRow[]>([]);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleInputChange = (
        index: number,
        field: keyof TransponderTableRow,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        const updatedRows = [...rows];
        const updatedRow = { ...updatedRows[index] };
        updatedRow[field] = value;
        updatedRows[index] = updatedRow;
        setRows(updatedRows);
    };

    const sortRows = (column: keyof TransponderTableRow) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }

        setRows(rows.slice().sort((a, b) => {
            if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
            if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        }));
    };

    const addRow = (): void => {
        const newRow: TransponderTableRow = {
            signal: "",
            target: "",
            centerRxIF: "",
            bw: "",
            chanPwr: "",
            modType: "",
            fecRate: "",
            dataRate: "",
            centerRxRF: "",
        };
        setRows([...rows, newRow]);
    };

    const removeRow = (): void => {
        if (rows.length > 0) {
            setRows(rows.slice(0, -1));
        }
    };

    return (
        <div className={styles.whiteboard}>
            <table className={styles.transponderTable}>
                <thead>
                    <tr>
                        <th colSpan={9} className={styles.tableTitle}>
                            Transponder Environment
                        </th>
                    </tr>
                    <tr>
                        <th
                            className={`${styles.cellSmall} ${styles.sortableHeader}`}
                            onClick={() => sortRows("signal")}
                        >
                            Signal
                            {sortColumn === "signal" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellSmall} ${styles.sortableHeader}`}
                            onClick={() => sortRows("target")}
                        >
                            Target
                            {sortColumn === "target" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellLarge} ${styles.sortableHeader}`}
                            onClick={() => sortRows("centerRxIF")}
                        >
                            Center Rx IF
                            {sortColumn === "centerRxIF" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellMedium} ${styles.sortableHeader}`}
                            onClick={() => sortRows("bw")}
                        >
                            BW
                            {sortColumn === "bw" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellSmall} ${styles.sortableHeader}`}
                            onClick={() => sortRows("chanPwr")}
                        >
                            Chan Pwr
                            {sortColumn === "chanPwr" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellMedium} ${styles.sortableHeader}`}
                            onClick={() => sortRows("modType")}
                        >
                            Modulation Type
                            {sortColumn === "modType" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellMedium} ${styles.sortableHeader}`}
                            onClick={() => sortRows("fecRate")}
                        >
                            FEC Rate
                            {sortColumn === "fecRate" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellMedium} ${styles.sortableHeader}`}
                            onClick={() => sortRows("dataRate")}
                        >
                            Data Rate
                            {sortColumn === "dataRate" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                        <th
                            className={`${styles.cellLarge} ${styles.sortableHeader}`}
                            onClick={() => sortRows("centerRxRF")}
                        >
                            Center Rx RF
                            {sortColumn === "centerRxRF" && (
                                <span
                                    className={`${styles.sortingArrow} ${
                                        sortDirection === "asc" ? styles.arrowUp : styles.arrowDown
                                    }`}
                                ></span>
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className={styles.cellSmall}>
                                <input
                                    type="text"
                                    value={row.signal}
                                    onChange={(e) => handleInputChange(index, "signal", e)}
                                />
                            </td>
                            <td className={styles.cellSmall}>
                                <input
                                    type="text"
                                    value={row.target}
                                    onChange={(e) => handleInputChange(index, "target", e)}
                                />
                            </td>
                            <td className={styles.cellLarge}>
                                <input
                                    type="text"
                                    value={row.centerRxIF}
                                    onChange={(e) => handleInputChange(index, "centerRxIF", e)}
                                />
                            </td>
                            <td className={styles.cellMedium}>
                                <input
                                    type="text"
                                    value={row.bw}
                                    onChange={(e) => handleInputChange(index, "bw", e)}
                            />
                            </td>
                            <td className={styles.cellSmall}>
                                <input
                                    type="text"
                                    value={row.chanPwr}
                                    onChange={(e) => handleInputChange(index, "chanPwr", e)}
                            />
                            </td>
                            <td className={styles.cellMedium}>
                                <input
                                    type="text"
                                    value={row.modType}
                                    onChange={(e) => handleInputChange(index, "modType", e)}
                                />
                            </td>
                            <td className={styles.cellMedium}>
                                <input
                                    type="text"
                                    value={row.fecRate}
                                    onChange={(e) => handleInputChange(index, "fecRate", e)}
                                />
                            </td>
                            <td className={styles.cellMedium}>
                                <input
                                    type="text"
                                    value={row.dataRate}
                                    onChange={(e) => handleInputChange(index, "dataRate", e)}
                                />
                            </td>
                            <td className={styles.cellLarge}>
                                <input
                                    type="text"
                                    value={row.centerRxRF}
                                    onChange={(e) => handleInputChange(index, "centerRxRF", e)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.buttonContainer}>
                <button onClick={addRow} className={styles.addButton}>
                    Add Row
                </button>
                <button onClick={removeRow} className={styles.removeButton}>
                    Remove Row
                </button>
            </div>
        </div>
    );
}

export default TransponderTable;
