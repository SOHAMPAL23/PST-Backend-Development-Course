const express = require('express');

enrollmentrRouter.post('/enroll', enrollStudent);
enrollmentRouter.get('/student/:studentId/courses');
enrollmentRouter.get('/course/:courseId/students');
const mongoose = require("mongoose");
const router = express.Router();


const enrollStudent = (req, res) => {
    res.status(201).json({ message: 'Student enrolled in course.' });
};

const getEnrollments = (req, res) => {
    // Get all enrollments
    res.json([{ studentId: '123', courseId: '456' }]);
};

const getStudentEnrollments = (req, res) => {
    // Get all courses a student is enrolled in
    const { studentId } = req.params;
    res.json([{ courseId: '456', studentId }]);
};

const removeEnrollment = (req, res) => {
    // Remove a student's enrollment from a course
    // Expected body: { studentId, courseId }
    res.json({ message: 'Enrollment removed.' });
};

// Routes
router.post('/enroll', enrollStudent);
router.get('/', getEnrollments);
router.get('/student/:studentId', getStudentEnrollments);
router.delete('/remove', removeEnrollment);

module.exports = router;