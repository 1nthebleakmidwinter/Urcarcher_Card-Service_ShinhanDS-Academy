import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Card, Button, Form, InputGroup, FormControl } from "react-bootstrap"
import CardHeaderMore from "../CardHeaderMore"
export default function ToDoList() {
  const [newTask, setNewTask] = useState(false)
  const [lastId, setLastId] = useState(7)

  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: "Edit article",
      done: true,
    },
    {
      id: 1,
      name: "Upload new tutorial",
      done: true,
    },
    {
      id: 2,
      name: "Send PayPal payments",
      done: true,
    },
    { id: 3, name: "New post on Facebook" },
    { id: 4, name: "Pay coworking space", done: true },
    { id: 5, name: "Contact John" },
    { id: 6, name: "Inbox zero" },
  ])

  const onChange = (e) => {
    const updatedTodo = tasks.map((item) =>
      item.id.toString() === e.target.id ? { ...item, done: !item.done } : item
    )
    setTasks(updatedTodo)
  }
  const onNewTask = (e) => {
    setNewTask(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()

    const task = {
      id: lastId,
      name: newTask,
    }
    setLastId(lastId + 1)
    setNewTask(false)
    newTask && setTasks([...tasks, task])
  }

  const removeTask = (id) => {
    const updatedTodo = tasks.filter((item) => item.id !== id)
    setTasks(updatedTodo)
  }
  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="card-heading">To do list</h5>
        <CardHeaderMore />
      </Card.Header>
      <Card.Body>
        {tasks.map((item, index) => (
          <div className="todo mb-3" key={index}>
            <div className="d-inline-block">
              <Form.Check
                type="checkbox"
                id={item.id}
                label={item.name}
                checked={item.done || ""}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="float-end">
              <div
                role="button"
                className="text-primary"
                onClick={() => removeTask(item.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </div>
          </div>
        ))}
        <Form onSubmit={(e) => onSubmit(e)}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Add Task"
              autoComplete="off"
              value={newTask || ""}
              onChange={(e) => onNewTask(e)}
            />
            <Button type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  )
}
