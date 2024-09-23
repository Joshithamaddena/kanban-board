import React from 'react'
import "./Ticket.css"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccountCircleIcon from './user-circle-svgrepo-com.svg';
import urgentPriorityGrey from './SVG - Urgent Priority grey.svg';
import todoIcon from './To-do.svg';
import inProgressIcon from './in-progress.svg';
import doneIcon from './Done.svg';
import cancelledIcon from './Cancelled.svg';
import highPriorityIcon from './img-high-priority.svg';
import mediumPriorityIcon from './img - medium-priority.svg';
import lowPriorityIcon from './img - low-priority.svg';
import noPriorityIcon from './No-priority.svg';
import backlogIcon from './Backlog.svg';
function Ticket({ ticket, grouping }) {
    return (
      <div className='ticket-main'>
        <div className='ticket-header'>
          <div className='ticket-id'>{ticket.id}</div>
          {(grouping !== 'User') && (
            <img src={AccountCircleIcon} alt="account circle icon" />
          )}
        </div>
        <div className='ticket-content'>
          <div className='ticket-content-title'>
            {(grouping !== 'Status') && (
              <div>
                {ticket.status === 'Todo' ? (
                  <img src={todoIcon} alt="todo icon" />
                ) : ticket.status === 'In progress' ? (
                  <img src={inProgressIcon} alt="in progress icon" />
                ) : ticket.status === 'Done' ? (
                  <img src={doneIcon} alt="done icon" />
                ) : ticket.status === 'Canceled' ? (
                  <img src={cancelledIcon} alt="cancelled icon" />
                ) : ticket.status === 'Backlog' ? (
                  <img src={backlogIcon} alt="backlog icon" />
                ) : null}
              </div>
            )}
            <div className='ticket-title'><b>{ticket.title}</b></div>
          </div>
        </div>
        <div className='ticket-metadata'>
          <div className='ticket-tags'>
            {(grouping !== 'Priority') && (
              <div>
                {ticket.priority === 0 && (
                  <div className="ticket-tag">
                    <img src={noPriorityIcon} alt="no priority icon" />
                  </div>
                )}
                {ticket.priority === 1 && (
                  <div className="ticket-tag">
                    <img src={lowPriorityIcon} alt="low priority icon" />
                  </div>
                )}
                {ticket.priority === 2 && (
                  <div className="ticket-tag">
                    <img src={mediumPriorityIcon} alt="medium priority icon" />
                  </div>
                )}
                {ticket.priority === 3 && (
                  <div className="ticket-tag">
                    <img src={highPriorityIcon} alt="high priority icon" />
                  </div>
                )}
                {ticket.priority === 4 && (
                  <div className="ticket-tag">
                    <img src={urgentPriorityGrey} alt="urgent priority icon" />
                  </div>
                )}
              </div>
            )}
            {ticket.tag.map((tag, key) => (
              <div key={key} className='ticket-tag'>
                <FiberManualRecordIcon color="disabled" sx={{ fontSize: "12px" }} />
                <div>{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Ticket;
