import React from 'react';

function ProductCategories(props) {
    const { categories, selectedCategory, onCategorySelect } = props
    return (
        <div className="product-categories">
            <div className="horizontal-scroll">
                {categories.map(category => {
                    let label = category[0].toUpperCase() + category.slice(1);
                    let isSelected = category === selectedCategory;
                    return (
                        <div
                            key={`category_${category}`}
                            className={`product-category ${isSelected ? 'selected' : ''}`}
                            onClick={() => onCategorySelect(category)}
                        >
                            {label}
                        </div>
                    )

                })}
            </div>
        </div>
    );
}

export default ProductCategories;