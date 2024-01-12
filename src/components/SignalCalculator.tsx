import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const SignalCalculator: React.FC = () => {

    const [dr, setDr] = useState<string>('');
    const [fec, setFec] = useState<string>('');
    const [bs, setBs] = useState<string>('');
    const [bw, setBw] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handlers for input changes
    const handleDrChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDr(value);
        if (value === '' || isNaN(Number(value))) {
            setErrorMessage('Invalid DR value');
        } else {
            setErrorMessage('');
        }
    };

    const handleFecChange = (e: ChangeEvent<HTMLInputElement>) => setFec(e.target.value);
    const handleBsChange = (e: ChangeEvent<HTMLInputElement>) => setBs(e.target.value);
    const handleBwChange = (e: ChangeEvent<HTMLInputElement>) => setBw(e.target.value);

    const calculateBandwidth = () => {
        try {
            let fecRatio: number;
            if (fec.includes('/')) {
                const [numerator, denominator] = fec.split('/').map(Number);
                if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
                    throw new Error('Invalid FEC Ratio');
                }
                fecRatio = numerator / denominator;
            } else {
                fecRatio = parseFloat(fec);
                if (isNaN(fecRatio)) {
                    throw new Error('Invalid FEC Value');
                }
            }

            const drValue = parseFloat(dr);
            const bsValue = parseFloat(bs);
            const bwValue = parseFloat(bw);

            // Validation
            const inputsFilled = [dr, fec, bs, bw].filter(val => val !== '').length;
            if (inputsFilled !== 3) {
                throw new Error('Please fill in exactly three values.');
            }

            // Calculate the missing value
            if (bw === '') {
                // Calculation for BW
                const bwCalc = (drValue / bsValue) / fecRatio + '';
                setBw(bwCalc);
            } else if (dr === '') {
                // Calculation for DR
                const drCalc = (bwValue * bsValue) * fecRatio + '';
                setDr(drCalc);
            } else if (fec === '') {
                // Calculation for FEC
                const fecCalc = (drValue / bwValue) / bsValue + '';
                setFec(fecCalc);
            } else if (bs === '') {
                // Calculation for b/s
                const bsCalc = (drValue / bwValue) / fecRatio + '';
                setBs(bsCalc);
            }

            setErrorMessage('');
        } catch (error: any) {
            setErrorMessage(error.message ? error.message : 'Invalid Input');
        }
    };


    const resetFields = () => {
        setDr('');
        setFec('');
        setBs('');
        setBw('');
        setErrorMessage('');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            label="DR (kbps)"
                            variant="outlined"
                            value={dr}
                            onChange={handleDrChange}
                            placeholder="Data Rate"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            label="FEC"
                            variant="outlined"
                            value={fec}
                            onChange={handleFecChange}
                            placeholder="Forward error correction"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            label="b/s"
                            variant="outlined"
                            value={bs}
                            onChange={handleBsChange}
                            placeholder="Bits per symbol"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="number"
                            label="BW (kHz)"
                            variant="outlined"
                            value={bw}
                            onChange={handleBwChange}
                            placeholder="Bandwidth"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={calculateBandwidth}
                            fullWidth
                        >
                            Calculate
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            onClick={resetFields}
                            fullWidth
                        >
                            Reset
                        </Button>
                    </Grid>
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Typography color="error">{errorMessage}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Box>
    );
};

export default SignalCalculator;