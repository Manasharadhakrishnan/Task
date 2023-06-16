// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { BiCalendar } from 'react-icons/bi'; // Import the calendar icon from react-icons
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { BiTime } from 'react-icons/bi';
// import { Input, TimePicker } from 'antd';
// import moment from 'moment';
// import { UserOutlined } from '@ant-design/icons';

// import './Task.css'
// function TaskCard() {
//     const [followUp, setFollowUp] = useState('');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [plan, setPlan] = useState('');
//     const [user, setUser] = useState('');
//     const [savedItems, setSavedItems] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [isTimePickerOpen, setTimePickerOpen] = useState(false);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [showTimePicker, setShowTimePicker] = useState(false);
//     const [taskCount, setTaskCount] = useState(0);
//     const [accessToken, setAccessToken] = useState('');
//     const [companyId, setCompanyId] = useState('');
//     const [userId, setUserId] = useState('');
//     const [userList, setUserList] = useState([]);
//     const [id, setId] = useState('');
//     const [selectedDate, setSelectedDate] = useState(null);
//     const datePickerRef = useRef(null);

//     const [value, setValue] = useState(null);
//     const [open, setOpen] = useState(false);

//     const handleDatePickerToggle = () => {
//         setOpen(!open);
//     };

//     const onChange = (time) => {
//         setValue(time);
//     };
//     const timeOptions = [
//         '12:00am',
//         '1:00am',
//         '2:00am',
//         // Add more options as needed...
//         '11:00pm',
//     ];

//     useEffect(() => {
//         // Call the login API to retrieve the access token, company ID, and user ID
//         login();
//     }, []);

//     useEffect(() => {
//         // Fetch the user list once the company ID is available
//         if (companyId) {
//             fetchUserList();
//         }
//     }, [companyId]);


//     useEffect(() => {
//         // Update the task count when the saved items change
//         setTaskCount(savedItems.length);
//     }, [savedItems]);
//     useEffect(() => {
//         if (companyId && accessToken) {
//             getAllTasks();
//         }
//     }, [companyId, accessToken]);


//     const login = async () => {
//         try {
//             const response = await axios.post(
//                 'https://stage.api.sloovi.com/login?product=outreach',
//                 {
//                     email: 'smithwills1989@gmail.com',
//                     password: '12345678',
//                 }
//             );

//             const { token, company_id, user_id } = response.data.results;
//             console.log(response.data.results)
//             console.log(token)
//             console.log(company_id)

//             setAccessToken(token);
//             setCompanyId(response.data.results.company_id);
//             setUserId(user_id);

//             // Fetch the user list once the login is successful
//             // fetchUserList();
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };


//     const fetchUserList = useCallback(async () => {
//         try {
//             const response = await axios.get(
//                 `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             setUserList(response.data.results.data);
//             console.log(userList)
//             console.log(response.data.results.data)
//         } catch (error) {
//             console.error('Failed to fetch user list:', error);
//         }
//     }, [accessToken, companyId]);



//     const handleFollowUpChange = (event) => {
//         setFollowUp(event.target.value);
//     };

//     // const handleDateChange = (date) => {
//     //     setSelectedDate(date);
//     // };

//     // const handleDatePickerToggle = () => {
//     //     datePickerRef.current.setOpen(true);
//     // };


//     const handleTimePickerToggle = () => {
//         setShowTimePicker(!showTimePicker);
//     };

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         setDate(date.toLocaleDateString()); // Update the date state variable
//     };

//     const handleTimeChange = (time) => {
//         setSelectedTime(time);
//         setTime(time.format('h:mm a')); // Update the time state variable
//     };




//     const handlePlanChange = (event) => {
//         setPlan(event.target.value);
//     };

//     const handleUserChange = (event) => {
//         setUser(event.target.value);
//     };

//     const handleCancel = () => {
//         setShowForm(false);
//     };


//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this task?')) {
//             try {
//                 const response = await axios.delete(
//                     `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyId}`,
//                     {
//                         headers: {
//                             'Authorization': `Bearer ${accessToken}`,
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json'
//                         }
//                     }
//                 );

//                 if (response.status === 200) {
//                     const updatedItems = savedItems.filter(item => item.id !== id);
//                     setSavedItems(updatedItems);
//                 } else {
//                     console.error('Failed to delete task:', response);
//                 }
//             } catch (error) {
//                 console.error('Failed to delete task:', error);
//             }
//         }
//     };



//     const handleEdit = async (id) => {
//         try {
//             await getTaskById(id); // Wait for the task details to be fetched
//             setId(id);
//             setShowForm(true);

//             // Fetch the task details from the API
//             const response = await axios.get(`https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//             });
//             // const task = response.data;

//             // // Extract the date and time from the task
//             // const { task_date, task_time } = task;

//             // // Set the date and time values in the state or input fields
//             // setDate(task_date);
//             // setTime(task_time);
//             const task = response.data.results;
//             setFollowUp(task.task_msg);
//             // setDate(moment(task.task_date, 'YYYY-MM-DD').toDate());
//             // setTime(moment(task.task_time, 'HH:mm:ss').toDate());
//             setPlan(task.task_title);
//             // setUser(task.assigned_user);
//             //   setId(taskId);
//             setShowForm(true);
//         } catch (error) {
//             console.log('Error fetching task:', error);
//         }
//     };

//     console.log(id)
//     const handleSave = async () => {
//         const task = {
//             assigned_user: plan,
//             task_date: date,
//             task_time: time,
//             seconds: moment.duration(time).asSeconds(),
//             is_completed: 0, // Assuming initial value is 0 (not completed)
//             time_zone: moment().utcOffset() * 60,
//             task_msg: followUp
//         };

//         const headers = {
//             'Authorization': `Bearer ${accessToken}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         };

//         try {
//             if (id) {
//                 await axios.put(
//                     `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyId}`,
//                     {
//                         assigned_user: plan,
//                         task_date: moment(date).format('YYYY-MM-DD'),
//                         task_time: moment(time).format('HH:mm:ss'),
//                         task_msg: followUp,
//                         task_title: plan,
//                     },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`,
//                             Accept: 'application/json',
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );

//                 setId('');
//             } else {
//                 await axios.post(
//                     `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
//                     {
//                         assigned_user: user, // This should be plan
//                         task_date: moment(date).format('YYYY-MM-DD'),
//                         task_time: moment(time).format('HH:mm:ss'),
//                         task_msg: followUp,
//                         task_title: plan,
//                     },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`,
//                             Accept: 'application/json',
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );
//             }

//             setShowForm(false);
//             setFollowUp('');
//             setDate(null);
//             setTime(null);
//             setPlan('');
//             setUser('');
//         } catch (error) {
//             console.error('Failed to submit task:', error);
//         }
//     };







//     const getAllTasks = async () => {
//         try {
//             const response = await axios.get(
//                 `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 const tasks = response.data.results;
//                 setSavedItems(tasks);
//             } else {
//                 console.error('Failed to fetch tasks:', response);
//             }
//         } catch (error) {
//             console.error('Failed to fetch tasks:', error);
//         }
//     };
//     const getTaskById = async (taskId) => {
//         try {
//             const response = await axios.get(
//                 `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${accessToken}`,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 const task = response.data.results;
//                 setFollowUp(task.task_msg);
//                 setDate(task.task_date);
//                 setTime(formatTime(task.task_time));
//                 setPlan(task.assigned_user);
//                 setId(task.id);
//             } else {
//                 console.error('Failed to fetch task:', response);
//             }
//         } catch (error) {
//             console.error('Failed to fetch task:', error);
//         }
//     };
//     const formatTime = (seconds) => {
//         const hours = Math.floor(seconds / 3600);
//         const minutes = Math.floor((seconds % 3600) / 60);
//         const period = hours >= 12 ? 'PM' : 'AM';
//         const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
//         const formattedMinutes = padZero(minutes);
//         return `${formattedHours}:${formattedMinutes} ${period}`;
//     };

//     const padZero = (value) => {
//         return value.toString().padStart(2, '0');
//     };


//     // const secondsToTime = (seconds) => {
//     //     const hours = Math.floor(seconds / 3600);
//     //     const minutes = Math.floor((seconds % 3600) / 60);
//     //     return `${padZero(hours)}:${padZero(minutes)}`;
//     // };

//     // const padZero = (value) => {
//     //     return value.toString().padStart(2, '0');
//     // };







//     const timeToSeconds = (time) => {
//         const [hours, minutes] = time.split(':');
//         const totalSeconds = (+hours * 3600) + (+minutes * 60);
//         return totalSeconds;
//     };
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card mt-5" style={{ maxWidth: '400px' }}>
//                         <div className="d-flex align-items-center justify-content-between border-bottom background-none">
//                             <p className="card-title ms-3 mt-2">TASKS {taskCount}</p>
//                             <div className="d-flex align-items-center">
//                                 <OverlayTrigger
//                                     placement="top"
//                                     overlay={<Tooltip id="tooltip">New Task</Tooltip>}
//                                 >
//                                     <div className="plus-icon fs-5 me-3" onClick={() => setShowForm(true)} style={{ cursor: 'pointer' }}>
//                                         +
//                                     </div>
//                                 </OverlayTrigger>
//                             </div>
//                         </div>

//                         {showForm && (
//                             <div className="card-body" style={{ backgroundColor: '#e7f0f1' }}>
//                                 <p className="card-title">Task Description</p>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         id="followUp"
//                                         className="form-control"
//                                         value={followUp}
//                                         onChange={handleFollowUpChange}
//                                         placeholder="Follow up"
//                                     />
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="mb-3 position-relative">
//                                             <label htmlFor="date" className="form-label">
//                                                 <b>Date</b>
//                                             </label>
//                                             <div>
//                                                 <Input
//                                                     onClick={handleDatePickerToggle}
//                                                     value={selectedDate ? selectedDate.toLocaleDateString() : ''}
//                                                     prefix={<BiCalendar />}
//                                                     readOnly
//                                                     style={{ height: '40px' }}
//                                                     placeholder='Select Date'
//                                                 />
//                                                 {/* <DatePicker
//                                                     ref={datePickerRef}

//                                                     selected={selectedDate}
//                                                     placeholder='Select date'
//                                                     onChange={handleDateChange}
//                                                 /> */}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-6 text-start">
//                                         <div className="mb-3">
//                                             <label htmlFor="time" className="form-label">
//                                                 <b>Time</b>
//                                             </label>
//                                             {/* <div>
//                                                 <Input
//                                                     value={selectedTime}
//                                                     prefix={<BiTime />}
//                                                     style={{ height: '40px' }}
//                                                     placeholder="Time"
//                                                 />
//                                                 {selectedTime && (
//                                                     <TimePicker
//                                                         value={moment(selectedTime, 'h:mm a')}
//                                                         format="h:mm a"
//                                                         onChange={handleTimeChange}
//                                                         onOk={handleTimeChange}
//                                                         className="mt-2"
//                                                     />
//                                                 )}
//                                             </div> */}

//                                             <div>
//                                                 <TimePicker
//                                                     value={value}
//                                                     onChange={onChange}
//                                                     format="ha"
//                                                     style={{ height: '40px' }}

//                                                     showNow={false}
//                                                     use12Hours
//                                                     placeholder="Select Time"
//                                                     suffixIcon={<BiTime className="time-icon" />}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>




//                                 <div className="mb-3">
//                                     <label htmlFor="plan" className="form-label">
//                                         Assign User
//                                     </label>
//                                     <select
//                                         id="plan"
//                                         className="form-select"
//                                         value={plan}
//                                         onChange={handlePlanChange}
//                                         placeholder="Plan user"
//                                     >
//                                         <option value="">Select User</option>
//                                         {userList.map((user) => (
//                                             <option key={user.id} value={user.id}>
//                                                 {user.name}
//                                             </option>
//                                         ))}
//                                     </select>

//                                 </div>

//                                 <div className="row">
//                                     <div className="col-2">
//                                         {/* Show the delete icon only when an id is set */}
//                                         {id && (
//                                             <div
//                                                 className="delete-icon fs-5 me-2 text-start text-secondary"
//                                                 onClick={() => handleDelete(id)}
//                                             >
//                                                 <i className="bx bx-trash"></i>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="col">
//                                         <div className="text-end">
//                                             <button
//                                                 className="btn btn-link me-2 text-decoration-none text-dark"
//                                                 onClick={handleCancel}
//                                             >
//                                                 Cancel
//                                             </button>
//                                             <button
//                                                 className="btn btn-primary text-decoration-none"
//                                                 style={{
//                                                     borderRadius: "25px",
//                                                     width: "100px",
//                                                     fontWeight: "bold",
//                                                 }}
//                                                 onClick={handleSave}
//                                             >
//                                                 Save
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <div className="card-body">
//                             {savedItems.map((item, index) => (
//                                 <div key={index} className="task-item">
//                                     <div className="row align-items-center">
//                                         <div className="col-auto">
//                                             <i className="bx bxs-user-circle" style={{ color: '#239ad4', fontSize: '35px' }}></i>
//                                         </div>
//                                         <div className="col">
//                                             <h5 className="text-right">{item.task_msg}</h5>
//                                         </div>
//                                         <div className="col-auto">
//                                             <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit this task</Tooltip>}>
//                                                 <i className="bx bx-edit-alt edit-icon me-2" style={{ fontSize: '20px' }} onClick={() => handleEdit(item.id)} title="Edit"></i>
//                                             </OverlayTrigger>
//                                             <OverlayTrigger placement="top" overlay={<Tooltip id="bell-tooltip">Snooze this task</Tooltip>}>
//                                                 <i className="bx bx-bell bell-icon edit-icon " style={{ fontSize: '20px' }} title="Bell"></i>
//                                             </OverlayTrigger>
//                                             <OverlayTrigger placement="top" overlay={<Tooltip id="tick-tooltip">Tick icon</Tooltip>}>
//                                                 <i className="bx bx-check-circle tick-icon edit-icon" style={{ fontSize: '20px' }} title="Tick"></i>
//                                             </OverlayTrigger>
//                                         </div>
//                                     </div>
//                                     <p className="ms-2">{item.task_date} at {item.task_time}</p>
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TaskCard;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './Task.css'
function TaskCard() {
    const [followUp, setFollowUp] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [plan, setPlan] = useState('');
    const [user, setUser] = useState('');
    const [savedItems, setSavedItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskCount, setTaskCount] = useState(0);
    const [accessToken, setAccessToken] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [userId, setUserId] = useState('');
    const [userList, setUserList] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        // Call the login API to retrieve the access token, company ID, and user ID
        login();
    }, []);

    useEffect(() => {
        // Fetch the user list once the company ID is available
        if (companyId) {
            fetchUserList();
        }
    }, [companyId]);


    useEffect(() => {
        // Update the task count when the saved items change
        setTaskCount(savedItems.length);
    }, [savedItems]);
    useEffect(() => {
        if (companyId && accessToken) {
            getAllTasks();
        }
    }, [companyId, accessToken]);


    const login = async () => {
        try {
            const response = await axios.post(
                'https://stage.api.sloovi.com/login?product=outreach',
                {
                    email: 'smithwills1989@gmail.com',
                    password: '12345678',
                }
            );

            const { token, company_id, user_id } = response.data.results;
            console.log(response.data.results)
            console.log(token)
            console.log(company_id)

            setAccessToken(token);
            setCompanyId(response.data.results.company_id);
            setUserId(user_id);

            // Fetch the user list once the login is successful
            // fetchUserList();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    const fetchUserList = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            setUserList(response.data.results.data);
            console.log(userList)
            console.log(response.data.results.data)
        } catch (error) {
            console.error('Failed to fetch user list:', error);
        }
    }, [accessToken, companyId]);



    const handleFollowUpChange = (event) => {
        setFollowUp(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handlePlanChange = (event) => {
        setPlan(event.target.value);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await axios.delete(
                    `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.status === 200) {
                    const updatedItems = savedItems.filter(item => item.id !== id);
                    setSavedItems(updatedItems);
                } else {
                    console.error('Failed to delete task:', response);
                }
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };



    const handleEdit = async (id) => {
        await getTaskById(id); // Wait for the task details to be fetched
        setId(id);
        setShowForm(true);
    };

    console.log(id)
    const handleSave = async () => {
        const task = {
            assigned_user: plan,
            task_date: date,
            task_time: timeToSeconds(time),
            is_completed: 0,
            time_zone: new Date().getTimezoneOffset() * 60,
            task_msg: followUp
        };

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        try {
            let response;

            if (id) {
                // Update an existing task
                response = await axios.put(
                    `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyId}`,
                    task,
                    { headers }
                );
            } else {
                // Create a new task
                response = await axios.post(
                    `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
                    task,
                    { headers }
                );
            }

            if (response.status === 200) {
                const updatedItems = [...savedItems];
                if (id) {
                    // Update existing task in the savedItems list
                    const index = savedItems.findIndex((item) => item.id === id);
                    if (index !== -1) {
                        updatedItems[index] = response.data.results;
                    }
                } else {
                    // Add new task to the savedItems list
                    updatedItems.push(response.data.results);
                }
                setSavedItems(updatedItems);
                setShowForm(false);
                setFollowUp('');
                setDate('');
                setTime('');
                setPlan('');
                setId('');
            } else {
                console.error('Failed to create/update task:', response);
            }
        } catch (error) {
            console.error('Failed to create/update task:', error);
        }
    };





    const getAllTasks = async () => {
        try {
            const response = await axios.get(
                `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                const tasks = response.data.results;
                setSavedItems(tasks);
            } else {
                console.error('Failed to fetch tasks:', response);
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };
    const getTaskById = async (taskId) => {
        try {
            const response = await axios.get(
                `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                const task = response.data.results;
                setFollowUp(task.task_msg);
                setDate(task.task_date);
                setTime(formatTime(task.task_time)); // Format the time value
                setPlan(task.assigned_user);
                setId(task.id);
            } else {
                console.error('Failed to fetch task:', response);
            }
        } catch (error) {
            console.error('Failed to fetch task:', error);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = padZero(minutes);
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    const padZero = (value) => {
        return value.toString().padStart(2, '0');
    };


    // const secondsToTime = (seconds) => {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds % 3600) / 60);
    //     return `${padZero(hours)}:${padZero(minutes)}`;
    // };

    // const padZero = (value) => {
    //     return value.toString().padStart(2, '0');
    // };







    const timeToSeconds = (time) => {
        const [hours, minutes] = time.split(':');
        const totalSeconds = (+hours * 3600) + (+minutes * 60);
        return totalSeconds;
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5" style={{ maxWidth: '400px' }}>
                        <div className="d-flex align-items-center justify-content-between border-bottom background-none">
                            <p className="card-title ms-3 mt-2">Tasks {taskCount}</p>
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip">New Task</Tooltip>}
                                >
                                    <div className="plus-icon fs-5 me-3" onClick={() => setShowForm(true)} style={{ cursor: 'pointer' }}>
                                        +
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>

                        {showForm && (
                            <div className="card-body" style={{ backgroundColor: '#e7f0f1' }}>
                                <p className="card-title">Task Description</p>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="followUp"
                                        className="form-control"
                                        value={followUp}
                                        onChange={handleFollowUpChange}
                                        placeholder="Task description"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="date" className="form-label">
                                                <b>Date</b>
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="form-control"
                                                value={date}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="time" className="form-label">
                                                <b>Time</b>
                                            </label>
                                            <input
                                                type="time"
                                                id="time"
                                                className="form-control"
                                                value={time}
                                                onChange={handleTimeChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="plan" className="form-label">
                                        Assign User
                                    </label>
                                    <select
                                        id="plan"
                                        className="form-control"
                                        value={plan}
                                        onChange={handlePlanChange}
                                        placeholder="Plan user"
                                    >
                                        <option value="">Select User</option>
                                        {userList.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="row">
                                    <div className="col-2">
                                        {/* Show the delete icon only when an id is set */}
                                        {id && (
                                            <div
                                                className="delete-icon fs-5 me-2 text-start text-secondary"
                                                onClick={() => handleDelete(id)}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-link me-2 text-decoration-none text-dark"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-primary text-decoration-none"
                                                style={{
                                                    borderRadius: "25px",
                                                    width: "100px",
                                                    fontWeight: "bold",
                                                }}
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <div className="col">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-link me-2 text-decoration-none text-dark"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-primary text-decoration-none"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div> */}


                        {/* )} */}
                        <div className="card-body">
                            {savedItems.map((item, index) => (
                                <div key={index} className="task-item">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <i className="bx bxs-user-circle" style={{ color: '#239ad4', fontSize: '35px' }}></i>
                                        </div>
                                        <div className="col">
                                            <h5 className="text-right">{item.task_msg}</h5>
                                        </div>
                                        <div className="col-auto">
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit this task</Tooltip>}>
                                                <i className="bx bx-edit-alt edit-icon me-2" style={{ fontSize: '20px' }} onClick={() => handleEdit(item.id)} title="Edit"></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="bell-tooltip">Snooze this task</Tooltip>}>
                                                <i className="bx bx-bell bell-icon edit-icon " style={{ fontSize: '20px' }} title="Bell"></i>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip id="tick-tooltip">Mark</Tooltip>}>
                                                <i className="bx bx-check-circle tick-icon edit-icon" style={{ fontSize: '20px' }} title="Tick"></i>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    <p className="ms-2">{item.task_date} at {item.task_time}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;