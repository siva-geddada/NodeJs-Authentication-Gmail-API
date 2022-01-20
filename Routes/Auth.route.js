const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user.model");
const  authSchema  = require("../shared/validate.schema");
const  signAccessToken  = require("../shared/jwt_helper")

router.post("/register", async (req, res, next) => {
    try {
      // const { email, password } = req.body
      // if (!email || !password) throw createError.BadRequest()
      const validateResult = await authSchema.validateAsync(req.body)

      const userExist = await User.findOne({ email: validateResult.email })
      if (userExist)
        throw createError.Conflict(`${validateResult.email} is already been registered`)

      const user = new User(validateResult)
      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)

      res.send({ accessToken })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
}),

router.post("/login", async (req, res, next) => {
    try {
        const validateResult = await authSchema.validateAsync(req.body)
        const user = await User.findOne({ email: validateResult.email })
        if (!user) throw createError.NotFound('User not registered')
  
        const isMatch = await user.isValidPassword(validateResult.password)
        if (!isMatch)
          throw createError.Unauthorized('Invalid password')
        const accessToken = await signAccessToken(user.id)
  
        res.send({ accessToken })
    } catch (error) {
        if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
        next(error)
    }
});
router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});
router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
