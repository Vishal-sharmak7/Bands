import express, { Router } from "express"
import concertInfo from "../controllers/concert.user.js"
import merchItem from "../controllers/merch.js"
import songInfo from "../controllers/songInfo.js"
import bookingInfo from "../controllers/bookingInfo.user.js"
import merchInfo from "../controllers/merchInfo.js"

const router  = express.Router()

router.route("/").get(concertInfo)
router.route("/merch").get(merchItem)
router.route("/songs").get(songInfo)
router.route("/booking").post(bookingInfo)
router.route("/merchInfo").post(merchInfo)


export default router