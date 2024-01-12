import { useState, ChangeEvent } from 'react';
import { StyledTableRow, StyledTableCell } from './shared/StyledTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface SatelliteData {
    sat: string;
    az: string;
    el: string;
    pol: string;
    xpdr: string;
    band: string;
    ttf: string;
    txCenter: string;
    rxCenter: string;
    lo: string;
    ifValue: string;
    polValue: string;
}

const SatelliteInfo: React.FC = () => {

    const [data, setData] = useState<SatelliteData>({
        sat: '',
        az: '',
        el: '',
        pol: '',
        xpdr: '',
        band: '',
        ttf: '',
        txCenter: '',
        rxCenter: '',
        lo: '',
        ifValue: '',
        polValue: ''
    });

    const handleInputChange = (field: keyof SatelliteData, value: string) => {
        setData({ ...data, [field]: value });
    };

    return (
        <TableContainer component={Paper} elevation={3} sx={{ margin: 3, width: 'auto' }}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell colSpan={6}>
                            <Typography variant="h6">
                                Satellite
                            </Typography>
                            <TextField
                                value={data.sat}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('sat', e.target.value)}
                                fullWidth
                                variant='outlined'
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderColor: 'white', // Change the border color
                                        borderWidth: '2px', // Increase border width
                                        '&:hover fieldset': {
                                            borderColor: 'primary.dark', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'secondary.main', // Border color when focused
                                        },
                                    },
                                    backgroundColor: 'background.paper', // Add background color for contrast
                                    borderRadius: '4px',
                                }}
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell colSpan={2}>
                            Az
                            <TextField
                                value={data.az}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('az', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={2}>
                            El
                            <TextField
                                value={data.el}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('el', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={2}>
                            Pol
                            <TextField
                                value={data.pol}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('pol', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={2}>
                            Xpdr
                            <TextField
                                value={data.xpdr}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('xpdr', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={2}>
                            Band
                            <TextField
                                value={data.band}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('band', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={2}>
                            TTF
                            <TextField
                                value={data.ttf}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('ttf', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={3}>
                            Tx Center
                            <TextField
                                value={data.txCenter}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('txCenter', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={3}>
                            Rx Center
                            <TextField
                                value={data.rxCenter}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('rxCenter', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={3}>
                            LO
                            <TextField
                                value={data.lo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('lo', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={3}>
                            LO
                            <TextField
                                value={data.lo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('lo', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={3}>
                            IF
                            <TextField
                                value={data.ifValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('ifValue', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={3}>
                            IF
                            <TextField
                                value={data.ifValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('ifValue', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell colSpan={3}>
                            Pol
                            <TextField
                                value={data.polValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('polValue', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                        <StyledTableCell colSpan={3}>
                            Pol
                            <TextField
                                value={data.polValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('polValue', e.target.value)}
                                fullWidth
                            />
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SatelliteInfo;
