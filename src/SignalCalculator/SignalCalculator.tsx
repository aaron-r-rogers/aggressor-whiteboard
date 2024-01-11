import { useState } from "react";
import styles from './SignalCalculator.module.css';

const SignalCalculator: React.FC = () => {

    const [dr, setDr] = useState<string>('');
    const [fec, setFec] = useState<string>('');
    const [bs, setBs] = useState<string>('');
    const [bw, setBw] = useState<string>('');
    const [isCalculatorVisible, setIsCalculatorVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handlers for input changes
    const handleDrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDr(value);
        if (value === '' || isNaN(Number(value))) {
            setErrorMessage('Invalid DR value');
        } else {
            setErrorMessage('');
        }
    };

    const handleFecChange = (e: React.ChangeEvent<HTMLInputElement>) => setFec(e.target.value);
    const handleBsChange = (e: React.ChangeEvent<HTMLInputElement>) => setBs(e.target.value);
    const handleBwChange = (e: React.ChangeEvent<HTMLInputElement>) => setBw(e.target.value);

    const toggleCalculator = () => {
        setIsCalculatorVisible(!isCalculatorVisible);
        resetFields();
    };

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
        <div className={styles.bandwidthCalculator}>
            <button 
                className={styles.toggleCalculatorButton}
                onClick={toggleCalculator}>
                    {isCalculatorVisible ? 'Hide Calculator' : 'Show Calculator'}
            </button>
            {isCalculatorVisible && (
                <div>
                    <div>
                        <label>DR (kbps):</label>
                        <input type="number" value={dr} onChange={handleDrChange} placeholder="Data Rate" />
                    </div>
                    <div>
                        <label>FEC:</label>
                        <input type="text" value={fec} onChange={handleFecChange} placeholder="Forward error correction" />
                    </div>
                    <div>
                        <label>b/s:</label>
                        <input type="number" value={bs} onChange={handleBsChange} placeholder="Bits per symbol" />
                    </div>
                    <div>
                        <label>BW (MHz):</label>
                        <input type="number" value={bw} onChange={handleBwChange} placeholder="Bandwidth" />
                    </div>

                    <button 
                        className={styles.calculateButton}
                        onClick={calculateBandwidth}>
                            Calculate
                    </button>
                    <button
                        className={styles.resetButton}
                        onClick={resetFields}>
                            Reset
                    </button>

                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                </div>
            )}
        </div>
    );
};

export default SignalCalculator;