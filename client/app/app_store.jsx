import React from 'react'; 
import Reflux from 'reflux'; 

import AppActions from './app_action.jsx'; 

let AppStore = Reflux.createStore({
	init() { 
		console.log("initializing AppStore..."); 
		this.listenToMany(AppActions); 

		this.welcome = "Welcome To JerseyReactStarter";
		this.features = [ 
			{ key: "java", label: "Java", url: "http://www.oracle.com/technetwork/java/javase/overview/java8-2100321.html" },
			{ key: "jersey", label: "Jersey (JAX-RS)", url: "https://jersey.java.net/" },
			{ key: "react", label: "ReactJS", url: "https://facebook.github.io/react/" },
			{ key: "reflux", label: "RefluxJS", url: "https://github.com/reflux/refluxjs" },
			{ key: "jquery", label: "jQuery ($)", url: "https://jquery.com/" }, 
			{ key: "lodash", label: "loadsh (_)", url: "https://lodash.com/" }, 
			{ key: "babel", label: "babelify", url: "https://babeljs.io/" }, 
			{ key: "browserify", label: "browserify", url: "http://browserify.org/" }, 
			{ key: "gulp", label: "gulp", url: "http://gulpjs.com/" }, 
			{ key: "semantic", label: "semantic-ui", url: "http://semantic-ui.com/" } 
		];
		this.hello = {
			data: {},
			raw: ""
		}
	},

	onWelcome() { 
		console.log("processing welcome..."); 
		this.trigger("welcome", { 
	      	welcome: this.welcome, 
	      	features: this.features 
        });
	},

	onHello(name) {
		console.log("processing hello...");
		var THIS = this;
		$.ajax({
			type: 'GET',
			url: '/api/hello/' + name,
			headers: {'Accept': 'application/json'}
		}).then(function(json) {
			THIS.hello.data = json;
			THIS.hello.raw = JSON.stringify(json, null, 2);
			THIS.trigger("hello", THIS.hello);
		});
	}
}); 

export default AppStore; 