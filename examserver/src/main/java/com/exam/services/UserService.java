package com.exam.services;

import java.util.List;
import java.util.Set;

import com.exam.models.User;
import com.exam.models.UserRole;

public interface UserService {
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    public List<User> getAllUsers() throws Exception;

    public User getUser(String userName) throws Exception;

    public void deleteUserByUserId(Long userId);

    public void deleteUserByUserName(String userName);
}
