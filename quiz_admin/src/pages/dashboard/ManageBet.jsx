// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
// import MonthlyBarChart from './MonthlyBarChart';
// import ReportAreaChart from './ReportAreaChart';
// import UniqueVisitorCard from './UniqueVisitorCard';
// import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

// assets
import { useEffect, useState } from 'react';
import { useSocket } from 'context/SocketContext';
import get_current_result_session from 'api/get/get_current_result_session';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function ManageBet() {
  const [searchTerm, setSearchTerm] = useState('');

  const socket = useSocket();
  const [countdown, setCountdown] = useState();
  const [current, setCurrent] = useState();
  const [result, setResult] = useState('000000');
  const [page, setPage] = useState(1);
  const getCurrentResultSession = async () => {
    const result = await get_current_result_session();
    setResult(result?.data?.result);
    setCurrent(result?.data);
  };

  useEffect(() => {
    getCurrentResultSession();
  }, []);
  
  useEffect(() => {
    if (socket) {
      socket.on('resultNumbers', (data) => {
        setCountdown(data);
      });

      return () => {
        socket.off('resultNumbers');
      };
    }
  }, [socket]);

  const handleSearch = () => {
    setPage(1);
    // fetchMembers(1, searchTerm);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      <Grid item xs={12} md={12} lg={12}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            name="hidden"
            label="Tìm kiếm"
            variant="outlined"
            autoComplete="off"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Khách mua</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable current={current} page={page} setPage={setPage} />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}></Grid>
    </Grid>
  );
}
