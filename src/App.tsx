import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Admin from './components/Admin/Admin';
function App() {
  const [admin, setAdmin] = useState<boolean>(true)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin(!admin);
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>

          <></>
        </Grid>
        <Grid item xs={1}>User</Grid>
        <Grid item xs={3}>
          
          <Switch
            checked={admin}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled ' }}
          />
          
        </Grid>
        <Grid item xs={1}>Admin</Grid>
        <Grid item xs={12}>
          {/* <Item>xs=4</Item> */}
          {admin?<Admin/>:<></>}
        </Grid>
        <Grid item xs={8}>
          {/* <Item>xs=8</Item> */}
        </Grid>
      </Grid>
    </>
  )
}

export default App
