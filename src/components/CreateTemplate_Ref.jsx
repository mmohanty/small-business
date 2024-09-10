import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import MenuContext from "./MenuContext";

const CreateTemplate = () => {

    const [rows, setRows] = useState([{}]);

    const handleChange = (idx) => (e) => {
        const { name, value } = e.target;
        const newRows = [...rows];
        newRows[idx] = {
            ...newRows[idx],
            [name]: value,
        };
        setRows(newRows);
    };

    const handleAddRow = () => {
        const item = {
            name: "",
            mobile: "",
        };
        setRows([...rows, item]);
    };

    const handleRemoveRow = () => {
        setRows(rows.slice(0, -1));
    };

    const handleRemoveSpecificRow = (idx) => () => {
        const newRows = [...rows];
        newRows.splice(idx, 1);
        setRows(newRows);
    };

    return (
        <div>
            <MenuContext.Provider value="AssetManager">
                <Header />
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Create Template
                    </Typography>

                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-md-12 column">
                                <table className="table table-bordered table-hover" id="tab_logic">
                                    <thead>
                                        <tr>
                                            <th className="text-center"> # </th>
                                            <th className="text-center"> Field Name </th>
                                            <th className="text-center"> Field Type </th>
                                            <th className="text-center"> Required </th>
                                            <th className="text-center"> Min </th>
                                            <th className="text-center"> Max </th>
                                            <th className="text-center"> Format </th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((item, idx) => (
                                            <tr id="addr0" key={idx}>
                                                <td>{idx}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={item.name || ""}
                                                        onChange={handleChange(idx)}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        value={item.mobile || ""}
                                                        onChange={handleChange(idx)}
                                                        className="form-control"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={handleRemoveSpecificRow(idx)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button onClick={handleAddRow} className="btn btn-primary">
                                    Add Row
                                </button>
                                <button onClick={handleRemoveRow} className="btn btn-danger float-right">
                                    Delete Last Row
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </MenuContext.Provider>
        </div>
    );
};

export default CreateTemplate;