const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;