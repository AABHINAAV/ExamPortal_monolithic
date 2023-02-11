package com.exam.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import com.exam.CustomExceptions.UserCustomException;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.exam.models.Role;
import com.exam.models.User;
import com.exam.models.UserRole;
import com.exam.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    //
    //
    // exeption handling
    @ExceptionHandler(UserCustomException.class)
    public ResponseEntity<?> exceptionHandler(UserCustomException e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //
    //
    //

    // creating user
    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {
        // we have user
        // setting its profile
        user.setProfile("default.png");

        // encoding password with BCryptPasswordEncode
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

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
    public ResponseEntity<User> getUser(@PathVariable("username") String username) throws Exception {
        User res = this.userService.getUser(username);
        return new ResponseEntity<User>(res, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUserByUserId/{userId}")
    public ResponseEntity<String> deleteUserByUserId(@PathVariable("userId") Long userId) {
        this.userService.deleteUserByUserId(userId);
        return new ResponseEntity<>("User with user id : " + userId + " has been deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/deleteUserByUserName/{userName}")
    public ResponseEntity<String> deleteUserByUserName(@PathVariable("userName") String userName) {
        this.userService.deleteUserByUserName(userName);
        return new ResponseEntity<>("User with username : " + userName + " has been deleted successfully", HttpStatus.OK);
    }

    @GetMapping("getUserByUserId/{userId}")
    public ResponseEntity<?> getUserByUserId(@PathVariable("userId") Long userId) {
        User res = this.userService.getUserByUserId(userId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<?> updateUserDetails(@PathVariable("userId") Long userId, @RequestBody User userDetails) {
        User oldDetails = this.userService.getUserByUserId(userId);

        userDetails.setUsername(oldDetails.getUsername());
        userDetails.setId(oldDetails.getId());
        userDetails.setPassword(oldDetails.getPassword());
        userDetails.setEmail(oldDetails.getEmail());
        userDetails.setEnabled(oldDetails.isEnabled());

        User res = this.userService.updateUserDetails(userDetails);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
