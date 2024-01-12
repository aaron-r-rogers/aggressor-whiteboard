import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StyledTableRow, StyledTableCell } from './shared/StyledTable';
import { StyledSortLabel } from "./shared/StyledSortLabel";

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
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof TransponderTableRow>('signal');    

    const handleInputChange = (
        index: number,
        field: keyof TransponderTableRow,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        const updatedRows = [...rows];
        const updatedRow = { ...updatedRows[index] };
        updatedRow[field] = value;
        updatedRows[index] = updatedRow;
        setRows(updatedRows);
    };

    const handleRequestSort = (property: keyof TransponderTableRow) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: 'asc' | 'desc',
        orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
        return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function sortArray<T>(array: T[], comparator: (a: T, b: T) => number) {
        return array.slice().sort(comparator);
    }

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
        <TableContainer component={Paper} elevation={3} sx={{ margin: 3, width: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="Transponder Table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell colSpan={9} className="center">
                            <Typography variant="h4">
                                Transponder Environment
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell sortDirection={orderBy === 'signal' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'signal'}
                                direction={orderBy === 'signal' ? order : 'asc'}
                                onClick={() => handleRequestSort('signal')}
                            >
                                Signal
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'target' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'target'}
                                direction={orderBy === 'target' ? order : 'asc'}
                                onClick={() => handleRequestSort('target')}
                            >
                                Target
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'centerRxIF' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'centerRxIF'}
                                direction={orderBy === 'centerRxIF' ? order : 'asc'}
                                onClick={() => handleRequestSort('centerRxIF')}
                            >
                                Center Rx IF
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'bw' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'bw'}
                                direction={orderBy === 'bw' ? order : 'asc'}
                                onClick={() => handleRequestSort('bw')}
                            >
                                BW
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'chanPwr' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'chanPwr'}
                                direction={orderBy === 'chanPwr' ? order : 'asc'}
                                onClick={() => handleRequestSort('chanPwr')}
                            >
                                Chan Pwr
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'modType' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'modType'}
                                direction={orderBy === 'modType' ? order : 'asc'}
                                onClick={() => handleRequestSort('modType')}
                            >
                                Modulation Type
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'fecRate' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'fecRate'}
                                direction={orderBy === 'fecRate' ? order : 'asc'}
                                onClick={() => handleRequestSort('fecRate')}
                            >
                                FEC Rate
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'dataRate' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'dataRate'}
                                direction={orderBy === 'dataRate' ? order : 'asc'}
                                onClick={() => handleRequestSort('dataRate')}
                            >
                                Data Rate
                            </StyledSortLabel>
                        </StyledTableCell>
                        <StyledTableCell sortDirection={orderBy === 'centerRxRF' ? order : false}>
                            <StyledSortLabel
                                active={orderBy === 'centerRxRF'}
                                direction={orderBy === 'centerRxRF' ? order : 'asc'}
                                onClick={() => handleRequestSort('centerRxRF')}
                            >
                                Center Rx RF
                            </StyledSortLabel>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {sortArray(rows, getComparator(order, orderBy)).map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.signal}
                                    onChange={(e) => handleInputChange(index, "signal", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.target}
                                    onChange={(e) => handleInputChange(index, "target", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.centerRxIF}
                                    onChange={(e) => handleInputChange(index, "centerRxIF", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.bw}
                                    onChange={(e) => handleInputChange(index, "bw", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.chanPwr}
                                    onChange={(e) => handleInputChange(index, "chanPwr", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.modType}
                                    onChange={(e) => handleInputChange(index, "modType", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.fecRate}
                                    onChange={(e) => handleInputChange(index, "fecRate", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.dataRate}
                                    onChange={(e) => handleInputChange(index, "dataRate", e)}
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <TextField
                                    type="text"
                                    value={row.centerRxRF}
                                    onChange={(e) => handleInputChange(index, "centerRxRF", e)}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Stack direction="row" spacing={2} sx={{ margin: 3 }}>
                <Button variant="contained" color="success" onClick={addRow}>
                    Add Row
                </Button>
                <Button variant="outlined" color="error" onClick={removeRow}>
                    Remove Row
                </Button>
            </Stack>
        </TableContainer>
    );
}

export default TransponderTable;
