const Tasks = () => {
    const [groupId, setGroupId] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [editedName, setEditedName] = React.useState('');

    React.useEffect(() => {
        const fetchGroupID = async () => {
            try {
                const response = await fetch('/session/groupID', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setGroupId(data.groupid);
            } catch (error) {
                console.error('Error fetching groupID:', error);
            }
        };

        fetchGroupID();
    }, []);

    React.useEffect(() => {
        if (groupId !== null) {
            fetch(`/tasks/${groupId}`)
                .then((res) => res.json())
                .then((data) => setTasks(data))
                .catch((err) => console.error('Failed to fetch tasks:', err));
        }
    }, [groupId]);

    const addTask = async () => {
        if (groupId === null) return;

        try {
            const response = await fetch(`/tasks/${groupId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: 'New Task' }),
            });

            if (!response.ok) throw new Error('Failed to create task');

            const data = await response.json();
            const newTask = {
                taskid: data.taskId,
                task: 'Placeholder',
                status: 'To Do',
            };

            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleStatusChange = async (index, newStatus) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = newStatus;
        setTasks(updatedTasks);

        const taskid = updatedTasks[index].taskid;
        try {
            await fetch(`/tasks/${groupId}/${taskid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (err) {
            console.error('Failed to update task status:', err);
            updatedTasks[index].status = tasks[index].status;
            setTasks(updatedTasks);
        }
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setEditedName(task.task);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTask(null);
        setEditedName('');
    };

    const saveTaskName = async () => {
        if (!editedName.trim()) return;

        try {
            await fetch(`/tasks/${groupId}/${selectedTask.taskid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: editedName }),
            });

            setTasks((prev) =>
                prev.map((t) =>
                    t.taskid === selectedTask.taskid ? { ...t, task: editedName } : t
                )
            );

            closeModal();
        } catch (err) {
            console.error('Error saving task:', err);
        }
    };

    const deleteTask = async () => {
        try {
            await fetch(`/tasks/${groupId}/${selectedTask.taskid}`, {
                method: 'DELETE',
            });

            setTasks((prev) => prev.filter((t) => t.taskid !== selectedTask.taskid));
            closeModal();
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    return (
        <div className="tasks-module">
            <div className="tasks-wrapper">
                <table className="tasks">
                    <thead>
                        <tr>
                            <th>TASK</th>
                            <th className="status-selector">STATUS</th>
                        </tr>
                    </thead>
                    <tbody className="tasks-body">
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td onClick={() => openModal(task)} style={{ cursor: 'pointer' }}>
                                    {task.task}
                                </td>
                                <td className="status-selector">
                                    <DropdownSelect
                                        id={`select${index}`}
                                        name={`select${index}`}
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />
            <span className="material-symbols-outlined circle" onClick={addTask}>
                add_circle
            </span>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button className="modal-save-btn" onClick={saveTaskName}>Save</button>
                            <button className="modal-delete-btn" onClick={deleteTask}>
                                Delete
                            </button>
                            <button className="modal-close-btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
