import { useState, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { StyledTableRow, StyledTableCell } from "./shared/StyledTable";

interface StepsData {
    [step: string]: boolean | { z: string, l: string};
}

const CheckListTable: React.FC = () => {
    const steps = [
        'Acquire Satellite',
        'Blue Access',
        'Characterize Environment',
        'Plan Task & Resources',
        'Configure for Task',
        'Verify Task'
    ];

    const [checkedState, setCheckedState] = useState<StepsData>({
        ...steps.reduce((acc, step) => {
            acc[step] = false;
            return acc;
        }, {} as StepsData),
        'ASPEN': { z: '', l: '' }
    });

    const handleCheckChange = (step: string, checked: boolean) => {
        setCheckedState(prevState => ({ ...prevState, [step]: checked }));
    };

    const handleTextChange = (field: 'z' | 'l', value: string) => {
        setCheckedState(prevState => ({
            ...prevState,
            'ASPEN': {
                ...((prevState['ASPEN'] as { z: string, l: string }) || { z: '', l: '' }),
                [field]: value
            }
        }));
    };

    return (
        <TableContainer component={Paper} elevation={3} sx={{ margin: 3, width: 'auto' }}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell colSpan={2} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            <Typography variant="h4">
                                Steps to Hounddog
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {steps.map((step) => (
                        <StyledTableRow key={step}>
                            <StyledTableCell style={{ width: '65%' }}>
                                <Typography variant="h6">
                                    {step}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell style={{ width: '35%', textAlign: 'center' }}>
                                <Checkbox
                                    checked={Boolean(checkedState[step])}
                                    onChange={(e) => handleCheckChange(step, e.target.checked)}
                                    color="primary"
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow>
                        <StyledTableCell style={{ width: '65%' }}>
                            <Typography variant="h5">
                                ASPEN
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '35%', textAlign: 'center' }}>
                        <TextField
                            label="Z"
                            value={(checkedState['ASPEN'] as { z: string; l: string }).z}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('z', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="L"
                            value={(checkedState['ASPEN'] as { z: string; l: string }).l}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('l', e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CheckListTable;