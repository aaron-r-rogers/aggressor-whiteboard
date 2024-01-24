import TransponderTable from "./components/TransponderTable";
import Hounddog from "./components/Hounddog";
import SignalCalculator from "./components/SignalCalculator";
import SatelliteInfo from "./components/SatelliteInfo";
import AttackTable from "./components/AttackPlan";
import CDACalculator from "./components/CDACalculator";

import Grid from '@mui/material/Grid';

function App() {
  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <SatelliteInfo />
            <CDACalculator />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Hounddog />
            <SignalCalculator />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TransponderTable />
      </Grid>

      <Grid item xs={12}>
        <AttackTable />
      </Grid>

    </Grid>
  )
}

export default App
