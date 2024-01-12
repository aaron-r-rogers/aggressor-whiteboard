import TransponderTable from "./components/TransponderTable";
import Hounddog from "./components/Hounddog";
import SignalCalculator from "./components/SignalCalculator";
import SatelliteInfo from "./components/SatelliteInfo";

import Grid from '@mui/material/Unstable_Grid2';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid container spacing={1}>

        <Grid xs={6}>
          <SatelliteInfo />
        </Grid>

        <Grid xs={6}>
          <Grid>
            <Hounddog />
          </Grid>
          <Grid>
            <SignalCalculator />
          </Grid>
        </Grid>

      </Grid>

      <Grid xs={12}>
        <TransponderTable />
      </Grid>

    </Grid>
  )
}

export default App
