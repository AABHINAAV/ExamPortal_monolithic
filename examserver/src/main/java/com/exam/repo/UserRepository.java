package com.exam.repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByUsername(String userName);
	
	@Transactional
	public User deleteByUsername(String userName);
}
