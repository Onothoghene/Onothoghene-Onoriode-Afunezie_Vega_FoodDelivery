import React from 'react'

const ProfileView = ({title, name, email,  address}) => {
  return (
    <div class="card">
    <h5 class="card-header">{title}</h5>
    <div class="card-body">
      <p class="card-text">{name}</p>
      <p class="card-text">{email}</p>
      <p class="card-text">{address}</p>
    </div>
  </div>
  )
}

export default ProfileView