import React, { Component } from "react";
import firebase from "firebase";
import { View, Text } from "react-native";
import { Header, Spinner, Button, CardSection } from "./common";
import LoginForm from "./LoginForm";

class App extends Component {
	state = {
		loggedIn: null
	};

	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyCxw3h1in-cYicKRx-j_bynvPjny4XQxdg",
			authDomain: "authentication-2db2d.firebaseapp.com",
			databaseURL: "https://authentication-2db2d.firebaseio.com",
			projectId: "authentication-2db2d",
			storageBucket: "authentication-2db2d.appspot.com",
			messagingSenderId: "1079985824547"
		});

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>
							Logout
						</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner />;
		}
	}

	render() {
		return (
			<View>
				<Header title={"Authentication"} />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
