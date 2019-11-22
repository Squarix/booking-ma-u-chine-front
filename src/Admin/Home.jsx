import React from 'react';
import AdminService from '../_services/AdminService';

const adminService = new AdminService();

export class Home extends React.Component {
  constructor(props) {
  	super(props)
  }

  componentDidMount() {
    adminService.getHome().then(res => console.log(res))
  }


	render() {
  	return (
  		<React.Fragment/>
	  )
  }
}

