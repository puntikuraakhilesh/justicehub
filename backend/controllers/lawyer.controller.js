const Lawyer = require('../models/Lawyer.model');
const User = require('../models/User.model');

const addDetailsAction = async (req, res) => {
    try {
        const {
            user_id,
            professional_summary,
            area_of_practice,
            education,
            work_experience,
            licences_certificates,
            case_studies,
            jurisdiction,
            email,
            phone_number,
            awards,
        } = req.body;

        // Validate required fields
        if (
            !user_id ||
            !professional_summary ||
            !area_of_practice ||
            !education ||
            !work_experience ||
            !licences_certificates ||
            !jurisdiction ||
            !email ||
            !phone_number
        ) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Check if lawyer details already exist for the user
        const existingDetails = await Lawyer.findOne({ user_id });
        if (existingDetails) {
            return res.status(400).json({ message: 'Details for this user already exist' });
        }

        // Create a new lawyer details document
        const lawyerDetails = new Lawyer({
            user_id,
            professional_summary,
            area_of_practice,
            education,
            work_experience,
            licences_certificates,
            case_studies,
            jurisdiction,
            email,
            phone_number,
            awards,
        });

        // Save the lawyer details to the database
        await lawyerDetails.save();

        // Update the User model to set detailsfilled to true
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { detailsfilled: true },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(201).json({
            message: 'Details added successfully and user updated',
            data: lawyerDetails,
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const editDetailsAction = async (req, res) => {
    try {
        const { user_id } = req.params; // Assuming user_id is passed as a URL parameter
        const updates = req.body; // Contains the fields to update

        // Find the existing lawyer details
        const lawyerDetails = await Lawyer.findOne({ user_id });
        if (!lawyerDetails) {
            return res.status(404).json({ message: 'Lawyer details not found' });
        }

        // Update only the fields provided in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                lawyerDetails[key] = updates[key];
            }
        }

        // Save the updated details to the database
        await lawyerDetails.save();

        res.status(200).json({
            message: 'Details updated successfully',
            data: lawyerDetails,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





const updateAllDetailsAction = async (req, res) => {
    try {
        const { user_id } = req.params; // Assuming user_id is passed as a URL parameter
        const {
            professional_summary,
            area_of_practice,
            education,
            work_experience,
            licences_certificates,
            case_studies,
            jurisdiction,
            email,
            phone_number,
            awards,
        } = req.body;

        // Validate required fields
        if (
            !professional_summary ||
            !area_of_practice ||
            !education ||
            !work_experience ||
            !licences_certificates ||
            !jurisdiction ||
            !email ||
            !phone_number
        ) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Find the lawyer details by user_id
        const lawyerDetails = await Lawyer.findOne({ user_id });
        if (!lawyerDetails) {
            return res.status(404).json({ message: 'Lawyer details not found' });
        }

        // Replace all details with the new data
        lawyerDetails.professional_summary = professional_summary;
        lawyerDetails.area_of_practice = area_of_practice;
        lawyerDetails.education = education;
        lawyerDetails.work_experience = work_experience;
        lawyerDetails.licences_certificates = licences_certificates;
        lawyerDetails.case_studies = case_studies;
        lawyerDetails.jurisdiction = jurisdiction;
        lawyerDetails.email = email;
        lawyerDetails.phone_number = phone_number;
        lawyerDetails.awards = awards;

        // Save the updated details to the database
        await lawyerDetails.save();

        res.status(200).json({
            message: 'All details updated successfully',
            data: lawyerDetails,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { addDetailsAction,editDetailsAction,updateAllDetailsAction };
