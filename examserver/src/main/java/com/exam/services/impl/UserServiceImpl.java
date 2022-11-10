package com.exam.services.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.services.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local = this.userRepository.findByUsername(user.getUsername());

		if (local != null) {
			System.out.println("User is already present !!");
			throw new Exception("User is already present !!");
		} else {
			for (UserRole singleUserRole : userRoles) {
				roleRepository.save(singleUserRole.getRole());
			}

			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);
		}
		return local;
	}

	@Override
	public List<User> getAllUsers() throws Exception {
		// TODO Auto-generated method stub
		List<User> allUsers = this.userRepository.findAll();
		return allUsers;
	}

	@Override
	public User getUser(String userName) throws Exception {
		// TODO Auto-generated method stub
		User user = this.userRepository.findByUsername(userName);
		if(user == null)
		{
			System.out.println("No such user present!!!!!!!!!!!!!!!!");
			throw new Exception("No such user present!!!!!!!!!!!!!!!!");
		}
		
		return user;
	}

	@Override
	public void deleteUserByUserId(Long userId) {
		// TODO Auto-generated method stub
		System.out.println("deleting user on basis of user id : " + userId);
		this.userRepository.deleteById(userId);
	}
	@Override
	public void deleteUserByUserName(String userName) {
		// TODO Auto-generated method stub
		System.out.println("deleting user on basis of user name : " + userName);
		this.userRepository.deleteByUsername(userName);
	}
}
