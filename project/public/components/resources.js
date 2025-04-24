const Resources = () => {
  const [resources, setResources] = React.useState([]);
  const [groupID, setGroupID] = React.useState(null);
  const [members, setMembers] = React.useState([]);
  const [newResName, setNewResName] = React.useState("");
  const [newResLink, setNewResLink] = React.useState("");
  const [classID, setClassID] = React.useState(null);
  const [workspaces, setWorkspaces] = React.useState([]);
  const [className, setClassName] = React.useState('');
  const [groupName, setGroupName] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility
  const [selectedResource, setSelectedResource] = React.useState(null);
  const [editResName, setEditResName] = React.useState('');
  const [editResLink, setEditResLink] = React.useState('');


  // Validate session on mount
  React.useEffect(() => {
    const validateSession = async () => {
      try {
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();

        if (session.sessionMissing) {
          window.location.href = '/';
        }
      } catch (err) {
        console.error('Session validation error:', err);
      }
    };
    validateSession();
  }, []);

  // Get the group ID from the session
  React.useEffect(() => {
    const fetchGroupID = async () => {
      try {
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();
        if (session['sessionMissing']) {
          window.location.href = '/';
          return;
        }
        const rin = session.rin;

        const res = await fetch('/session/groupID', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.error) {
          console.error('Error fetching group ID:', data.error);
        } else {
          setGroupID(data.groupid);
        }
      } catch (err) {
        console.error('Group ID fetch error:', err);
      }
    };

    fetchGroupID();
  }, []); // Only run once on mount

  // This effect runs when groupID is set
  React.useEffect(() => {
    if (!groupID) return;  // If groupID is null or undefined, exit early.

    const fetchGroupDetails = async () => {
      try {
        const groupInfoRes = await fetch(`/groups/${groupID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const groupInfo = await groupInfoRes.json();
        setGroupName(groupInfo.groupName);
        setClassID(groupInfo.crn);

        // Fetch workspaces using RIN
        const rinRes = await fetch('/session/rin', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const session = await rinRes.json();
        const rin = session.rin;

        const classesRes = await fetch(`/classes/${rin}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const classesData = await classesRes.json();
        setWorkspaces(classesData);

        // Find the class that matches the crn
        const matchedClass = classesData.find(cls => cls.crn === groupInfo.crn);
        if (matchedClass) {
          setClassName(matchedClass.className);
        }
      } catch (err) {
        console.error('Error fetching group details or classes:', err);
      }
    };

    fetchGroupDetails();
  }, [groupID]); // This effect runs whenever groupID is updated

  // Fetch resources for the given group
  React.useEffect(() => {
    if (!groupID) return;
    const fetchResources = async () => {
      try {
        const res = await fetch(`/resources/${groupID}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      }
    };
    fetchResources();
  }, [groupID]);

  // Fetch group members for the given group
  React.useEffect(() => {
    if (!groupID) return;
    const fetchGroupMembers = async () => {
      try {
        const groupRes = await fetch(`/groups/${groupID}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const groupData = await groupRes.json();
        if (groupData.students && groupData.students.length > 0) {
          const memberPromises = groupData.students.map((rin) =>
            fetch(`/profile/${rin}`, {
              method: 'GET',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
            }).then((res) => res.json())
          );
          const membersData = await Promise.all(memberPromises);
          setMembers(membersData);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error('Error fetching group members:', err);
      }
    };
    fetchGroupMembers();
  }, [groupID]);

  // Handle resource form submission
  const handleAddResource = async (e) => {
    e.preventDefault();
    if (!newResName || !newResLink || !classID) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch(`/resources/${groupID}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourcename: newResName,
          link: newResLink,
          classid: classID,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Error adding resource: " + data.error);
      } else {
        const updatedResources = await fetch(`/resources/${groupID}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const resourcesData = await updatedResources.json();
        setResources(resourcesData);
        setNewResName("");
        setNewResLink("");
        setIsModalOpen(false); // Close the modal after successful submission
      }
    } catch (err) {
      console.error('Error adding resource:', err);
      alert("Error adding resource.");
    }
  };

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openEditModal = (resource) => {
    setSelectedResource(resource);
    setEditResName(resource.resourcename);
    setEditResLink(resource.link);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editResName || !editResLink) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const res = await fetch(`/resources/${groupID}/${selectedResource.resourceid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourcename: editResName,
          link: editResLink,
        }),
      });
  
      if (res.ok) {
        const updatedResources = await fetch(`/resources/${groupID}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const resourcesData = await updatedResources.json();
        setResources(resourcesData);
        setIsModalOpen(false);
        setSelectedResource(null);
      } else {
        alert("Failed to update resource.");
      }
    } catch (err) {
      console.error('Update error:', err);
      alert("Error updating resource.");
    }
  };
  
  const handleDelete = async () => {
    try {
      const res = await fetch(`/resources/${groupID}/${selectedResource.resourceid}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        setResources(resources.filter(r => r.resourceid !== selectedResource.resourceid));
        setIsModalOpen(false);
        setSelectedResource(null);
      } else {
        alert("Failed to delete resource.");
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert("Error deleting resource.");
    }
  };
  

  return (
    <div id="resourcePage">
      <Homebar />
      <div className="dashboard-name">
        <h1>
          {className && groupName
            ? `${className}: ${groupName}`
            : 'Loading team name...'}
        </h1>
      </div>
      <div className="secondContent">
        <div id="linksheader">
            <h2>Links & Resources</h2>
            {/* Button to open the modal */}
            <button class="openResourceModal" onClick={toggleModal}>Add Resource +</button>
        </div>

        {/* Modal */}
        {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="resources-close" onClick={() => { setIsModalOpen(false); setSelectedResource(null); }}>&times;</span>
            <h2>{selectedResource ? 'Edit Resource' : 'Add Resource'}</h2>
            <form onSubmit={selectedResource ? (e) => { e.preventDefault(); handleSaveEdit(); } : handleAddResource}>
              <div className="input-group">
                <div>
                  <label>Resource Name:</label>
                  <input
                    type="text"
                    value={selectedResource ? editResName : newResName}
                    onChange={(e) =>
                      selectedResource
                        ? setEditResName(e.target.value)
                        : setNewResName(e.target.value)
                    }
                    placeholder="Enter resource name"
                  />
                </div>
                <div>
                  <label>Link:</label>
                  <input
                    type="text"
                    value={selectedResource ? editResLink : newResLink}
                    onChange={(e) =>
                      selectedResource
                        ? setEditResLink(e.target.value)
                        : setNewResLink(e.target.value)
                    }
                    placeholder="Enter URL"
                  />
                </div>
              </div>

              {selectedResource ? (
                <div className="modal-btn-group">
                  <button type="button" className="modal-save-btn" onClick={handleSaveEdit}>Save</button>
                  <button type="button" className="modal-delete-btn" onClick={handleDelete}>Delete</button>
                  <button type="button" className="modal-close-btn" onClick={() => { setIsModalOpen(false); setSelectedResource(null); }}>Cancel</button>
                </div>
              ) : (
                <button className="addResourceBtn" type="submit">Add Resource</button>
              )}
            </form>
          </div>
        </div>
      )}

        {/* Resources Table */}
        <table className="resourcesTable">
          <thead>
            <tr>
              <th>DESCRIPTION</th>
              <th>LINK</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <tr key={resource.resourceid}>
                <td onClick={() => openEditModal(resource)} style={{ cursor: 'pointer'}}>
                  {resource.resourcename}
                </td>
                  <td>
                    <a 
                      href={
                        resource.link.startsWith('http')
                          ? resource.link
                          : `http://${resource.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.link}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No resources found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Group Members Table */}
        <h2>Group Members</h2>
        <table className="resourcesTable">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {members && members.filter(m => m != null).length > 0 ? (
              members
                .filter((member) => member && member.rin)
                .map((member) => (
                  <tr key={member.rin}>
                    <td>{member.name || 'Unknown'}</td>
                    <td className="emailLink">
                      {member.email ? (
                        <a href={`mailto:${member.email}`}>{member.email}</a>
                      ) : (
                        'Unknown'
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="2">No group members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
