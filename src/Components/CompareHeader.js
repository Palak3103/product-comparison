import React from 'react';

// import styles
import '../Styles/main.css';

class CompareHeader extends React.Component {
    render() {

        const items = this.props.items;
        const item_id = this.props.item_id;

        return(
            <div className="compare_header">
                {/* image container */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img src={items.images[[item_id]]} style={{ width: '100%', height: '100%' }} />

                    {/* show close button  */}
                    <div className="close_button" onClick={() => this.props.remove_product(item_id)}>
                        <i className="fa fa-times"></i>
                    </div>
                </div>
                
                <h4 style={{ marginTop: 10 }}>{items?.titles[[item_id]]?.title}</h4>

                {/* show subtitle if it exsists */}
                { items?.titles[[item_id]]?.subtitle ?
                    <p style={{ color: "#555", fontSize: 12 }}>{items.titles[[item_id]].subtitle}</p>
                : null }

                <p style={{ marginTop: 10 }}>
                    Rs. {items.productPricingSummary[[item_id]].finalPrice} <span style={{ fontSize: 12, textDecoration: 'line-through', color: "#777" }}>{items.productPricingSummary[[item_id]].price}</span> <span style={{ fontSize: 12, color: "#390", fontWeight: "bold" }}>{items.productPricingSummary[[item_id]].totalDiscount}% off</span>
                </p>
            </div>
        );
    }
};

export default CompareHeader;