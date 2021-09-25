import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FlagIcon from '@material-ui/icons/Flag';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import WatchLaterSharpIcon from '@material-ui/icons/WatchLaterSharp';
import { KanBadModal } from './KanbadModal';

class CardBox extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='card task-box rounded-xl small my-2'>
          {/* <Progress className="progress-sm animated-progess" value={this.props.data['progressValue']} style={{height: "3px"}}></Progress> */}
          <div className='card-body borad-width p-0'>
            <div className='p-3'>
              <div className='float-right d-flex align-items-center ml-2 text-black-50'>
                <WatchLaterSharpIcon fontSize='small' />
                <div className='small ml-2'>{this.props.data['date']}</div>
              </div>
              <div className='mb-3'>
                <Link className='text-decoration-none'>
                  {this.props.data['id']}
                </Link>
              </div>
              <div>
                <h6 className='font-size-16'>
                  <Link className='text-dark text-decoration-none'>
                    {this.props.data['title']}
                  </Link>
                </h6>
                <p className='mb-0'>{this.props.data['subtitle']}</p>
              </div>
            </div>

            <div className='d-flex border-top py-2 px-3 team mb-0 justify-content-between position-relative'>
              <KanBadModal />

              <div className='mr-3 align-self-center d-flex align-items-center'>
                <div className='text-black-50 small d-flex align-items-center'>
                  <AttachFileIcon fontSize='small' />
                  <span className='ml-1'>2</span>
                </div>
                <div className='mx-2'>
                  <FlagIcon className='text-success' />
                </div>
              </div>
              <div className='d-flex'>
                {this.props.data['team'].map((member, key) => (
                  <div className='team-member' key={key}>
                    <Link
                      className='team-member d-inline-block text-decoration-none'
                      id={'memberTooltip' + member.id}
                    >
                      {member.img === 'Null' ? (
                        <div className='avatar-xs ml-n2'>
                          <span
                            className='avatar-title bg-light border border-light d-flex justify-content-center align-items-center rounded-circle font-weight-bold'
                            style={{ height: 30, width: 30 }}
                          >
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <img
                          height={30}
                          width={30}
                          src='https://source.unsplash.com/user/erondu'
                          className='rounded-circle avatar-xs ml-n2 border border-light'
                          alt='Nazox'
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CardBox;
