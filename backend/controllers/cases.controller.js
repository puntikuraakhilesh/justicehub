const Case = require('../models/Cases.model');
const Peers = require('../models/Peers.model');


const addCaseAction = async (req, res) => {
    try {
        const {
            user_id,
            mobile_no,
            email,
            gender,
            incident_type,
            incident_description,
            incident_location,
        } = req.body;

        // Validate required fields
        if (
            !user_id ||
            !mobile_no ||
            !email ||
            !gender ||
            !incident_type ||
            !incident_description ||
            !incident_location
        ) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Create a new case
        const newCase = new Case({
            user_id,
            mobile_no,
            email,
            gender,
            incident_type,
            incident_description,
            incident_location,
        });

        // Save the case to the database
        await newCase.save();

        res.status(201).json({
            message: 'Case added successfully',
            data: newCase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteCaseAction = async (req, res) => {
    try {
        const { case_id } = req.params;

        // Validate case_id
        if (!case_id) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        // Find and delete the case
        const deletedCase = await Case.findByIdAndDelete(case_id);

        if (!deletedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        res.status(200).json({
            message: 'Case deleted successfully',
            data: deletedCase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const editCaseAction = async (req, res) => {
    try {
        const { case_id } = req.params; // Case ID from URL params
        const updates = req.body; // Fields to update

        // Validate case_id
        if (!case_id) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        // Find and update the case
        const updatedCase = await Case.findByIdAndUpdate(case_id, updates, {
            new: true, // Return the updated document
            runValidators: true // Validate the updates
        });

        if (!updatedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        res.status(200).json({
            message: 'Case updated successfully',
            data: updatedCase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




const assignLawyerAction = async (req, res) => {
    try {
        const { caseid } = req.params; // Case ID from URL params
        const { lawyer_id } = req.body; // Lawyer ID from request body

        // Validate required fields
        if (!lawyer_id) {
            return res.status(400).json({ message: 'Lawyer ID is required' });
        }

        // Find the case and update with lawyer details
        const updatedCase = await Case.findByIdAndUpdate(
            caseid,
            {
                advocate_assigned: lawyer_id
                // case_status: 'accepted', // Update case status to accepted
            },
            {
                new: true, // Return the updated document
                runValidators: true, // Validate the input
            }
        );

        // Check if the case exists
        if (!updatedCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        res.status(200).json({
            message: 'Lawyer assigned successfully',
            data: updatedCase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getAssignedCasesAction = async (req, res) => {
    try {
        const { lawyerid } = req.params;

        // Validate lawyer ID
        if (!lawyerid) {
            return res.status(400).json({ message: 'Lawyer ID is required' });
        }

        // Find cases assigned to the specified lawyer
        const assignedCases = await Cases.find({ assignedLawyer: lawyerid });

        if (!assignedCases || assignedCases.length === 0) {
            return res.status(404).json({ message: 'No cases assigned to this lawyer' });
        }

        // Return the assigned cases
        res.status(200).json({
            message: 'Assigned cases fetched successfully',
            cases: assignedCases,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getAllCasesAction = async (req, res) => {
    try {
        const { userid } = req.params;

        // Validate user ID
        if (!userid) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find all cases associated with the given user ID
        const userCases = await Cases.find({ user_id: userid });

        if (!userCases || userCases.length === 0) {
            return res.status(404).json({ message: 'No cases found for this user' });
        }

        // Return the user's cases
        res.status(200).json({
            message: 'Cases fetched successfully',
            cases: userCases,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// const changeCaseStatusAction = async (req, res) => {
//     try {
//         const { caseid } = req.params;
//         const { status, lawyer_id } = req.body;

//         // Validate inputs
//         if (!caseid || !status) {
//             return res.status(400).json({ message: 'Case ID and status are required' });
//         }

//         if (!['accepted', 'rejected'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status. Must be "accepted" or "rejected".' });
//         }

//         // Find the case by ID
//         const caseRecord = await Case.findById(caseid);
//         if (!caseRecord) {
//             return res.status(404).json({ message: 'Case not found' });
//         }

//         // Update the case status
//         caseRecord.case_status = status;

//         // If the case is accepted, update the assignedLawyer and the Peers model
//         if (status === 'accepted') {
//             if (!lawyer_id) {
//                 return res.status(400).json({ message: 'Lawyer ID is required for accepting the case' });
//             }

//             caseRecord.assignedLawyer = lawyer_id;

//             // Save the updated case
//             await caseRecord.save();

//             // Update Peers model
//             const userPeer = await Peers.findOne({ user_id: caseRecord.user_id });
//             const lawyerPeer = await Peers.findOne({ user_id: lawyer_id });

//             if (userPeer && lawyerPeer) {
//                 // Add lawyer to the user's friends list
//                 if (!userPeer.friends.includes(lawyer_id)) {
//                     userPeer.friends.push(lawyer_id);
//                 }

//                 // Add user to the lawyer's friends list
//                 if (!lawyerPeer.friends.includes(caseRecord.user_id)) {
//                     lawyerPeer.friends.push(caseRecord.user_id);
//                 }

//                 // Save the updated Peers records
//                 await userPeer.save();
//                 await lawyerPeer.save();
//             }
//         } else {
//             // Save the updated case for "rejected" status
//             await caseRecord.save();
//         }

//         res.status(200).json({ message: 'Case status updated successfully', case: caseRecord });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };






const changeCaseStatusAction = async (req, res) => {
    try {
        const { caseid } = req.params;
        const { status, lawyer_id } = req.body;

        // Validate inputs
        if (!caseid || !status) {
            return res.status(400).json({ message: 'Case ID and status are required' });
        }

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Must be "accepted" or "rejected".' });
        }

        // Find the case by ID
        const caseRecord = await Case.findById(caseid);
        if (!caseRecord) {
            return res.status(404).json({ message: 'Case not found' });
        }

        // Update the case status
        caseRecord.case_status = status;

        // If the case is accepted, update the assignedLawyer and the Peers model
        if (status === 'accepted') {
            if (!lawyer_id) {
                return res.status(400).json({ message: 'Lawyer ID is required for accepting the case' });
            }

            caseRecord.assignedLawyer = lawyer_id;

            // Save the updated case
            await caseRecord.save();

            // Update Peers model
            let userPeer = await Peers.findOne({ user_id: caseRecord.user_id });
            let lawyerPeer = await Peers.findOne({ user_id: lawyer_id });

            // If Peers document does not exist, create it
            if (!userPeer) {
                userPeer = new Peers({ user_id: caseRecord.user_id, friends: [] });
            }
            if (!lawyerPeer) {
                lawyerPeer = new Peers({ user_id: lawyer_id, friends: [] });
            }

            // Add lawyer to the user's friends list if not already present
            if (!userPeer.friends.includes(lawyer_id)) {
                userPeer.friends.push(lawyer_id);
            }

            // Add user to the lawyer's friends list if not already present
            if (!lawyerPeer.friends.includes(caseRecord.user_id)) {
                lawyerPeer.friends.push(caseRecord.user_id);
            }

            // Save the updated Peers records
            await userPeer.save();
            await lawyerPeer.save();
        } else {
            // Save the updated case for "rejected" status
            await caseRecord.save();
        }

        res.status(200).json({ message: 'Case status updated successfully', case: caseRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { changeCaseStatusAction };






module.exports={addCaseAction,deleteCaseAction,editCaseAction,assignLawyerAction,getAssignedCasesAction,getAllCasesAction,changeCaseStatusAction};