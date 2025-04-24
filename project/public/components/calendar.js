
// replace this with session variables
let sessiongroupid = 0;

// modal for creating new event
function CreateEventModal({ isOpen, onClose, onSubmit, eventData }) {
    if (!isOpen) return null;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const form = document.createElement('form');
    form.id = 'create-event-form';
    form.className = 'modal';
    
    const header = document.createElement('h3');
    header.textContent = 'Create Event';
    form.appendChild(header);
    
    const createField = (labelText, inputType, inputId, wrapperClass = '') => {
        const wrapper = document.createElement('div');
        if (wrapperClass) wrapper.className = wrapperClass;
    
        const label = document.createElement('label');
        label.textContent = labelText;
    
        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
    
        label.appendChild(input);
        wrapper.appendChild(label);
        form.appendChild(wrapper);
        return input;
    };

    const titleInput = createField('Event Name: ', 'text', 'createevent-title');
    const dateInput = createField('Date: ', 'date', 'createevent-date');

    const allDayWrapper = document.createElement('div');
    allDayWrapper.className = 'modal-allday-wrapper';
    const allDayCheckbox = document.createElement('input');
    allDayCheckbox.type = 'checkbox';
    allDayCheckbox.id = 'createevent-allday';
    allDayWrapper.appendChild(allDayCheckbox);
    allDayWrapper.appendChild(document.createTextNode(' All Day?'));
    form.appendChild(allDayWrapper);

    
    const startInput = createField('Start Time: ', 'time', 'createevent-start', 'time-input');
    const endInput = createField('End Time: ', 'time', 'createevent-end', 'time-input');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'modal-save-btn';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'modal-close-btn';
    closeButton.textContent = 'Close';
    form.appendChild(closeButton);
    
    overlay.appendChild(form);
    document.body.appendChild(overlay);

    dateInput.value = eventData.date;

    allDayCheckbox.addEventListener('change', () => {
        timeContainer.style.display = allDayCheckbox.checked ? 'none' : 'block';
    });

    if (allDayCheckbox.checked) {
        form.classList.add('hide-time-inputs');
        startInput.disabled = true;
        endInput.disabled = true;
    }
    
    allDayCheckbox.addEventListener('change', () => {
        if (allDayCheckbox.checked) {
            form.classList.add('hide-time-inputs');
            startInput.disabled = true;
            endInput.disabled = true;
        } else {
            form.classList.remove('hide-time-inputs');
            startInput.disabled = false;
            endInput.disabled = false;
        }
    });
    
    form.onsubmit = async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const date = dateInput.value;
        const allDay = allDayCheckbox.checked;
        const starttime = allDay ? null : document.getElementById('createevent-start').value;
        const endtime = allDay ? null : document.getElementById('createevent-end').value;
        
        if (!title || !date) {
            alert('Event name and date are required.');
            return;
        }
        if (!allDay && (!starttime || !endtime)) {
            alert('Start and end time required for non-all-day events.');
            return;
        }
        if (!allDay && endtime <= starttime) {
            alert('End time must be after start time.');
            return;
        }
        await onSubmit({ title, date, starttime, endtime, allDay });
        document.body.removeChild(overlay);
    };

    // Close modal handler
    closeButton.onclick = () => {
        document.body.removeChild(overlay);
        onClose();
    };
}


// modal for editing existing events
function EditEventModal({ isOpen, onClose, onSubmit, onDelete, eventData }) {
    if (!isOpen || !eventData) return null;

    const container = document.createElement('div');
    container.innerHTML = `
    <div class="modal-overlay">
      <div class="modal">
        <h3>Edit Event</h3>
        <label for="editevent-name">Event Name:</label>
        <input type="text" id="editevent-name" value="${eventData.title}" />
        <label for="editevent-date">Date:</label>
        <input type="date" id="editevent-date" value="${eventData.extendedProps && eventData.extendedProps.date ? eventData.extendedProps.date : eventData.startStr.slice(0, 10)}" />
        
        <div class="modal-allday-wrapper">
          <input type="checkbox" class="modal-allday" id="editevent-allday" ${eventData.extendedProps && eventData.extendedProps.allday ? 'checked' : ''} /> 
          <label for="editevent-allday">All Day?</label>
          </div>
        
        <div id="starttime-container">
          <label for="editevent-start">Start Time:</label>
          <input type="time" id="editevent-start" value="${eventData.extendedProps.starttime ? eventData.extendedProps.starttime : eventData.startStr.slice(11, 16)}" />
        </div>
        
        <div id="endtime-container">
          <label for="editevent-end">End Time:</label>
          <input type="time" id="editevent-end" value="${eventData.extendedProps && eventData.extendedProps.endtime ? eventData.extendedProps.endtime : eventData.endStr.slice(11, 16)}" />
        </div>

        <button class="modal-save-btn" id="submit-editevent" type="submit">Save</button>
        <button class="modal-delete-btn" id="delete-editevent" type="button">Delete</button>
        <button class="modal-close-btn" id="close-edit-modal">Cancel</button>
      </div>
    </div>
  `;
    document.body.appendChild(container);

    const allDayCheckbox = document.getElementById('editevent-allday');
    const startInput = document.getElementById('editevent-start');
    const endInput = document.getElementById('editevent-end');
    const startContainer = document.getElementById('starttime-container');
    const endContainer = document.getElementById('endtime-container');

    if (allDayCheckbox.checked) {
        startContainer.style.display = 'none';
        endContainer.style.display = 'none';
        startInput.disabled = true;
        endInput.disabled = true;
    }
    allDayCheckbox.addEventListener('change', () => {
        if (allDayCheckbox.checked) {
            startContainer.style.display = 'none';
            endContainer.style.display = 'none';
            startInput.disabled = true;
            endInput.disabled = true;
        } else {
            startContainer.style.display = 'block';
            endContainer.style.display = 'block';
            startInput.disabled = false;
            endInput.disabled = false;
        }
    });

    // handle submitting edit event modal
    document.getElementById('submit-editevent').onclick = async () => {
        const title = document.getElementById('editevent-name').value.trim();
        const date = document.getElementById('editevent-date').value;
        const allDay = allDayCheckbox.checked;
        const starttime = allDay ? null : document.getElementById('editevent-start').value;
        const endtime = allDay ? null : document.getElementById('editevent-end').value;
        // make sure title and date exist
        if (!title || !date) {
            alert('Event name and date are required.');
            return;
        }
        // if all day is not checked, start time and end time are required
        if (!allDay) {
            if (!starttime || !endtime) {
                alert('Start and end time are required unless the event is all day.');
                return;
            }
            // make sure end time is after start time
            if (endtime <= starttime) {
                alert('End time must be after start time.');
                return;
            }
        }
        await onSubmit({ title, date, starttime, endtime, allDay });
        document.body.removeChild(container);
    };

    document.getElementById('delete-editevent').onclick = async () => {
        await onDelete(eventData);
        document.body.removeChild(container);
    };

    document.getElementById('close-edit-modal').onclick = () => {
        document.body.removeChild(container);
        onClose();
    };
}


// FullCalendar component
const CalendarComponent = () => {
  
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);
  const [eventData, setEventData] = React.useState(null);
  const [calendar, setCalendar] = React.useState(null);
  const [events, setEvents] = React.useState([]);
   
  const getRin = async ()=> {
      try{
         const rinRes = await fetch('/session/rin', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
         });
         let session = await rinRes.json()
            
         //should be impossible 
         if(session['sessionMissing']){
            console.error('no session var set');
         }else{
            return(session['rin'])
         }
      }catch(err){   
         console.error('Session Validation error:', err);
      }
   }

  const getGroupID = async () => {
      const test = await fetch('/session/groupID', {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      });
      let back = await test.json()
      
      return(back.groupid)
  }

  const fetchEvents = async () => {
    sessiongroupid = await getGroupID()

    try {
      const rin = await getRin()
      const profile = await fetch(`/profile/${rin}`, {
         method: 'GET',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
      });
      
      // get all events for a group
      const res = await fetch(`/calendar/${sessiongroupid}`);
      const data = await res.json();
      const formattedEvents = data
      .filter(event => !event.deleted)
      .map(event => {
        const { eventname, date, starttime, endtime, eventid, groupid, allday } = event;
        return {
          // format "all day" events and time-bound events correctly
          id: eventid,
          title: eventname,
          start: allday ? date : `${date}T${starttime}`,
          end: allday ? null : `${date}T${endtime}`, 
          allDay: allday,
          extendedProps: {
            groupid,
            eventid,
            allday,
            starttime,
            endtime,
            date
          },
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

    // run when event is created, post to db
    const handleCreateSubmit = async ({ title, date, starttime, endtime, allDay }) => {
        try {
            // add new event 
            await fetch(`/calendar/${sessiongroupid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventname: title, starttime, endtime, date, allday: allDay }),
            });
            await fetchEvents();
        } catch (err) {
            console.error('Error creating event:', err);
        }
        setCreateModalOpen(false);
    };

    // run when event is deleted, delete from db
    const handleDeleteEvent = async (eventData) => {
        try {
            const eventid = eventData.extendedProps.eventid;
            // delete individual event
            const response = await fetch(`/calendar/${sessiongroupid}/${eventid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            // console.log('Event deleted successfully');
            await fetchEvents();
            setEditModalOpen(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }

    };

    // run when event is edited, put to db
    const handleEditSubmit = async () => {
        const nameInput = document.getElementById('editevent-name');
        const dateInput = document.getElementById('editevent-date');
        const startInput = document.getElementById('editevent-start');
        const endInput = document.getElementById('editevent-end');
        const allDayCheckbox = document.getElementById('editevent-allday');

        const updatedName = nameInput.value.trim() || eventData.title;
        const updatedDate =
            dateInput.value ||
            (eventData.extendedProps && eventData.extendedProps.date) ||
            eventData.startStr.slice(0, 10);

        let updatedStart = startInput.value ||
            (eventData.extendedProps && eventData.extendedProps.starttime) ||
            eventData.startStr.slice(11, 16);

        let updatedEnd = endInput.value ||
            (eventData.extendedProps && eventData.extendedProps.endtime) ||
            eventData.endStr.slice(11, 16);

        const isAllDay = allDayCheckbox.checked;

        if (isAllDay) {
            updatedStart = null;
            updatedEnd = null;
        }

        const updateData = {
            eventname: updatedName,
            date: updatedDate,
            starttime: updatedStart,
            endtime: updatedEnd,
            allday: isAllDay,
        };

        try {
            // edit individual event
            const eventid = eventData.extendedProps.eventid;
            await fetch(`/calendar/${sessiongroupid}/${eventid}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData),
                }
            );
            await fetchEvents();
            setEditModalOpen(false);
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    //second useEffect will NOT run until fetchEvents is run, so will set group session at the beginning of fetchEvents
    React.useEffect(() => {

        fetchEvents();
        
    }, []);

    React.useEffect(() => {
      // console.log(sessiongroupid)
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;
        const newCalendar = new FullCalendar.Calendar(calendarEl, {
            contentHeight: 450,
            windowResize: function (arg) {
            },
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
            },
            selectable: true,
            editable: true,
            events,
            dateClick: function (info) {
                setEventData({ date: info.dateStr });
                setCreateModalOpen(true);
            },
            eventClick: function (info) {
                setEventData(info.event);
                setEditModalOpen(true);
            },
        });


        newCalendar.render();
        setCalendar(newCalendar);

        return () => newCalendar.destroy();

    }, [events]);

    return (
        <div>
            <div id="calendar"></div>
            {isCreateModalOpen && (
                <CreateEventModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateSubmit}
                    eventData={eventData}
                />
            )}
            {isEditModalOpen && (
                <EditEventModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                    onDelete={handleDeleteEvent}
                    eventData={eventData}
                />
            )}
        </div>
    );
};