function Register() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Enter Name"
      />
      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
      />
      <br /><br />

      <button>Register</button>
    </div>
  );
}

export default Register;