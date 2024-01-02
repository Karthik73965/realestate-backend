import express from 'express' ;
import { createlisting, deletelisting, getListing, getlistings, updateListing, } from '../Controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router()

router.post('/create',verifyToken,createlisting);
router.delete('/delete/:id', verifyToken, deletelisting);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',getListing)
router.get('/get',getlistings)


export default router;