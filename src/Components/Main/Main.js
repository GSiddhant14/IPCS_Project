import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Stepper, Step, StepLabel, Typography, FormControlLabel, FormGroup, Switch, Radio, RadioGroup, FormControl, FormLabel, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const PatientSurveyForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        medicalHistory: '',
        symptoms: '',
        diabetes: false,
        highBloodPressure: false,
        highCholesterol: false,
        otherHealthConditions: '',
        smokeCigarettes: '',
        vape: false,
        drinkAlcohol: false,
        recreationalDrugs: '',
        educationLevel: '',
        maritalStatus: '',
        additionalNotes: '',
        signature: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionComplete, setSubmissionComplete] = useState(false); // New state for form submission
    const [showMedicineList, setShowMedicineList] = useState(false); // State for showing medicine list
    const [showDoctorList, setShowDoctorList] = useState(false); // State for showing doctor list

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const newValue = e.target.type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleNext = () => {
        const newErrors = {};
        if (step === 0) {
            if (!formData.firstname.trim()) {
                newErrors.firstname = 'First Name is required';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone is required';
            }
            if (!formData.lastname.trim()) {
                newErrors.lastname = 'Last Name is required';
            }
            if (!formData.dateOfBirth.trim()) {
                newErrors.dateOfBirth = 'Date of Birth is required';
            }
            if (!formData.address.trim()) {
                newErrors.address = 'Address is required';
            }
        } else if (step === 1) {
            // Check if any health history field is not filled
        } else if (step === 2) {
            // Check if any social history field is not filled
            if (!formData.smokeCigarettes) {
                newErrors.smokeCigarettes = 'Please select an option';
            }
            if (!formData.educationLevel.trim()) {
                newErrors.educationLevel = 'Education Level is required';
            }
            if (!formData.maritalStatus.trim()) {
                newErrors.maritalStatus = 'Marital Status is required';
            }
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.symptoms.trim()) {
            newErrors.symptoms = 'Symptoms are required';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formData);
            setSubmissionComplete(true); // Set the state to indicate form submission
        }
    };

    const steps = ['Personal Information', 'Health History', 'Social History', 'Symptoms'];

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{ paddingTop: '20px' }}>
                        <TextField
                            name="firstname"
                            label="First Name"
                            style={{ marginTop: "20px" }}
                            value={formData.firstname}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.firstname}
                            helperText={errors.firstname}
                        />
                        <TextField
                            name="lastname"
                            label="Last Name"
                            style={{ marginTop: "20px" }}
                            value={formData.lastname}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                        />
                        <TextField
                            name="phone"
                            label="Phone No."
                            style={{ marginTop: "20px" }}
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <TextField
                            name="dateOfBirth"
                            label="Date of Birth"
                            style={{ marginTop: "20px" }}
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: { min: "1900-01-01", max: "2025-12-31" },
                            }}
                            fullWidth
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth}
                        />
                        <TextField
                            name="address"
                            label="Address"
                            style={{ marginTop: "20px" }}
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                    </div>
                );
            case 1:
                return (
                    <div style={{ paddingTop: '20px' }}>
                        <Typography variant="h6" gutterBottom>Health History</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={formData.diabetes} onChange={handleChange} name="diabetes" />}
                                label="Do you have diabetes?"
                            />
                            <FormControlLabel
                                control={<Switch checked={formData.highBloodPressure} onChange={handleChange} name="highBloodPressure" />}
                                label="High blood pressure?"
                            />
                            <FormControlLabel
                                control={<Switch checked={formData.highCholesterol} onChange={handleChange} name="highCholesterol" />}
                                label="High cholesterol?"
                            />
                            <TextField
                                name="otherHealthConditions"
                                label="Do you have other health conditions?"
                                style={{ marginTop: "20px" }}
                                value={formData.otherHealthConditions}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </FormGroup>
                    </div>
                );
            case 2:
                return (
                    <div style={{ paddingTop: '20px' }}>
                        <Typography variant="h6" gutterBottom>Social History</Typography>
                        <FormControl component="fieldset" style={{ marginTop: "20px" }}>
                            <FormLabel component="legend">Do you smoke cigarettes?</FormLabel>
                            <RadioGroup
                                name="smokeCigarettes"
                                value={formData.smokeCigarettes}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Never" control={<Radio />} label="Never" />
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="Quit" control={<Radio />} label="Quit" />
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={formData.vape} onChange={handleChange} name="vape" />}
                                label="Do you vape (e-cigarettes)?"
                                style={{ marginTop: "20px" }}
                            />
                            <FormControlLabel
                                control={<Switch checked={formData.drinkAlcohol} onChange={handleChange} name="drinkAlcohol" />}
                                label="Do you drink alcohol?"
                                style={{ marginTop: "20px" }}
                            />
                        </FormGroup>
                        <FormGroup style={{ marginTop: "20px" }}>
                            <FormLabel component="legend">Do you use recreational drugs? </FormLabel>

                            <RadioGroup
                                name="recreationalDrugs"
                                value={formData.recreationalDrugs}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Never" control={<Radio />} label="Never" />
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="Quit" control={<Radio />} label="Quit" />

                            </RadioGroup>

                        </FormGroup>
                        <TextField
                            name="educationLevel"
                            select
                            label="What is your highest level of education completed?"
                            value={formData.educationLevel}
                            onChange={handleChange}
                            fullWidth
                            style={{ marginTop: "20px" }}
                            error={!!errors.educationLevel}
                            helperText={errors.educationLevel}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="High School">High School</MenuItem>
                            <MenuItem value="Associate's Degree">Associate's Degree</MenuItem>
                            <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                            <MenuItem value="Master's Degree">Master's Degree</MenuItem>
                            <MenuItem value="Doctorate">Doctorate</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                        <TextField
                            name="maritalStatus"
                            select
                            label="What is your marital status?"
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            fullWidth
                            style={{ marginTop: "20px" }}
                            error={!!errors.maritalStatus}
                            helperText={errors.maritalStatus}
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Divorced">Divorced</MenuItem>
                            <MenuItem value="Widowed">Widowed</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
                    </div >
                );
            case 3:
                return (
                    <div style={{ paddingTop: '20px' }}>
                        <Typography variant="h6" gutterBottom>Symptoms</Typography>
                        <TextField
                            name="symptoms"
                            label="Please select any symptoms you have now or have had in the past month."
                            value={formData.symptoms}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.symptoms}
                            helperText={errors.symptoms}
                        />
                        <TextField
                            name="additionalNotes"
                            label="Additional Notes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            style={{ marginTop: '20px' }}
                        />
                        <TextField
                            name="signature"
                            label="Signature"
                            value={formData.signature}
                            onChange={handleChange}
                            fullWidth
                            style={{ marginTop: '20px' }}
                        />
                        <TextField
                            name="date"
                            label="Today's Date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: { max: "2025-12-31" },
                            }}
                            fullWidth
                            style={{ marginTop: '20px' }}
                        />
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    };

    // Render options after form submission
    const renderSubmissionOptions = () => {
        return (
            <center><div>
                <Button variant="contained" color="primary" onClick={handleBuyMedicine} style={{ padding: "10px" }}>
                    Buy Medicine
                </Button>
                <Button variant="contained" style={{ marginLeft: "5px", padding: "10px" }} color="primary" onClick={handleReferDoctor}>
                    Refer to Doctor
                </Button>
            </div>
            </center>
        );
    };


    const handleBuyMedicine = () => {
        setShowMedicineList(true);
        setShowDoctorList(false);
    };

    const handleReferDoctor = () => {
        setShowDoctorList(true);
        setShowMedicineList(false);
    };

    const medicineColumns = [
        { field: 'id', headerName: 'ID', width: 90, maxWidth: 150 },
        { field: 'medicineName', headerName: 'Medicine Name', flex: 1, minWidth: 150, maxWidth: 300 },
        { field: 'price', headerName: 'Price', width: 110, maxWidth: 150 },
        { field: 'brand', headerName: 'Brand', flex: 1, minWidth: 150, maxWidth: 300 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            maxWidth: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBuy(params.row)}
                >
                    Buy
                </Button>
            ),
        },
    ];

    const doctorColumns = [
        { field: 'id', headerName: 'ID', width: 90, maxWidth: 150 },
        { field: 'doctorName', headerName: 'Doctor Name', flex: 1, minWidth: 150, maxWidth: 300 },
        { field: 'degree', headerName: 'Degree', width: 130, maxWidth: 200 },
        { field: 'hospitalAddress', headerName: 'Hospital Address', flex: 1, minWidth: 150, maxWidth: 400 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            maxWidth: 200,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRefer(params.row)}
                >
                    Refer
                </Button>
            ),
        },
    ];

    const medicineRows = [
        { id: 1, medicineName: 'Medicine A', price: '$10', brand: 'Brand A' },
        { id: 2, medicineName: 'Medicine B', price: '$15', brand: 'Brand B' },
        { id: 3, medicineName: 'Medicine C', price: '$20', brand: 'Brand C' },
    ];

    const doctorRows = [
        { id: 1, doctorName: 'Doctor X', degree: 'MD', hospitalAddress: 'Hospital X Address' },
        { id: 2, doctorName: 'Doctor Y', degree: 'MBBS', hospitalAddress: 'Hospital Y Address' },
        { id: 3, doctorName: 'Doctor Z', degree: 'MD', hospitalAddress: 'Hospital Z Address' },
    ];


    // Function to render the medicine list
    const renderMedicineList = () => {
        return (
            <div style={{ height: 400, width: '100%', paddingBottom: "50px" }}>
                <Typography variant="h6">List of Medicines</Typography>
                <DataGrid
                    rows={medicineRows}
                    columns={medicineColumns}
                    pageSize={5}
                />
            </div>
        );
    };

    // Function to render the doctor list
    const renderDoctorList = () => {
        return (
            <div style={{ height: 400, width: '100%', paddingBottom: "50px" }}>
                <Typography variant="h6">List of Doctors</Typography>
                <DataGrid
                    rows={doctorRows}
                    columns={doctorColumns}
                    pageSize={5}
                />
            </div>
        );
    };


    // Function to handle buying medicine
    const handleBuy = (medicine) => {
        // Logic for buying medicine...
    };

    // Function to handle referring to a doctor
    const handleRefer = (doctor) => {
        // Logic for referring to a doctor...
    };

    return (
        <>
            <center style={{ paddingTop: '20px' }}>
                <Typography variant="h5">Patient Care System</Typography>
            </center>
            <Container maxWidth="md" style={{ paddingTop: '20px' }}>
                <Paper style={{ padding: '20px' }}>
                    {!submissionComplete ? <><Stepper activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {getStepContent(step)}
                                <div style={{ marginTop: '20px' }}>
                                    {step !== 0 && (
                                        <Button variant="contained" color="primary" onClick={handleBack}>
                                            Back
                                        </Button>
                                    )}
                                    <Button variant="contained" style={{ marginLeft: "5px" }} color="primary" onClick={step === steps.length - 1 ? handleSubmit : handleNext}>
                                        {step === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </form></> : <></>}
                    {submissionComplete && renderSubmissionOptions()}
                    {/* Conditional rendering of medicine list */}
                    {showMedicineList && renderMedicineList()}
                    {/* Conditional rendering of doctor list */}
                    {showDoctorList && renderDoctorList()}
                    {/* Render options after form submission */}
                </Paper>
            </Container>
        </>
    );
};

export default PatientSurveyForm;