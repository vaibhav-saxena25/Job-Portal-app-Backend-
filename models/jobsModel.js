
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'company name is require']
    },
    position: {
        type: String,
        required: [true, 'Job position is require'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'Mumbai',
        required: [true, 'work location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    // Corrected placement of timestamps
    
},
{timestamps:true}

);

export default mongoose.model("Job", jobSchema);