import React from 'react';
import { connect } from 'react-redux';

import CompareHeader from '../Components/CompareHeader';
import FeaturesRow from '../Components/FeaturesRow';
import Checkbox from '../Components/Form/Checkbox';

// import styles
import '../Styles/main.css';

class Compare extends React.Component {
    state = {
        "featuresList": [],
        "compareSummary": {},
        // list of items to show, default is first item
        items_selected: [],
        show_only_difference: false,
        // set defaults for loading and error
        loading: true,
        error: false
    }

    add_product = (event) => {
        // add this item to list of showing items
        this.setState(prev => {
            return {
                items_selected: [...prev.items_selected, event.target.value]
            };
        })
    }

    remove_product = (item_to_remove) => {
        // get all shown items
        let items_selected = this.state.items_selected;
        // filter to remove that item
        items_selected = items_selected.filter(item => item !== item_to_remove);

        // set state to remove item
        this.setState({
            items_selected: items_selected
        })
    }

    show_only_difference = (event) => {
        this.props.change_show_diff(event.target.checked);
    }

    get_product_data_from_api = () => {
        fetch('http://www.mocky.io/v2/5e9ebdaa2d00007800cb7697')
        .then(response => response.json())
        .then(data => {
            if(data && data.products) {
                this.setState({
                    compareSummary: data.products.compareSummary,
                    featuresList: data.products.featuresList,
                    loading: false
                })
            } else {
                // handle error
                this.setState({
                    loading: false,
                    error: true
                })
            }
            console.log(data)
        });
    }

    componentDidMount = () => {
        this.get_product_data_from_api();
    }

    render() {
        return (
            <div>
                { this.state.loading ?
                    <div className="message_box">
                        Loading...
                    </div>
                : this.state.error || !this.state.featuresList || !this.state.compareSummary ?
                    <div className="message_box">
                        Oops! There was an error fetching data from the API.
                    </div>
                :
                    <>
                        <div className="title_div">
                            <h3>Compare</h3>
                            <p>{this.state.items_selected.length} items selected</p>
                        </div>
                        <div className="compare_table">
                        {/* first row - images and titles */}
                        <div className="row">

                            {/* first block for "shows only differnce" button */}
                                <div className="compare_header show_diff_block">
                                    <Checkbox is_checked={this.props.show_only_difference} name="show_only_differences" handleInputChange={this.show_only_difference} />
                                    <span className="show_diff_title">Show only differences</span>
                                </div>

                            {/* render all products' headers */}
                            {this.state.items_selected.map((value, index) => {
                                return (
                                    <CompareHeader key={index} index={index} value={value} remove_product={this.remove_product} items={this.state.compareSummary} item_id={value} />
                                );
                            })}

                            {/* render block for user to add new products in comparision */}
                            {/* if already 4 items are there, then can't add more in comparision (as per question) so don't show this block */}
                            { this.state.items_selected.length !== 4 ?
                                <div className="compare_header">
                                    <img src="https://via.placeholder.com/300x300.png?text=Add Product" style={{ width: '100%', height: '100%' }} />
                                    <h4 style={{ marginTop: 10 }}>Add a product</h4>
                                    {/* select tag to choose items (from api) */}
                                    <select style={{ width: '100%', height: 30, marginTop: 10 }} onChange={event => this.add_product(event)}>
                                        <option>Choose a product...</option>
                                        {this.state.compareSummary ?
                                            Object.keys(this.state.compareSummary?.titles).map((value, index) => {
                                                if (this.state.items_selected?.includes(value)) return null;
                                                return (
                                                    <option value={value}>{this.state.compareSummary?.titles[[value]]?.title}</option>
                                                );
                                            })
                                        : null}
                                    </select>
                                </div>
                                : null}
                        </div>

                        <table>
                            {/* set fixed width columns */}
                            <colgroup>
                                <col className="tabel_col" />
                                <col className="tabel_col" />
                                <col className="tabel_col" />
                                <col className="tabel_col" />
                                <col className="tabel_col" />
                            </colgroup>
                            {this.state.featuresList.map((value, key) => {
                                return(
                                    <>
                                        <tr style={{ background: "#eee" }}>
                                            <th style={{ textTransform: "uppercase" }}>{value.title}</th>
                                            {this.state.items_selected.map((value, key) => {
                                                return(<td></td>);
                                            })}
                                            {this.state.items_selected <= 4 ? <td></td> : null }
                                        </tr>
                                        <FeaturesRow show_only_difference={this.props.show_only_difference} features={value?.features} items_selected={this.state.items_selected} />
                                    </>
                                );
                            })}
                        </table>
                    </div>
                    </>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    show_only_difference: state.show_only_difference
});

const mapDispatchToProps = (dispatch) => {
    return {
      // dispatching plain actions
      change_show_diff: (value) => dispatch({ type: 'show_diff/changed', value: value })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Compare);