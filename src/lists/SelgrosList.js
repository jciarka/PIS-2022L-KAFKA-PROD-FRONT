import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SelgrosList = () => {
  const [items, setItems] = useState([]);
  let counter = 0;

  const [ean, setEan] = useState(null);
  const [purchasersCode, setPurchasersCode] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);


  const fetchItems = async () => {
    let result;
    let currDate = new Date();
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items', { params: {dateFrom, dateTo, purchasersCode, ean}});
    console.log(result.data.items);
    setItems(result.data.items)
  };


  return (
    <div className="container">
      <div
        className="card m-4 p-4 rounded rounded-lg w-100 shadow border rounded-0"
        style={{ border: "#8f8f8fb6" }}
      >
        <div className="row justify-content-center mb-2">
          <h5>Search ordered Selgros items</h5>
        </div>

        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="row d-flex justify-content-around">
            <div className="px-2 col-3">
              <TextField
                size="small"
                value={ean}
                id="outlined-basic"
                label="EAN"
                variant="outlined"
                onChange={(e) => {
                  e.target.value !== "" ? setEan(e.target.value) : setEan(null);
                }}
              />
            </div>
            <div className="px-2 col-3">
              <TextField
                size="small"
                value={purchasersCode}
                id="outlined-basic"
                label="Purchasers code"
                variant="outlined"
                onChange={(e) => {
                  e.target.value !== "" ? setPurchasersCode(e.target.value) : setPurchasersCode(null);
                }}
              />
            </div>
            <div className="px-2 col-3">
              <DatePicker
                size="small"
                clearable
                label="Date from"
                inputFormat="YYYY-MM-DD"
                value={dateFrom}
                onChange={e => e ? setDateFrom(dayjs(e).format('YYYY-MM-DDTHH:mm:ss')) : setDateFrom(null)}
                renderInput={(params) => <TextField size="small" { ...params} />}
              />
            </div>
            <div className="px-2 col-3">
              <DatePicker
                size="small"
                label="Date to"
                clearable
                inputFormat="YYYY-MM-DD"
                value={dateTo}
                onChange={e => e ? setDateTo(dayjs(e).format('YYYY-MM-DDTHH:mm:ss')) : setDateTo(null)}
                renderInput={(params) => <TextField  value={"text"} size="small" {...params} />}
              />
            </div>

            {/* <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={topic}
              label="EAN"
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            >
              {topics.map((t) => {
                return (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                );
              })}
            </Select> */}
          </div>
          </LocalizationProvider>
        </FormControl>

        <div className="row justify-content-end">
          <Button 
            size="small" 
            disableElevation={true} 
            variant="contained" 
            className="mt-2 mb-0 pb-0"
            onClick={fetchItems}
            >
              Search
            </Button>
        </div>
      </div>

      {
        items && items.length > 0 &&
        <div
          className="card m-4 p-4 rounded rounded-lg w-100 shadow border rounded-0"
          style={{ border: "#8f8f8fb6" }}
          >
        <div className="row justify-content-center mb-2">
          <h6>Filtered items list</h6>
        </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Num.</TableCell>
                <TableCell align="center">Purchaser</TableCell>
                <TableCell align="center">EAN</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Recieved at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{i + 1}.</TableCell>
                  <TableCell align="center">{row.purchasersCode}</TableCell>
                  <TableCell align="center">{row.ean}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.recievedAt && row.recievedAt.replace("T", " at ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }

    </div> 
  );
};

export default SelgrosList;
