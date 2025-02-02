import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
// import "../../pages/anakhronos/sections/About/About.scss"
import { FaGoogle } from "react-icons/fa";
import {
	signInWithPopup,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const googleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				navigate("/dashboard");

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const EmailLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate("/dashboard")
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	return (
		<div className="bg">
			<div className="signup">
				<div className="signup-connect">
					<h2 style={{ color: "#e73d3b" }}>Login with Google</h2>
					<a href="#" className="btn btn-google" onClick={googleLogin}>
						<FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
					</a>
				</div>
				<div className="signup-classic">
					<h2 style={{ fontWeight: "600", fontSize: "25px" , color: "#e73d3b"}}>Login</h2>
					<div className="form">
						<fieldset className="email">
							<input
								type="email"
								onChange={(e) => setemail(e.target.value)}
								style={{ color: "black" }}
								placeholder="email"
							/>
						</fieldset>
						<fieldset className="password">
							<input
								type="password"
								placeholder="password"
								onChange={(e) => setpassword(e.target.value)}
							/>
						</fieldset>
						<button className="btn" onClick={EmailLogin}>
							Login
						</button>
					</div>
						<div style={{marginTop: "15px", color: "#e73d3b",textAlign: "center"}}>
						<p>Create have an account</p>
						<Link to="/signup">Sign Up here</Link>
						</div>
				</div>
			</div>
		</div>
	);
};

export default Login;