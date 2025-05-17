import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../utile/api';
import axios from 'axios';

export const getExammode = createAsyncThunk('items/getexammode', async () => {
    try {
        let a = await axios.get(`${apiUrl}/exam-mode/get-exam-mode`);
        console.log(a.data);
        return a.data;
    }
    catch (err) {

    }
    finally {


    }
})
export const getManager = createAsyncThunk('items/getManager', async () => {
    try {
        let a = await axios.get(`${apiUrl}/manager/get-manager`);
        console.log(a.data);
        return a.data;
    }
    catch (err) {

    }
    finally {


    }
})
export const getLastStatus = createAsyncThunk('items/getLastStatus', async () => {
    try {
        let a = await axios.get(`${apiUrl}/last-status/get-last-status`);
        console.log(a.data);
        return a.data;
    }
    catch (err) {

    }
    finally {


    }
})

export const getCounselor = createAsyncThunk('items/counsellor', async () => {
    try {
        let a = await axios.get(`${apiUrl}/counsellor/get-counsellor`);
        console.log(a.data);
        return a.data;
    }
    catch (err) {

    }
    finally {


    }
})
export const addCounselor = createAsyncThunk(
    'items/addCounselor',
    async (filter, { dispatch }) => {


        try {

            let b = await axios.post(`${apiUrl}/counsellor/add-counsellor`, filter,
                {
                    withCredentials: true
                }
            );
            dispatch(getCounselor());
            return b.data;

        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }



    }
);
export const addExammode = createAsyncThunk(
    'items/addExammode',
    async (filter, { dispatch }) => {


        try {

            let b = await axios.post(`${apiUrl}/exam-mode/Add-Exam-Mode`, filter
            );
            dispatch(getExammode());
            return b.data;

        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }



    }
);
export const addManager = createAsyncThunk(
    'items/addManager',
    async (filter, { dispatch }) => {


        try {

            let b = await axios.post(`${apiUrl}/manager/add-manager`, filter,
                {
                    withCredentials: true
                }
            );
            dispatch(getManager());
            return b.data;

        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }



    }
);
export const addLastStatus = createAsyncThunk(
    'items/addLastStatus',
    async (filter, { dispatch }) => {


        try {

            let b = await axios.post(`${apiUrl}/last-status/Add-Last-Status`, filter
            );
            dispatch(getLastStatus());
            return b.data;

        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }



    }
);
export const getStudent = createAsyncThunk(
    'items/getStudent',
    async (filter, { dispatch }) => {
        let a = [];

        try {
            const response = await axios.post(`${apiUrl}/students`,
                filter);

            console.log(`This is response` + response.data.data)
            const subjectData = response.data || [];
            a = subjectData;


        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }


        return a;
    }
);

export const getUniversity = createAsyncThunk(
    'items/getUniversity',
    async () => {


        try {

            return await axios.get(`${apiUrl}/university/get-university`);


        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
        finally {


        }



    }
);

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        column: [
            { id: 'student_id', label: 'Select', minWidth: 50 },
            { id: 'student_name', label: 'Full Name', minWidth: 200 },
            { id: 'counselor_name', label: 'Counsellor Name', minWidth: 200 },
            { id: 'responsable_person', label: 'Responsible Person', minWidth: 200 },
            { id: 'Email', label: 'Email', minWidth: 200 },
            { id: 'phone', label: 'Phone', minWidth: 200 },
            { id: 'action', label: 'Action', minWidth: 100 },
            { id: 'actions', label: 'Detail', minWidth: 100 },
            { id: 'actionss', label: 'Status', minWidth: 100 },
        ],
        student: [],
        manager: [],
        counselor: [],
        laststatus: [],
        exammode: [],
        university: [],

        loading: false,
        error: null,
    },
    reducers: {
        addColumn: (state, action) => {
            state.column = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
            })
            .addCase(getStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUniversity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.university = action.payload;
            })
            .addCase(getUniversity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getManager.fulfilled, (state, action) => {
                state.loading = false;
                state.manager = action.payload;
            })
            .addCase(getManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getExammode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExammode.fulfilled, (state, action) => {
                state.loading = false;
                state.exammode = action.payload;
            })
            .addCase(getExammode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getCounselor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCounselor.fulfilled, (state, action) => {
                state.loading = false;
                state.counselor = action.payload;
            })
            .addCase(getCounselor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getLastStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLastStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.laststatus = action.payload;
            })
            .addCase(getLastStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            ;
    },
});
export const getUniversityDetail = (state) => state.counter.university;
export const getStudentDetail = (state) => state.counter.student;
export const getExammodeDetail = (state) => state.counter.exammode;
export const getManagerDetail = (state) => state.counter.manager;
export const getCounselorDetail = (state) => state.counter.counselor;
export const getLastStatusDetail = (state) => state.counter.laststatus;
export const { addColumn } = counterSlice.actions;

export default counterSlice.reducer;
