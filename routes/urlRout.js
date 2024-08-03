const express = require('express');
const router = express.Router();
const ShortURL = require('../models/urlSchema');

router.get('/', async (req, res) => {
    const shorturls = await ShortURL.find();
    res.render('index', { shorturls: shorturls });
});

router.post('/shortUrls', async (req, res) => {
    const url = req.body.full;

    const newShortUrl = new ShortURL({
        full: url
    });

    await newShortUrl.save();

    console.log('Short Url created', newShortUrl);
    res.redirect('/');
});

router.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortURL.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) {
        return res.sendStatus(404);
    }
    shortUrl.clicks += 1;
    await shortUrl.save();
    res.redirect(shortUrl.full);
});


router.get('/delete/:id',async(req,res)=>{
    const id = req.params.id
    try{
        await ShortURL.deleteOne({_id:id})
        console.log('delete');
        res.redirect('/')
    }
    catch{
        console.log(err);
    }
})


module.exports = router;
