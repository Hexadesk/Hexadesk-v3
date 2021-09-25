import React, { Component } from 'react';
import Board from '@lourenci/react-kanban';
import CardBox from './CardBox';
import CardHeader from './CardHeader';
import '@lourenci/react-kanban/dist/styles.css';

class KanbanBoard extends Component {
  render() {
    const content = this.props.board;

    return (
      <React.Fragment>
        <div className='row mb-4 w-100'>
          <div className='col'>
            <Board
              initialBoard={content}
              renderColumnHeader={({ title, columnsubtitle }) => (
                <CardHeader title={title} columnsubtitle={columnsubtitle} />
              )}
              renderCard={({ content }, { dragging }) => (
                <CardBox data={content} dragging={dragging}>
                  {content}
                </CardBox>
              )}
              onNewCardConfirm={(draftCard) => ({
                id: new Date().getTime(),
                ...draftCard,
              })}
              allowAddCard={{ on: 'bottom' }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default KanbanBoard;
