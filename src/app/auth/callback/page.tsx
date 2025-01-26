/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-empty-object-type*/
"use client";
type Props = {}

function Callback ({}: Props) {
  // get access token and refresh token from url query parameters
  const urlParams = new URLSearchParams(window.location.search)

  const accessToken = urlParams.get('accessToken')
  const refreshToken = urlParams.get('refreshToken')

  console.log(accessToken)
  console.log(refreshToken)
  

  // set access token to local storage
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  }

  if(!accessToken || !refreshToken){
    window.location.href = '/login'
  }

  alert(accessToken)
  window.location.href = '/'

  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

export default Callback