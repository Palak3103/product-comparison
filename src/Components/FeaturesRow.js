import React from 'react';

// import styles
import '../Styles/main.css';

class FeaturesRow extends React.Component {

    state = {
        features: [],
        show_only_difference: false
    }

    which_features_to_show = () => {
        let feature_values = [];
        let show_feature = false;

        // get all features
        const features = this.props.features;
        // set default value for features to show - empty
        let features_to_show = [];

        // get items selected and if only to show different values
        const items_selected = this.props.items_selected;
        const show_only_difference = this.props.show_only_difference;

        // if only different values are selected,
        if(show_only_difference && items_selected.length > 1) {
            features.forEach(feature => {      
                // set default to don't show feature
                show_feature = false;
                feature_values = [];

                items_selected.forEach(item => {
                    // if value is not repeating, set show_feature to true
                    if(feature_values.length > 0 && !feature_values.includes(feature?.values[[item]])) {
                        show_feature = true;
                    }
                    // push the feature value to array for checking ahead
                    feature_values.push(feature?.values[[item]]);
                });

                // if have to show feature, add it to array
                if(show_feature) {
                    features_to_show.push(feature);
                }

            });
        } else {
            features_to_show = features;
        }

        // update state
        this.setState({ show_only_difference: show_only_difference, features: features_to_show });
    }

    componentDidMount = () => {
        // update feature array in state
        this.which_features_to_show();
        this.setState({
            items_selected: this.props.items_selected
        })
    }

    componentDidUpdate = () => {
        // if user has changed show different option, update state
        if((this.state.show_only_difference !== this.props.show_only_difference) || (this.state.items_selected !== this.props.items_selected)) {
            this.which_features_to_show();
            this.setState({
                items_selected: this.props.items_selected
            })
        }
    }

    render() {
        const items_selected = this.state.items_selected;

        return(
            <>
                {this.state.features.map((value, index) => {
                    // code to hide/show features based on API properties field
                    // if(show_only_difference && value?.properties && !value?.properties?.isDifferent) return null;
                    return (
                        <tr>
                            <th>{value?.featureName}</th>
                            {this.state.items_selected.map((item, index) => {
                                return(
                                    <td>
                                        {value?.values[[item]]}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </>
        );
    }
};

export default FeaturesRow;