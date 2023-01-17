import React, { useState } from 'react';
import { useEffect } from 'react';

const Table = ({ columns, data }) => {

  const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03')
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    const [visibleColumns, setVisibleColumns] = useState(columns);
    const [sortBy, setSortBy] = useState({ column: '', order: 'asc' });
    const [filter, setFilter] = useState('');

    const handleColumnToggle = column => {
        if (visibleColumns.includes(column)) {
            setVisibleColumns(visibleColumns.filter(c => c !== column));
        } else {
            setVisibleColumns([...visibleColumns, column]);
        }
    };

    const handleSort = column => {
        if (sortBy.column === column) {
            setSortBy({ column, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
        } else {
            setSortBy({ column, order: 'asc' });
        }
    };

    const filteredData = data.filter(d =>
        d.appName.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
        if (sortBy.order === 'asc') {
            return a[sortBy.column] > b[sortBy.column] ? 1 : -1;
        } else {
            return a[sortBy.column] < b[sortBy.column] ? 1 : -1;
        }
    });

    return (
        <div>
            <div className="table-controls">
                <div className="column-selector">
                    {columns.map(column => (
                        <div key={column}>
                            <input
                                type="checkbox"
                                checked={visibleColumns.includes(column)}
                                onChange={() => handleColumnToggle(column)}
                            />
                        <label>{column}</label>
                        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Clicks</th>
                    <th>Request</th>
                    <th>Revenue</th>
                    <th>Impression</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.clicks}</td>
                        <td>{item.request}</td>
                        <td>{item.revenue}</td>
                        <td>{item.impression}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

