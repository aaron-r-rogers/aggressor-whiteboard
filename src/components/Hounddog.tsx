import React, { useState, ChangeEvent } from "react";
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
    [step: string]: boolean | { z: string, l: string, checked: boolean };
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
        'ASPEN': { z: '', l: '', checked: false }
    });

    const handleCheckChange = (step: string, checked: boolean) => {
        setCheckedState(prevState => {
            if (step !== 'ASPEN') {
                return { ...prevState, [step]: checked };
            }
    
            return {
                ...prevState,
                'ASPEN': {
                    ...((prevState['ASPEN'] as { z: string, l: string }) || { z: '', l: '' }),
                    checked: checked
                }
            };
        });
    };

    const handleTextChange = (field: 'z' | 'l', value: string) => {
        setCheckedState(prevState => ({
            ...prevState,
            'ASPEN': {
                ...((prevState['ASPEN'] as { z: string, l: string, checked: boolean }) || { z: '', l: '', checked: false }),
                [field]: value
            }
        }));
    };

    return (
        <TableContainer component={Paper} elevation={12} sx={{ margin: 2, width: 'auto' }}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell colSpan={3} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            <Typography variant="h4">
                                Steps to Hounddog
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {steps.map((step) => (
                        <StyledTableRow key={step}>
                            <StyledTableCell style={{ width: '40%' }}>
                                <Typography variant="subtitle1">
                                    {step}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell style={{ width: '40%' }}>
                            </StyledTableCell>
                            <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>
                                <Checkbox
                                    checked={Boolean(checkedState[step])}
                                    onChange={(e) => handleCheckChange(step, e.target.checked)}
                                    color="primary"
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow>
                        <StyledTableCell style={{ width: '10%' }}>
                            <Typography variant="h6">
                                ASPEN
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <TextField
                                    key={`z-${Boolean(checkedState['ASPEN'])}`}
                                    label="Z"
                                    variant="outlined"
                                    value={(checkedState['ASPEN'] as { z: string; l: string }).z}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('z', e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                <TextField
                                    key={`l-${Boolean(checkedState['ASPEN'])}`}
                                    label="L"
                                    variant="outlined"
                                    value={(checkedState['ASPEN'] as { z: string; l: string }).l}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('l', e.target.value)}
                                />
                            </div>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: '20%', textAlign: 'center' }}>
                        <Checkbox
                            checked={Boolean((checkedState['ASPEN'] as { checked: boolean }).checked)}
                            onChange={(e) => handleCheckChange('ASPEN', e.target.checked)}
                            color="primary"
                        />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CheckListTable;