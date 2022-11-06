package com.exam.services;

import java.util.Set;

import com.exam.models.User;
import com.exam.models.UserRole;

public interface UserService {
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
}
