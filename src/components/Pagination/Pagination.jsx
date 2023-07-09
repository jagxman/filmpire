import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from "./styles";
import { useTheme } from "@mui/styles";

function Pagination( {currentPage, setPage, totalPage }) {
    const classes = useStyles();
    const theme = useTheme();

    if (totalPage === 0) return null;


    const handlePrev = () => {

        if (currentPage != 1){

            setPage((prevPage) => prevPage -1);
        }

    }

    const handleNext = () => {

        if (currentPage != totalPage){

            setPage((prevPage) => prevPage + 1);
        }
       

    }



  return (
    <div className={classes.container}>
        <Button className={classes.button} onClick={handlePrev} variant='contained' type="button" color="primary">Prev</Button>
        <Typography variant='h4' className={classes.pageNumber}>{currentPage}</Typography>
        <Button className={classes.button} onClick={handleNext} variant='contained' type="button" color="primary">Next</Button>
    </div>
  )
}

export default Pagination
