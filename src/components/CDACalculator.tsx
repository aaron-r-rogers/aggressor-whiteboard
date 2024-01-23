import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CDACalculator: React.FC = () => {
    const [cdaLimit, setCdaLimit] = useState<number | ''>('');
    const [antennaGain, setAntennaGain] = useState<number | ''>('');
    const [sop, setSop] = useState<string>('1');
    const [maxHpaOut, setMaxHpaOut] = useState<number | null>(null);
    const [maxHpaOutWatts, setMaxHpaOutWatts] = useState<number | null>(null);

    const resetFields = () => {
        setCdaLimit('');
        setAntennaGain('');
        setSop(1);
        setMaxHpaOut(null);
        setMaxHpaOutWatts(null);
    };

    const handleCdaLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCdaLimit(e.target.value === '' ? '' : Number(e.target.value));
    };

    const handleAntennaGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAntennaGain(e.target.value === '' ? '' : Number(e.target.value));
    };

    const handleSopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSop(e.target.value);
    };
    
    const handleSopBlur = () => {
        if (sop.trim() === '') {
            setSop('1');
        }
    };

    const calculateOutput = () => {
        const numericSop = Number(sop);
        if (cdaLimit !== '' && antennaGain !== '' && !isNaN(numericSop)) {
            const maxHpaOutValue = cdaLimit - antennaGain - numericSop;
            setMaxHpaOut(maxHpaOutValue);
            setMaxHpaOutWatts(Math.pow(10, maxHpaOutValue / 10));
        }
    };

    return (
        <Paper elevation={12} style={{ padding: '16px', margin: '32px 16px 16px' }}>
            <Typography variant="h5" gutterBottom>
                HPA Output Calculator
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="CDA Limit (dBW)"
                        type="number"
                        value={cdaLimit}
                        onChange={handleCdaLimitChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Antenna Gain (dBi)"
                        type="number"
                        value={antennaGain}
                        onChange={handleAntennaGainChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="SOP 3-3 (dB)"
                        type="number"
                        value={sop}
                        onChange={handleSopChange}
                        onBlur={handleSopBlur}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={calculateOutput} fullWidth>
                        Calculate
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={resetFields} fullWidth>
                        Reset
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" component="span">
                        Max HPA Out (dBW):
                        <Box component="span" sx={{ fontWeight: 'bold', paddingLeft: '1rem' }}>
                            {maxHpaOut !== null ? maxHpaOut.toFixed(2) : ''}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" component="span">
                        Max HPA Out (Watts): 
                        <Box component="span" sx={{ fontWeight: 'bold', color: 'red', paddingLeft: '1rem' }}>
                            {maxHpaOutWatts !== null ? maxHpaOutWatts.toFixed(2) : ''}
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CDACalculator;