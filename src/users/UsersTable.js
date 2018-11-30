import React from "react";

export default ({ users = [] }) => (
  <table>
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Age</th>
        <th>E-mail</th>
      </tr>
      {users.map(({ name, age, email, picture }) => (
        <tr key={email}>
          <td>
            <img alt={name} src={picture} />
          </td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      ))}
    </thead>
  </table>
);
