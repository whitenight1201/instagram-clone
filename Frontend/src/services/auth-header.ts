export default function authHeader() {
  const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
