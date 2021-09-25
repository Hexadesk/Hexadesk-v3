import React, { Component } from 'react';
import HeaderDropdown from './HeaderDropdown';

class CardHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='p-2 d-flex align-items-center'>
          <h5 className='card-title mr-3 mb-0'>{this.props.title}</h5>
          <p className='mb-0 badge badge-light p-1'>
            {this.props.columnsubtitle}
          </p>
          <HeaderDropdown />
        </div>
      </React.Fragment>
    );
  }
}

export default CardHeader;
