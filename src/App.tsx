import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Admin from './components/Admin/Admin';
function App() {
  const [admin, setAdmin] = useState<boolean>(true)
  const handleChange = () => {
    setAdmin(!admin);
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>

          <></>
        </Grid>
        <Grid item xs={1} style={{paddingTop:'5px',paddingLeft:0,paddingRight:0,paddingBottom:0}}>User</Grid>
        <Grid item xs={3}style={{padding:'0px',maxWidth:'50px'}}>
          
          <Switch
            checked={admin}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled ' }}
            sx={{maxWidth:'100px'}}
          />
          
        </Grid>
        <Grid item xs={1} style={{paddingTop:'5px',paddingLeft:0,paddingRight:0,paddingBottom:0}}>Admin</Grid>
        <Grid item xs={12}>
          {/* <Item>xs=4</Item> */}
          {admin?<Admin user={"Admin"}/>:<Admin user={"general"}/>}
        </Grid>
        <Grid item xs={8}>
          {/* <Item>xs=8</Item> */}
        </Grid>
      </Grid>
    </>
  )
}

export default App
