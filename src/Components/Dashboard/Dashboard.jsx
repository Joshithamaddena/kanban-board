import React from 'react'
import {useState, useEffect} from 'react'
import "./Dashboard.css"
import List from '../List/List'
import moreHorizIcon from './3 dot menu.svg';
import addIcon from './add.svg';
import urgentPriorityIcon from './SVG - Urgent Priority colour.svg'
import highPriorityIcon from './img-high-priority.svg';
import mediumPriorityIcon from './img - medium-priority.svg';
import lowPriorityIcon from './img - low-priority.svg';
import noPriorityIcon from './No-priority.svg';
import inProgressIcon from './in-progress.svg';
import todoIcon from './To-do.svg';
import doneIcon from './Done.svg';
import cancelledIcon from './Cancelled.svg';
import accountCircleIcon from './user-circle-svgrepo-com.svg';
function Dashboard({statuses, priorities, priorityScores, grouping, ordering}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({"tickets": [],
        "users": []  
    })

    // fetch data from API
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then(response => {
          if(response.ok) {
            return response.json();
          }
          throw response
        })
        .then(response => {
          setData(response)
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
      }, [])

    // state variable to hold currently grouped and ordered lists - array of lists
    const [ticketMap, setTicketMap] = useState([])

    // comparator function to order tickets on title in lexiographic ascending order
    function cmpTitle(a, b) {
        return a.title.localeCompare(b.title);
    }

    // comparator function to order objects on priority in descending order
    function cmpPriority(a, b) {
        return b.priority - a.priority;
    }

    // group data on status and order on title
    let statusTicketMapTitle = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group data on status and order on priority
    let statusTicketMapPriority = () => {
        let obj = []
        statuses.forEach(status => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(status === ticket.status) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group data on users and order on title
    let userTicketMapTitle = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group data on users and order on priority
    let userTicketMapPriority = () => {
        let obj = []
        data['users'].forEach(user => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(user.id === ticket.userId) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group data on priority and order on title
    let priorityTicketMapTitle = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpTitle)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // group data on priority and order on priority
    let priorityTicketMapPriority = () => {
        let obj = []
        priorityScores.forEach(priority => {
            let tmp = [];
            data['tickets'].forEach(ticket => {
                if(priority === ticket.priority) tmp.push(ticket)
            })
            tmp.sort(cmpPriority)
            obj.push(tmp)
        });
        setTicketMap(obj)
    }

    // re-render data when user chooses an option in the navbar dropdown
    useEffect(() => {
        if(grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if(grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if(grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if(grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if(grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if(grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [grouping, ordering])

    // to set the initial view of dashboard on first render after the data from the API has been fetched
    useEffect(() => {
        // statusTicketMapTitle()
        if(grouping === 'Status' && ordering === 'Priority') {
            statusTicketMapPriority()
        } else if(grouping === 'Status' && ordering === 'Title') {
            statusTicketMapTitle()
        } else if(grouping === 'User' && ordering === 'Priority') {
            userTicketMapPriority()
        } else if(grouping === 'User' && ordering === 'Title') {
            userTicketMapTitle()
        } else if(grouping === 'Priority' && ordering === 'Priority') {
            priorityTicketMapPriority()
        } else if(grouping === 'Priority' && ordering === 'Title') {
            priorityTicketMapTitle()
        }
    }, [data])
    
    // to deal with async API call. while the data has not been fetched, loading is displayed
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className='dashboard-main'>
            {grouping === "Status" ? 
                ticketMap.map((ticketList, key) => {
                    return (
                    <div className='dashboard-list'>
                        <div className='dashboard-list-header-controls'>
                            <div className='dashboard-list-header-controls-info'>
                            {statuses[key] === 'Todo' && <img src={todoIcon} alt="todo icon" />}
                            {statuses[key] === 'In progress' && <img src={inProgressIcon} alt="in progress icon" />}
                            {statuses[key] === 'Done' && <img src={doneIcon} alt="done icon" />}
                            {statuses[key] === 'Canceled' &&  <img src={cancelledIcon} alt="cancelled icon" />}
                                    
                                <b><p className='dashboard-list-header'>{statuses[key]}</p></b>
                                <div className='dashboard-list-items-count'>{ticketList.length}</div>
                            </div>
                            {ticketList.length !== 0 && <div>
                                <img src={addIcon} alt="add icon" />
                                <img src={moreHorizIcon} alt="more horiz icon" />
                            </div>}
                        </div>
                        <List key={key} ticketList={ticketList} />
                    </div>
                    )
                })
            :
            grouping === 'User' ? 
                ticketMap.map((ticketList, key) => {
                    return (
                    <div className='dashboard-list'>
                        <div className='dashboard-list-header-controls'>
                            <div className='dashboard-list-header-controls-info'>
                                  <img src={accountCircleIcon} alt="account circle icon" />
                                  <b><p className='dashboard-list-header'>
                                {data['users'][key].name}</p></b>
                                <div className='dashboard-list-items-count'>{ticketList.length}</div>
                            </div>
                            {ticketList.length !== 0 && <div>
                                <img src={addIcon} alt="add icon" />
                                <img src={moreHorizIcon} alt="more horiz icon" />
                            </div>}
                        </div>
                        <List key={key} ticketList={ticketList} />
                    </div>
                    )
                })
            :
            grouping === 'Priority' ? 
    ticketMap.map((ticketList, key) => {
        let priorityIcon;
        switch (priorities[key]) {
            case 'Low':
                priorityIcon = lowPriorityIcon;
                break;
            case 'Medium':
                priorityIcon = mediumPriorityIcon;
                break;
            case 'High':
                priorityIcon = highPriorityIcon;
                break;
            case 'Urgent':
                priorityIcon = urgentPriorityIcon;
                break;
            case 'No priority':
                priorityIcon = noPriorityIcon;
                break;
            default:
                priorityIcon = null;
        }

        return (
            <div className='dashboard-list'>
                <div className='dashboard-list-header-controls'>
                    <div className='dashboard-list-header-controls-info'>
                        {priorityIcon && <img src={priorityIcon} alt={priorities[key] + ' priority icon'} />}
                        <b><p className='dashboard-list-header'>{priorities[key]}</p></b>
                        <div className='dashboard-list-items-count'>{ticketList.length}</div>
                    </div>
                    {ticketList.length !== 0 && <div>
                        <img src={addIcon} alt="add icon" />
                        <img src={moreHorizIcon} alt="more horiz icon" />
                    </div>}
                </div>
                <List key={key} ticketList={ticketList} />
            </div>
        )
    })
:
    (<span></span>)
}
</div>
)
}

export default Dashboard;
