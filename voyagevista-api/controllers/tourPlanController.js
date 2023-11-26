const { poolPromise } = require('../db');
const sql = require('mssql');

const tourPlanController = {
    getAllTourPlans: async (req, res) => {
        try {
            const pool = await poolPromise;
            const query = `
                SELECT tp.Id, tp.City, tpd.DayNumber, tpd.Title, tpd.Description AS DayDescription
                FROM TourPlans tp
                LEFT JOIN TourPlanDays tpd ON tp.Id = tpd.TourPlanId
                ORDER BY tp.Id, tpd.DayNumber`;
            
            const result = await pool.request().query(query);
            const tourPlans = result.recordset.reduce((acc, item) => {
                if (!acc[item.Id]) {
                    acc[item.Id] = {
                        id: item.Id,
                        city: item.City,
                        description: item.Description,
                        days: []
                    };
                }
                if (item.DayNumber !== null) {
                    acc[item.Id].days.push({
                        dayNumber: item.DayNumber,
                        title: item.Title,
                        description: item.DayDescription
                    });
                }
    
                return acc;
            }, {});
    
            const tourPlansArray = Object.values(tourPlans);
    
            res.json(tourPlansArray);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    

    getTourPlanById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await poolPromise;
            const tourPlanResult = await pool.request()
                .input('Id', sql.NVarChar, id)
                .query('SELECT * FROM TourPlans WHERE Id = @Id');

            const tourPlanDaysResult = await pool.request()
                .input('TourPlanId', sql.NVarChar, id)
                .query('SELECT * FROM TourPlanDays WHERE TourPlanId = @TourPlanId ORDER BY DayNumber');

            if (!tourPlanResult.recordset.length) {
                res.status(404).send('Tour Plan not found.');
                return;
            }

            res.json({
                tourPlan: tourPlanResult.recordset[0],
                days: tourPlanDaysResult.recordset
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    createTourPlan: async (req, res) => {
        const { tripId, days } = req.body; 
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        try {
            await transaction.begin();

            const tourPlanResult = await transaction.request()
            .input('Id', sql.NVarChar, tripId._id)
            .input('TripId', sql.NVarChar, tripId._id)
            .input('City', sql.NVarChar, tripId.city)
            .query('INSERT INTO TourPlans (Id,TripId, City) OUTPUT INSERTED.Id VALUES (@Id, @TripId, @City)');
            const tourPlanId = tourPlanResult.recordset[0].Id;
            console.log('tourPlanId',tourPlanId);
            let dayNumber = 1;
            for (const day of days) {
                await transaction.request()
                    .input('Id', sql.NVarChar, tripId._id + dayNumber)
                    .input('TourPlanId', sql.NVarChar, tourPlanId)
                    .input('DayNumber', sql.Int, dayNumber++)
                    .input('Title', sql.NVarChar, day.title)
                    .input('Description', sql.NVarChar, day.description)
                    .query('INSERT INTO TourPlanDays (Id, TourPlanId, DayNumber, Title, Description) VALUES (@Id, @TourPlanId, @DayNumber, @Title, @Description)');
            }
            dayNumber = 0;

            await transaction.commit();
            res.status(201).json({ message: "Tour Plan created successfully" });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            res.status(500).send(error.message);
        }
    },

    updateTourPlan: async (req, res) => {
        const { id } = req.params;
        const {  tripId, days } = req.body;
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        
        try {
            await transaction.begin();

            await transaction.request()
                .input('Id', sql.NVarChar, tripId._id)
                .input('City', sql.NVarChar, tripId.city)
                .query('UPDATE TourPlans SET City = @City WHERE Id = @Id');

            await transaction.request()
                .input('TourPlanId', sql.NVarChar, id)
                .query('DELETE FROM TourPlanDays WHERE TourPlanId = @TourPlanId');
                let dayNumber = 1;

            for (const day of days) {
                await transaction.request()
                    .input('Id', sql.NVarChar, tripId._id + dayNumber)
                    .input('TourPlanId', sql.NVarChar, id)
                    .input('DayNumber', sql.Int, dayNumber++)
                    .input('Title', sql.NVarChar, day.title)
                    .input('Description', sql.NVarChar, day.description)
                    .query('INSERT INTO TourPlanDays (Id, TourPlanId, DayNumber, Title, Description) VALUES (@Id, @TourPlanId, @DayNumber, @Title, @Description)');
            }

            await transaction.commit();
            res.status(200).json({ message: "Tour Plan updated successfully" });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            res.status(500).send(error.message);
        }
    },

    deleteTourPlan: async (req, res) => {
        const { id } = req.params;
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        
        try {
            await transaction.begin();

            await transaction.request()
                .input('TourPlanId', sql.NVarChar, id)
                .query('DELETE FROM TourPlanDays WHERE TourPlanId = @TourPlanId');

            await transaction.request()
                .input('Id', sql.NVarChar, id)
                .query('DELETE FROM TourPlans WHERE Id = @Id');

            await transaction.commit();
            res.status(200).json({ message: "Tour Plan deleted successfully" });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            res.status(500).send(error.message);
        }
    },
};

module.exports = tourPlanController;
