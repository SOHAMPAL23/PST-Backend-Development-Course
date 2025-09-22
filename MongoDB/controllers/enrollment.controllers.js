const enrollment = async (req, res) => {
    const { studentId, courseId } = req.body;

    // Validate input
    if (!studentId || !courseId) {
        return res.status(400).json({ message: 'Invalid input.' });
    }

    try {
        const newEnrollment = await Enrollment.create({ studentId, courseId });
        res.status(201).json(newEnrollment);
    } catch (error) {
        console.error('Error enrolling student:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getStudentCourses = async (req, res) => {
    const { studentId } = req.params;
    const { user } = req;
    if (!user){
        res.status
    }
    try {
        const enrollments = await Enrollment.find({ studentId }).populate('courseId');
        res.json(enrollments).send({ message: "Students enrolled in course." });
    } catch (error) {
        console.error('Error fetching student courses:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const getCourseStudents = async (req, res) => {
    const { courseId } = req.params;

    try {
        const enrollments = await Enrollment.find({ courseId }).populate('studentId');
        res.json(enrollments).send({ message: "Students enrolled in course." });
    } catch (error) {
        console.error('Error fetching course students:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};