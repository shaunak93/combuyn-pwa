import React from 'react';
import Grid from '@material-ui/core/Grid'

function Categories(props) {
    return (
        <Grid container spacing={1} className="categories padding-l-30">
            <Grid item xs={12} className="header">
                <p className="font-16 font-bold">Categories</p>
            </Grid>
            <Grid item xs={12} className="container">
                <div className='item'>
                    <p className="font-12 font-bold padding-l-10 green">Groceries</p>
                    <img src="https://midwestcommunity.org/wp-content/uploads/2018/02/Groceries-ThinkstockPhotos-836782690.jpg" alt="" />
                </div>
                <div className='item'>
                    <p className="font-12 font-bold padding-l-10 red">Cosmatics</p>
                    <img src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                </div>
            </Grid>
        </Grid>
    );
}

export default Categories;