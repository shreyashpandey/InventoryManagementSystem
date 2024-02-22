import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { apiCalls } from "../../utils";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { getFormControlLabelUtilityClasses } from "@mui/material";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const vals = [
  {
    name: "Bluetooth",
    category: "Electronic",
    value: "$150",
    quantity: 5,
    price: "$30",
  },
  {
    name: "Edifier M43560",
    category: "Electronic",
    value: "0",
    quantity: 0,
    price: "$0",
  },
  {
    name: "Sony 4k ultra 55 inch TV",
    category: "Electronic",
    value: "$1190",
    quantity: 17,
    price: "$70",
  },
  {
    name: "Samsumg 55 inch TV",
    category: "Electronic",
    value: "$600",
    quantity: 50,
    price: "$12",
  },
  {
    name: "samsumg S34 Ultra",
    category: "phone",
    value: "$0",
    quantity: 0,
    price: "$0",
  },
];
export default function Admin() {
  interface vals {
    name: string;
    category: string;
    value: string;
    quantity: number;
    price: string;
  }
  const [rows, setRows] = useState<vals[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalVal, setModalVal] = useState<any>({});
  const [modalIndex,setModalIndex]=useState<number>(-1);
  useEffect(() => {
    console.log("hh");
    const fetchData = async () => {
      console.log("Here");
      const apiCalled = await apiCalls();
      console.log("Api Called ", apiCalled);
      setRows(apiCalled.data);
    };
    fetchData();
  }, []);
  function handleChange(index: number) {
    setModalVal({
      name: rows[index]["name"],
      category: rows[index]["category"],
      value: rows[index]["value"],
      quantity: rows[index]["quantity"],
      price: rows[index]["price"],
    });
    setModalIndex(index);
    setModal(true);
  }
  function handleModalSubmit(){
      console.log("Modal Index ",modalIndex);
      const tempRows=[...rows];
      tempRows[modalIndex]=modalVal;
      setRows(tempRows);
      setModal(false);
  }
  function handleModalChange(e:React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value);
    setModalVal({...modalVal,[e.target.id]:e.target.value})
  }
  function handleDelete(index:number)
  {
    let tempRows=rows.filter((f:any,i:number)=>i!=index);
    setRows(tempRows);
  }
  function uniqueCategory()
  {
    let set=new Set();
    rows.map((m:vals)=>set.add(m.category))
    return set.size;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ minWidth: 150 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                TotalProducts
              </Typography>
              <Typography variant="body2">
                {rows.length}
              </Typography>
            </CardContent>
          </Card>
           
        </Grid>
        <Grid item xs={3}>
        <Card sx={{ minWidth: 150 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total Store Value
              </Typography>
              <Typography variant="body2">
                {rows.reduce((acc:number,prev:any)=>acc+parseInt(prev.price.substring(1)),0)}
              </Typography>
            </CardContent>
          </Card>
           
        </Grid>
        <Grid item xs={3}>
        <Card sx={{ minWidth: 150 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Out of Stocks
              </Typography>
              <Typography variant="body2">
                {rows.filter((f:vals)=>f.quantity==0).length}
              </Typography>
            </CardContent>
          </Card>
           
        </Grid>
        <Grid item xs={3}>
        <Card sx={{ minWidth: 150 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                No of Category
              </Typography>
              <Typography variant="body2">
                {uniqueCategory()}
              </Typography>
            </CardContent>
          </Card>
           
        </Grid>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Categories</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <button onClick={() => handleChange(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <div>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Edit product
            </Typography>
            <Typography id="m1" variant="h6" component="h2">
              {modalVal.name}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="category"
                  label="Category"
                  defaultValue={modalVal.category}
                  onChange={handleModalChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}><TextField
                  required
                  id="price"
                  label="Price"
                  defaultValue={modalVal.price}
                  onChange={handleModalChange}
                /></Grid>
              <Grid item xs={6} sm={6}>
              <TextField
                  required
                  id="quantity"
                  label="Quantity"
                  defaultValue={modalVal.quantity}
                  onChange={handleModalChange}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
              <TextField
                  required
                  id="value"
                  label="Value"
                  defaultValue={modalVal.value}
                  onChange={handleModalChange}
                />
              </Grid>
              <Grid sm={8}>
                <></>
              </Grid>
              <Grid sm={4}>
                <Button onClick={handleModalSubmit}>Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}
