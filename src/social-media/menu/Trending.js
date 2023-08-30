import React, { useState } from "react";

export default function Trending() {
  const [data, setdata] = useState([]);
  const [editclick, setEditclick] = useState(false);
  const [editItemindex, seteditItemindex] = useState("");
  const [state, setstate] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
    // setdata(inputdata);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItemindex) {
      // console.log(editItemindex, "editIteam ");
      const updateData = [...data];
      updateData[editItemindex] = state;
      setdata(updateData);
      setEditclick(false);
      setstate({
        name: "",
        email: "",
      });
      seteditItemindex("");
    } else {
      setdata([...data, state]);
      setstate({
        name: "",
        email: "",
      });
    }

    console.log(data, "data");
  };
  const handleDelete = (index) => {
    const inputdata = data.filter((data, i) => i !== index);
    setdata(inputdata);
  };
  const handleEdit = (index) => {
    const datalog = data[index];
    setstate(datalog);
    setEditclick(true);
    seteditItemindex(index);
    console.log(datalog, "datalog");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            className="name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <label>email:</label>
        <input
          type="text"
          className="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <button type="submit"> {editclick ? "update" : "add"}</button>
      </form>
      {data.map((data, index) => {
        return (
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>delete</button>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
