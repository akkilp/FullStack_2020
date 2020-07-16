import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
import {
    BrowserRouter as Router,
  } from "react-router-dom"
import styled, {ThemeProvider} from 'styled-components' ;

const theme = {
    primary: "green",
    secondary: "lightgray",
    support: "white"
};


ReactDOM.render(

    
    
<Provider store={store}>
    <ThemeProvider theme={theme}>
        <Router>
            <App />
        </Router>
     </ThemeProvider>
</Provider>

,document.getElementById('root'))