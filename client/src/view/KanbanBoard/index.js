import React, { Component } from "react";

import { Link } from "react-router-dom";

import KanbanBoard from "./KanbanBoard";

import "./kanban-style.scss";

class IndexKanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          id: 1,
          title: "Todo",
          columnsubtitle: "2 Tasks",
          cards: [
            {
              id: 11,
              content: {
                id: "#NZ1220",
                title: "Admin layout design",
                subtitle: "Sed ut perspiciatis unde",
                date: "14 Oct, 2019",
                progressValue: 75,
                team: [
                  { id: 1, name: "joseph", img: "" },
                  { id: 2, name: "joseph", img: "" },
                ],
              },
            },
            {
              id: 12,
              content: {
                id: "#NZ1219",
                title: "Dashboard UI",
                subtitle: "Neque porro quisquam est",
                date: " 15 Apr, 2020",
                progressValue: 50,
                team: [{ id: 3, name: "Misty", img: "Null" }],
              },
            },
            {
              id: 13,
              content: {
                id: "#NZ1218",
                title: "Admin layout design",
                subtitle: "Itaque earum rerum hic",
                date: "12 Apr, 2020",
                progressValue: 65,
                team: [
                  { id: 4, name: "joseph", img: "" },
                  { id: 5, name: "Jenice Bliss", img: "Null" },
                  { id: 6, name: "John", img: "" },
                ],
              },
            },
          ],
        },
        {
          id: 2,
          title: "In Progress",
          columnsubtitle: "3 Tasks",
          cards: [
            {
              id: 21,
              content: {
                id: "#NZ1217",
                title: "Dashboard UI",
                subtitle: "In enim justo, rhoncus ut",
                date: "05 Apr, 2020",
                progressValue: 45,
                team: [
                  { id: 7, name: "joseph", img: "" },
                  { id: 8, name: "Edward", img: "Null" },
                  { id: 9, name: "John", img: "" },
                ],
              },
            },
            {
              id: 22,
              content: {
                id: "#NZ1216",
                title: "Authentication pages",
                subtitle: "Imperdiet Etiam ultricies",
                date: "02 Apr, 2020",
                progressValue: 80,
                team: [
                  { id: 10, name: "joseph", img: "" },
                  { id: 11, name: "John", img: "" },
                ],
              },
            },
            {
              id: 23,
              content: {
                id: "#NZ1215",
                title: "UI Element Pages",
                subtitle: "Itaque earum rerum hic",
                date: "28 Mar, 2020",
                progressValue: 85,
                team: [{ id: 12, name: "Amver", img: "" }],
              },
            },
          ],
        },
        {
          id: 3,
          title: "Completed",
          columnsubtitle: "4 Tasks",
          cards: [
            {
              id: 31,
              content: {
                id: "#NZ1214",
                title: "Brand logo design",
                subtitle: "Aenean leo ligula, porttitor eu",
                date: "24 Mar, 2020",
                progressValue: 80,
                team: [{ id: 13, name: "Karen", img: "Null" }],
              },
            },
            {
              id: 32,
              content: {
                id: "#NZ1218",
                title: "Email pages",
                subtitle: "It will be as simple as Occidental",
                date: "20 Mar, 2020",
                progressValue: 77,
                team: [
                  { id: 15, name: "Ricky", img: "Null" },
                  { id: 16, name: "John", img: "" },
                ],
              },
            },
            {
              id: 33,
              content: {
                id: "#NZ1212",
                title: "Forms pages",
                subtitle: "Donec quam felis, ultricies nec",
                date: "14 Mar, 2020",
                progressValue: 40,
                team: [
                  { id: 17, name: "joseph", img: "" },
                  { id: 18, name: "John", img: "" },
                ],
              },
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <KanbanBoard board={this.state} content={this.state.columns} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IndexKanban;
