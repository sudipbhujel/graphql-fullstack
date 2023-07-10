export const saveLoginToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const removeLoginToken = () => {
  localStorage.removeItem("token")
}

export const retrieveLoginToken = () => {
  return localStorage.getItem("token")
}
