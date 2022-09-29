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
    const user = await User.find({ username: req.body.username })
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      )
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userID: user[0]._id,
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
