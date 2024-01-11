import styles from "./SatelliteInfo.module.css";

const SatelliteInfo: React.FC = () => {
    return (
        <table className={styles.dataTable}>
            <thead>
                <tr>
                    <th className={styles.header}>Satellite</th>
                </tr>
                <tr>
                    <th className={styles.header}>Az</th>
                    <th className={styles.header}>El</th>
                    <th className={styles.header} colSpan={2}>Pol</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className={styles.cell}>Band</td>
                    <td className={styles.cell} colSpan={3}>XPDR</td>
                </tr>
                <tr>
                    <td className={styles.cell}>Tx Center</td>
                    <td className={styles.cell}>TTF</td>
                    <td className={styles.cell} colSpan={2}>Rx Center</td>
                </tr>
                <tr>
                    <td className={styles.cell}>LO</td>
                    <td className={styles.cell} colSpan={3}>LO</td>
                </tr>
                <tr>
                    <td className={styles.cell}>IF</td>
                    <td className={styles.cell} colSpan={3}>IF</td>
                </tr>
                <tr>
                    <td className={styles.cell}>Pol</td>
                    <td className={styles.cell} colSpan={3}>Pol</td>
                </tr>
            </tbody>
        </table>
    );
};

export default SatelliteInfo;
