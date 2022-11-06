package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.UserService;

@Controller
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
}
