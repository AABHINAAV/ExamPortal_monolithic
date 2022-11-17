package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {
	
	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("starting code");
//		
//		User user1 = new User();
//
//		user1.setId(1L);
//		user1.setFirstName("Fname");
//		user1.setLastName("Lname");
//		user1.setUsername("fname_lname");
//		String password = "fname_lname_password";
//		user1.setPassword(this.bCryptPasswordEncoder.encode(password));
//		user1.setEmail("fname_lname@gmail.com");
//		user1.setPhone("9999999999");
//		user1.setProfile("fname_lname.jpg");
//
//		Role role1 = new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("ADMIN");
//
//		UserRole userRole1 = new UserRole();
//		userRole1.setUser(user1);
//		userRole1.setRole(role1);
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		userRoleSet.add(userRole1);
//
//		User res = this.userService.createUser(user1, userRoleSet);
//
//		System.out.println(res.getEmail());
	}

}
