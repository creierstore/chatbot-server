const router = require('express').Router();


router.post("/whatsapp-message", (req, res) => {

    console.log("WHATSAPP MESSAGEEEEE", req);
    res.status(200).send({ok: true});
})


module.exports = router;