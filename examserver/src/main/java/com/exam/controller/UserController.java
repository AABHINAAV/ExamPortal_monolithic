package com.exam.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	// creating user
	@PostMapping("/createUser")
	public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {
		// we have user
		// making role
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");

		Set<UserRole> userRoles = new HashSet<>();
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		userRoles.add(userRole);

		User res = this.userService.createUser(user, userRoles);

		return new ResponseEntity<User>(res, HttpStatus.OK);
	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers() throws Exception {
		List<User> res = this.userService.getAllUsers();
		return new ResponseEntity<List<User>>(res, HttpStatus.OK);
	}
	
	@GetMapping("/getUser/{username}")
	public ResponseEntity<User> getUser(@PathVariable("username") String username) throws Exception{
		User res = this.userService.getUser(username);
		return new ResponseEntity<User>(res, HttpStatus.OK);
	}
	
//	@DeleteMapping("/deleteUser/{userId}")
//	public void deleteUser(@PathVariable("userId") Long userId){
//		this.userService.deleteUser(userId);
//	}	
	@DeleteMapping("/deleteUser/{userName}")
	public void deleteUser(@PathVariable("userName") String userName){
		this.userService.deleteUser(userName);
	}
}
