const course = require("../models/courses.model");
const getAllCourse = async (req, res) => {
  try {
    const courses = await course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

const createNewCourse = async (req, res) => {
  try {
    const newCourse = new course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

module.exports = {
  getAllCourse,
  createNewCourse
};
