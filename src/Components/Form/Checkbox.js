import React from 'react';

// import styles
import '../../Styles/main.css';

class Checkbox extends React.Component {
    render() {
        return(
            <input
                className="checkbox"
                name={this.props.name}
                type="checkbox"
                checked={this.props.is_checked}
                onChange={event => this.props.handleInputChange(event)} 
            />
        );
    }
};

export default Checkbox;