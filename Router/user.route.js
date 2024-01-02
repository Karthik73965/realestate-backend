import  express  from "express";
import { deleteUser, updateUser, userTestController,getUserListings,getuser } from "../Controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();


router.get('/',userTestController)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getuser)

export default  router ;