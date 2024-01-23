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

type AttackTableRow = {
    task: string;
    centerTxIF: string;
    ttp: string;
    dataRate: string;
    fecRate: string;
    modType: string;
    bandwidth: string;
    tXequip: string;
    effect: string;
    rXequip: string;
    dodger: string;
    centerRxIF: string;
    reaction: string;
};

const columns: { id: keyof AttackTableRow, label: string }[] = [
    { id: 'task', label: 'Task' },
    { id: 'centerTxIF', label: 'Center Tx IF' },
    { id: 'ttp', label: 'TTP' },
    { id: 'dataRate', label: 'Data Rate' },
    { id: 'fecRate', label: 'FEC Rate' },
    { id: 'modType', label: 'Mod Type' },
    { id: 'bandwidth', label: 'Bandwidth' },
    { id: 'tXequip', label: 'Tx Equip' },
    { id: 'effect', label: 'Effect' },
    { id: 'rXequip', label: 'Rx Equip' },
    { id: 'dodger', label: 'Dodger' },
    { id: 'centerRxIF', label: 'Center Rx IF' },
    { id: 'reaction', label: 'Reaction' },
];

const TableCellWithInput = ({ row, index, field, handleInputChange }: { row: AttackTableRow, index: number, field: keyof AttackTableRow, handleInputChange: Function }) => {
    const isMultiline = field === 'ttp';

    return (
        <StyledTableCell>
            <TextField
                type="text"
                value={row[field]}
                onChange={(e) => handleInputChange(index, field, e)}
                multiline={isMultiline}
            />
        </StyledTableCell>
    );
};


const AttackTable: React.FC = () => {
    const [tableState, setTableState] = useState({
        rows: [] as AttackTableRow[],
        order: 'asc' as 'asc' | 'desc',
        orderBy: 'signal' as keyof AttackTableRow,
    });

    const handleInputChange = (
        index: number,
        field: keyof AttackTableRow,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // Functional update for better performance and simplicity
        setTableState((prev) => {
            const updatedRows = [...prev.rows];
            updatedRows[index] = { ...updatedRows[index], [field]: event.target.value };
            return { ...prev, rows: updatedRows };
        });
    };

    const handleRequestSort = (property: keyof AttackTableRow) => {
        setTableState(prev => {
            const isAsc = prev.orderBy === property && prev.order === 'asc';
            return {
                ...prev,
                order: isAsc ? 'desc' : 'asc',
                orderBy: property
            };
        });
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
        setTableState((prev) => ({
            ...prev,
            rows: [...prev.rows, {
                task: '',
                centerTxIF: '',
                ttp: '',
                dataRate: '',
                fecRate: '',
                modType: '',
                bandwidth: '',
                tXequip: '',
                effect: '',
                rXequip: '',
                dodger: '',
                centerRxIF: '',
                reaction: ''
            }]
        }));
    };

    const removeRow = (): void => {
        setTableState((prev) => ({
            ...prev,
            rows: prev.rows.slice(0, -1)
        }));
    };

    return (
        <TableContainer component={Paper} elevation={12} sx={{ margin: 2, width: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="EMI Plan">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell colSpan={13} className="center">
                            <Typography variant="h4">
                                EMI Plan
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        {columns.map(column => (
                            <StyledTableCell
                                key={column.id}
                                sortDirection={tableState.orderBy === column.id ? tableState.order : false}
                            >
                                <StyledSortLabel
                                    active={tableState.orderBy === column.id}
                                    direction={tableState.orderBy === column.id ? tableState.order : 'asc'}
                                    onClick={() => handleRequestSort(column.id)}
                                >
                                    {column.label}
                                </StyledSortLabel>
                            </StyledTableCell>
                        ))}
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                {sortArray(tableState.rows, getComparator(tableState.order, tableState.orderBy)).map((row, index) => (
                    <StyledTableRow key={index}>
                        <TableCellWithInput row={row} index={index} field="task" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="centerTxIF" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="ttp" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="dataRate" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="fecRate" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="modType" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="bandwidth" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="tXequip" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="effect" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="rXequip" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="dodger" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="centerRxIF" handleInputChange={handleInputChange} />
                        <TableCellWithInput row={row} index={index} field="reaction" handleInputChange={handleInputChange} />
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

export default AttackTable;
