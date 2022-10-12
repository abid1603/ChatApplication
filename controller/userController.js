const express = require("express")
const mongoose = require("mongoose")
const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const signupHandler = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const body = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      avatar: req.files[0].filename,
    }

    const newUser = new User(body)
    await newUser.save()
    res.status(200).json({
      message: "user created successfully",
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}

const loginHandler = async (req, res) => {
  try {
    const user = await User.findOne({ 
      $or:[{username: req.body.username},{phone: req.body.username}],
    })
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            userID: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "10h",
          }
        )
        res.status(200).json({
          accessToken: token,
          message: "Login successful",
        })
      } else {
        res.status(401).json({
          error: "Authentication Field!",
        })
      }
    } else {
      res.status(401).json({
        error: "Authentication Field!",
      })
    }
  } catch (error) {}
}

module.exports = { signupHandler, loginHandler }
