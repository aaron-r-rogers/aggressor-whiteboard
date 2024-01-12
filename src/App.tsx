import TransponderTable from "./components/TransponderTable";
import Hounddog from "./components/Hounddog";
import SignalCalculator from "./components/SignalCalculator";
import SatelliteInfo from "./components/SatelliteInfo";

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function App() {
  return (
    <Grid container spacing={2}>
      <Box display="flex" width="100%">
        <Box width="50%" display="flex" flexDirection="column">
          <Grid xs={12}>
            <SatelliteInfo />
          </Grid>
        </Box>
        <Box width="50%" display="flex" flexDirection="column">
          <Grid xs={12}>
            <Hounddog />
          </Grid>
          <Grid xs={12}>
            <SignalCalculator />
          </Grid>
        </Box>
      </Box>

      <Grid xs={12}>
        <TransponderTable />
      </Grid>
    </Grid>
  )
}

export default App
