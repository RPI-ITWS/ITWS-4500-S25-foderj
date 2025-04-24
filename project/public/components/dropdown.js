const DropdownSelect = ({ id, name, value, onChange }) => {
    const statusToValue = {
        "To Do": "3",
        "In Progress": "2",
        "Completed": "1"
    };

    const valueToStatus = {
        "1": "Completed",
        "2": "In Progress",
        "3": "To Do"
    };

    const statusColors = {
        "1": "var(--yellow)",
        "2": "var(--lightblue)",
        "3": ""
    };

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onChange({
            target: {
                value: valueToStatus[selectedValue]
            }
        });
    };

    return (
        <div className="select">
            <select
                name={name}
                id={id}
                value={statusToValue[value] || "3"} 
                onChange={handleChange}
                style={{ backgroundColor: statusColors[statusToValue[value]] || "" }}
            >
                <option value="3">To Do</option>
                <option value="2">In Progress</option>
                <option value="1">Completed</option>
            </select>
        </div>
    );
};