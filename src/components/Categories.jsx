import React from 'react';
import Grid from '@material-ui/core/Grid'

function Categories(props) {
    return (
        <Grid container spacing={1} className="categories">
            <Grid item xs={12} className="header">
                <p className="label">Categories</p>
            </Grid>
            <Grid item xs={12} className="container">
                <div className="left-space"></div>
                <div className="category">
                    <img className="image" src="./groceries.png" alt="" />
                    <p className="label">Groceries</p>
                </div>
                <div className="category">
                    <img className="image" src="./cosmetics.png" alt="" />
                    <p className="label">Cosmatics</p>
                </div>
                <div className="category">
                    <img className="image" src="./groceries.png" alt="" />
                    <p className="label">Groceries</p>
                </div>
                <div className="category">
                    <img className="image" src="./cosmetics.png" alt="" />
                    <p className="label">Cosmatics</p>
                </div>
                <div className="category">
                    <img className="image" src="./groceries.png" alt="" />
                    <p className="label">Groceries</p>
                </div>
                <div className="category">
                    <img className="image" src="./cosmetics.png" alt="" />
                    <p className="label">Cosmatics</p>
                </div>
            </Grid>
        </Grid>
    );
}

export default Categories;