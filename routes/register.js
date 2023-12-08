import Express from "express";
import { UserModel } from "../db/dbModels.js";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { transporter, mailOptions } from "./mail.js";

export const registerRouter = Express.Router();

export let userData = [];
export let verifyOTP = [];

registerRouter.post('/', async (req, res) => {
  const payload = req.body;
  userData = [];
  try {
    const checkUser = await UserModel.findOne({ email: payload.email });
    if (checkUser) {
      res.status(409).send({ msg: "user already exist" });
    } else {
      if (payload.password === payload.confirmPassword) {
        bcrypt.hash(payload.password, 10, async (err, hash) => {
          if (err) {
            res.status(500).send(err);
          } else {
            let data = {
              id: v4(),
              name: payload.name,
              email: payload.email,
              number: payload.number,
              password: hash,
            };
            userData.push(data);

            function generateOTP() {
              const otpLength = 6;
              const otp = Math.floor(100000 + Math.random() * 900000)
                .toString()
                .slice(0, otpLength);
              return otp;
            }

            const otp = generateOTP();
            verifyOTP.push(otp);

            const mail = await transporter.sendMail({
              ...mailOptions,
              to: payload.email,
              text: `Hi please verify your email, Enter this OTP ${otp}`,
            });

            if (mail) {
              res.send({
                msg: `OTP is sent to ${payload.email}, Please verify`,
              });
            }
          }
        });
      } else {
        res.send({ msg: "password and confirmPassword is not matched" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
