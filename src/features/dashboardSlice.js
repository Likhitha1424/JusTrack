import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: {
            customers: { value: 3781, change: 11.01 },
            orders: { value: 1219, change: -0.03 },
            revenue: { value: 695, change: 15.03 },
            growth: { value: 30.1, change: 6.08 },
          },
          barChart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            projections: [21000000, 22000000, 20000000, 25000000, 23000000, 26000000],
            actuals: [19000000, 21000000, 18000000, 24000000, 22000000, 25000000],
          },
          lineChart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            currentWeek: [12000000, 14000000, 16000000, 18000000, 15000000, 20000000],
            previousWeek: [10000000, 13000000, 15000000, 17000000, 14000000, 19000000],
          },
          mapData: [
            { city: 'New York', value: 72000 },
            { city: 'San Francisco', value: 39000 },
            { city: 'Sydney', value: 25000 },
            { city: 'Singapore', value: 61000 },
          ],
          products: [
            { name: 'ASOS Ridley High Waist', price: 79.49, quantity: 82 },
            { name: 'Marco Lightweight Shirt', price: 128.5, quantity: 37 },
            { name: 'Half Sleeve Shirt', price: 39.99, quantity: 64 },
            { name: 'Lightweight Jacket', price: 20, quantity: 184 },
            { name: 'Marco Shoes', price: 79.49, quantity: 64 },
          ],
          totalSales: [
            { type: 'Direct', value: 300.56 },
            { type: 'Affiliate', value: 135.18 },
            { type: 'Sponsored', value: 154.02 },
            { type: 'E-mail', value: 248.98 },
          ],
          notifications: [
            { id: 1, text: 'You have a bug that needs to be fixed', timestamp: 'Just now' },
            { id: 2, text: 'New user registered', timestamp: '59 minutes ago' },
            { id: 3, text: 'You have a bug that needs to be fixed', timestamp: '12 hours ago' },
            { id: 4, text: 'Andi Lane subscribed to you', timestamp: 'Today, 11:59 AM' },
          ],
          activities: [
            { id: 1, text: 'You have a bug that needs to be fixed', timestamp: 'Just now' },
            { id: 2, text: 'Released a new version', timestamp: '39 minutes ago' },
            { id: 3, text: 'Submitted a bug', timestamp: '12 hours ago' },
            { id: 4, text: 'Modified a data in Page X', timestamp: 'Today, 11:59 AM' },
            { id: 5, text: 'Deleted a page in Project X', timestamp: 'Feb 2, 2023' },
          ],
          contacts: [
            { id: 1, name: 'Natoli Craig', avatar: 'https://i.pravatar.cc/40?img=1' },
            { id: 2, name: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=2' },
            { id: 3, name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=3' },
            { id: 4, name: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=4' },
            { id: 5, name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=5' },
            { id: 6, name: 'Koray Okumus', avatar: 'https://i.pravatar.cc/40?img=6' },
          ],
        });
      }, 1000);
    });
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    error: null,
    stats: {},
    barChart: {},
    lineChart: {},
    mapData: [],
    products: [],
    totalSales: [],
    notifications: [],
    activities: [],
    contacts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;